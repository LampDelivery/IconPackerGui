import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Upload, 
  FileArchive, 
  ArrowLeft, 
  Loader2, 
  Download, 
  RefreshCw,
  Check,
  X,
  Edit2,
  Save
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";

interface IconData {
  originalName: string;
  originalPath: string;
  suggestedKotlinName: string;
  kotlinName: string;
  svgData?: string;
  xmlData?: string;
  status: "pending" | "processing" | "done" | "error";
  error?: string;
}

interface SessionData {
  id: string;
  originalFileName: string;
  icons: IconData[];
  createdAt: string;
}

export default function Home() {
  const [dragActive, setDragActive] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [session, setSession] = useState<SessionData | null>(null);
  const [converting, setConverting] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [editingIcon, setEditingIcon] = useState<string | null>(null);
  const [editValue, setEditValue] = useState("");
  const [includeSvg, setIncludeSvg] = useState(true);
  const [includeXml, setIncludeXml] = useState(true);
  const { toast } = useToast();

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    const files = e.dataTransfer.files;
    if (files && files[0]) {
      handleFile(files[0]);
    }
  }, []);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      handleFile(files[0]);
    }
  };

  const handleFile = async (file: File) => {
    if (!file.name.endsWith(".zip")) {
      toast({
        title: "Invalid File",
        description: "Please upload a ZIP file containing your icon pack.",
        variant: "destructive",
      });
      return;
    }

    setUploading(true);

    try {
      const formData = new FormData();
      formData.append("iconpack", file);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Upload failed");
      }

      const data = await response.json();
      
      const sessionResponse = await fetch(`/api/session/${data.sessionId}`);
      const sessionData = await sessionResponse.json();
      
      setSession(sessionData);
      
      toast({
        title: "Upload Complete",
        description: `Found ${data.iconCount} icons in your pack.`,
      });
    } catch (error: any) {
      toast({
        title: "Upload Failed",
        description: error.message || "Failed to upload the icon pack.",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  const handleConvert = async () => {
    if (!session) return;
    
    setConverting(true);

    try {
      const response = await fetch(`/api/session/${session.id}/convert`, {
        method: "POST",
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Conversion failed");
      }

      const data = await response.json();
      
      setSession((prev) => prev ? { ...prev, icons: data.icons } : null);
      
      toast({
        title: "Conversion Complete",
        description: `Successfully converted ${data.successCount} icons. ${data.errorCount > 0 ? `${data.errorCount} failed.` : ""}`,
      });
    } catch (error: any) {
      toast({
        title: "Conversion Failed",
        description: error.message || "Failed to convert icons.",
        variant: "destructive",
      });
    } finally {
      setConverting(false);
    }
  };

  const handleDownload = async () => {
    if (!session) return;
    
    setDownloading(true);

    try {
      const params = new URLSearchParams();
      params.set("svg", includeSvg.toString());
      params.set("xml", includeXml.toString());
      params.set("name", session.originalFileName.replace(".zip", ""));

      const response = await fetch(`/api/session/${session.id}/download?${params}`);
      
      if (!response.ok) {
        throw new Error("Download failed");
      }

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${session.originalFileName.replace(".zip", "")}-aliucord.zip`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      toast({
        title: "Download Started",
        description: "Your converted icon pack is downloading.",
      });
    } catch (error: any) {
      toast({
        title: "Download Failed",
        description: error.message || "Failed to download the converted pack.",
        variant: "destructive",
      });
    } finally {
      setDownloading(false);
    }
  };

  const handleReset = async () => {
    if (session) {
      await fetch(`/api/session/${session.id}`, { method: "DELETE" }).catch(() => {});
    }
    setSession(null);
  };

  const startEdit = (icon: IconData) => {
    setEditingIcon(icon.originalName);
    setEditValue(icon.kotlinName);
  };

  const saveEdit = async (originalName: string) => {
    if (!session) return;

    try {
      const response = await fetch(`/api/session/${session.id}/mapping`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mappings: { [originalName]: editValue },
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setSession((prev) => prev ? { ...prev, icons: data.icons } : null);
      }
    } catch (error) {
      console.error("Failed to update mapping:", error);
    }

    setEditingIcon(null);
  };

  const doneCount = session?.icons.filter((i) => i.status === "done").length || 0;
  const totalCount = session?.icons.length || 0;
  const progress = totalCount > 0 ? (doneCount / totalCount) * 100 : 0;

  if (!session) {
    return (
      <div className="min-h-screen bg-background text-foreground p-8 font-sans">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold tracking-tighter bg-gradient-to-r from-white to-white/50 bg-clip-text text-transparent">
              Aliucord Icon Converter
            </h1>
            <p className="text-muted-foreground max-w-2xl">
              Upload a React Native icon pack ZIP file to convert it into Aliucord-compatible 
              vector icons (SVG/XML) with proper Discord Kotlin naming.
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`
              relative border-2 border-dashed rounded-xl p-12 text-center transition-all
              ${dragActive 
                ? "border-primary bg-primary/10" 
                : "border-white/20 hover:border-white/40 bg-white/5"
              }
            `}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <input
              type="file"
              accept=".zip"
              onChange={handleFileInput}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              disabled={uploading}
            />
            
            <div className="space-y-4">
              {uploading ? (
                <Loader2 className="w-16 h-16 mx-auto text-primary animate-spin" />
              ) : (
                <FileArchive className="w-16 h-16 mx-auto text-muted-foreground" />
              )}
              
              <div>
                <h3 className="text-xl font-semibold mb-2">
                  {uploading ? "Uploading..." : "Drop your icon pack ZIP here"}
                </h3>
                <p className="text-muted-foreground">
                  {uploading 
                    ? "Processing your icon pack..." 
                    : "or click to browse files"
                  }
                </p>
              </div>

              {!uploading && (
                <Button variant="secondary" className="mt-4">
                  <Upload className="w-4 h-4 mr-2" />
                  Select ZIP File
                </Button>
              )}
            </div>
          </motion.div>

          <div className="p-6 rounded-xl bg-white/5 border border-white/10">
            <h3 className="font-semibold mb-3">Supported File Structure</h3>
            <div className="text-sm text-muted-foreground space-y-2">
              <p>Your ZIP should contain PNG icons with names like:</p>
              <code className="block p-3 rounded bg-black/30 text-xs">
                Icon/native/redesign/generated/images/CallIcon.png<br/>
                Icon/native/redesign/generated/images/SearchIcon.png<br/>
                ...or any folder structure with *.png files
              </code>
              <p className="mt-4">
                Icons will be automatically converted to SVG/XML and renamed to Discord Kotlin format
                (e.g., <code className="text-white">CallIcon.png</code> → <code className="text-white">ic_call_24dp.xml</code>)
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground p-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <Button variant="ghost" onClick={handleReset} className="mb-2 -ml-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Upload Different Pack
            </Button>
            <h1 className="text-3xl font-bold tracking-tight">
              {session.originalFileName.replace(".zip", "")}
            </h1>
            <p className="text-muted-foreground">
              {session.icons.length} icons found • {doneCount} converted
            </p>
          </div>

          <div className="flex items-center gap-4">
            {!converting && doneCount < totalCount && (
              <Button onClick={handleConvert} size="lg" className="bg-primary hover:bg-primary/90 text-black">
                <RefreshCw className="w-4 h-4 mr-2" />
                Convert All Icons
              </Button>
            )}
            
            {converting && (
              <Button disabled size="lg">
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Converting...
              </Button>
            )}
          </div>
        </div>

        {converting && (
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Converting icons...</span>
              <span>{doneCount} / {totalCount}</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            <div className="rounded-xl border border-white/10 overflow-hidden">
              <div className="bg-white/5 px-4 py-3 border-b border-white/10">
                <h3 className="font-semibold">Icon Mappings</h3>
                <p className="text-sm text-muted-foreground">
                  Click on a Kotlin name to edit it
                </p>
              </div>
              
              <div className="max-h-[600px] overflow-y-auto">
                <table className="w-full">
                  <thead className="bg-white/5 sticky top-0">
                    <tr>
                      <th className="text-left px-4 py-2 text-sm font-medium">Original</th>
                      <th className="text-left px-4 py-2 text-sm font-medium">Kotlin Name</th>
                      <th className="text-center px-4 py-2 text-sm font-medium w-20">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    <AnimatePresence>
                      {session.icons.map((icon) => (
                        <motion.tr
                          key={icon.originalName}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="hover:bg-white/5"
                        >
                          <td className="px-4 py-2">
                            <code className="text-xs bg-black/30 px-2 py-1 rounded">
                              {icon.originalName}
                            </code>
                          </td>
                          <td className="px-4 py-2">
                            {editingIcon === icon.originalName ? (
                              <div className="flex items-center gap-2">
                                <Input
                                  value={editValue}
                                  onChange={(e) => setEditValue(e.target.value)}
                                  className="h-8 text-xs font-mono"
                                  autoFocus
                                  onKeyDown={(e) => {
                                    if (e.key === "Enter") saveEdit(icon.originalName);
                                    if (e.key === "Escape") setEditingIcon(null);
                                  }}
                                />
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  onClick={() => saveEdit(icon.originalName)}
                                >
                                  <Save className="w-3 h-3" />
                                </Button>
                              </div>
                            ) : (
                              <button
                                onClick={() => startEdit(icon)}
                                className="flex items-center gap-2 group"
                              >
                                <code className="text-xs bg-primary/20 text-primary px-2 py-1 rounded">
                                  {icon.kotlinName}
                                </code>
                                <Edit2 className="w-3 h-3 opacity-0 group-hover:opacity-50 transition-opacity" />
                              </button>
                            )}
                          </td>
                          <td className="px-4 py-2 text-center">
                            {icon.status === "done" && (
                              <Check className="w-4 h-4 text-green-500 mx-auto" />
                            )}
                            {icon.status === "error" && (
                              <X className="w-4 h-4 text-red-500 mx-auto" />
                            )}
                            {icon.status === "processing" && (
                              <Loader2 className="w-4 h-4 text-primary mx-auto animate-spin" />
                            )}
                            {icon.status === "pending" && (
                              <div className="w-4 h-4 rounded-full border border-white/20 mx-auto" />
                            )}
                          </td>
                        </motion.tr>
                      ))}
                    </AnimatePresence>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="p-6 rounded-xl bg-white/5 border border-white/10 space-y-6">
              <div>
                <h3 className="font-semibold mb-2">Export Options</h3>
                <p className="text-sm text-muted-foreground">
                  Choose what formats to include in the download.
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="svg"
                    checked={includeSvg}
                    onCheckedChange={(c) => setIncludeSvg(!!c)}
                  />
                  <Label htmlFor="svg" className="font-mono text-sm">
                    Include SVG files
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="xml"
                    checked={includeXml}
                    onCheckedChange={(c) => setIncludeXml(!!c)}
                  />
                  <Label htmlFor="xml" className="font-mono text-sm">
                    Include Android XML vectors
                  </Label>
                </div>
              </div>

              <Button
                onClick={handleDownload}
                disabled={downloading || doneCount === 0 || (!includeSvg && !includeXml)}
                className="w-full bg-primary hover:bg-primary/90 text-black font-bold h-12"
              >
                {downloading ? (
                  <Loader2 className="w-5 h-5 animate-spin mr-2" />
                ) : (
                  <Download className="w-5 h-5 mr-2" />
                )}
                Download ZIP ({doneCount} icons)
              </Button>

              {doneCount === 0 && (
                <p className="text-xs text-muted-foreground text-center">
                  Convert icons first before downloading
                </p>
              )}
            </div>

            <div className="p-6 rounded-xl bg-white/5 border border-white/10">
              <h3 className="font-semibold mb-3">Statistics</h3>
              <dl className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Total Icons</dt>
                  <dd className="font-mono">{totalCount}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Converted</dt>
                  <dd className="font-mono text-green-500">{doneCount}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Pending</dt>
                  <dd className="font-mono text-yellow-500">
                    {session.icons.filter((i) => i.status === "pending").length}
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Errors</dt>
                  <dd className="font-mono text-red-500">
                    {session.icons.filter((i) => i.status === "error").length}
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
