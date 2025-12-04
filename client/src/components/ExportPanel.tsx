import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Download, FileJson, FileCode2, Loader2 } from "lucide-react";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import { createManifest, svgToAndroidVector } from "@/lib/converter";

interface ExportPanelProps {
  packName: string;
  icons: Array<{
    name: string;
    androidName: string | null;
    vectorData?: string;
  }>;
}

export function ExportPanel({ packName, icons }: ExportPanelProps) {
  const [isExporting, setIsExporting] = useState(false);
  const [includeXml, setIncludeXml] = useState(true);
  const [includeSvg, setIncludeSvg] = useState(true);

  const handleExport = async () => {
    setIsExporting(true);
    try {
      const zip = new JSZip();
      const validIcons = icons.filter(i => i.androidName && i.vectorData);
      const mappings: Record<string, string> = {};

      // Add Manifest
      validIcons.forEach(icon => {
        mappings[icon.androidName!] = `icons/${icon.name}.svg`; // Mapping points to source path structure usually
      });

      const manifest = createManifest(
        `${packName} (Aliucord)`,
        "1.0.0",
        packName,
        mappings
      );
      zip.file("manifest.json", manifest);

      // Folders
      if (includeSvg) {
        const svgFolder = zip.folder("icons");
        validIcons.forEach(icon => {
          if (svgFolder && icon.vectorData) {
            svgFolder.file(`${icon.name}.svg`, icon.vectorData);
          }
        });
      }

      if (includeXml) {
        const xmlFolder = zip.folder("drawables");
        validIcons.forEach(icon => {
          if (xmlFolder && icon.vectorData) {
            const xml = svgToAndroidVector(icon.vectorData);
            // Android resources must be lowercase and underscore only
            const safeName = icon.androidName!.toLowerCase().replace(/[^a-z0-9_]/g, "_");
            xmlFolder.file(`${safeName}.xml`, xml);
          }
        });
      }

      const blob = await zip.generateAsync({ type: "blob" });
      saveAs(blob, `${packName.toLowerCase().replace(/\s+/g, "-")}-aliucord.zip`);

    } catch (err) {
      console.error("Export failed", err);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="glass-panel p-6 rounded-lg space-y-6 border-l-4 border-l-primary">
      <div>
        <h3 className="text-lg font-bold font-mono uppercase tracking-wider">Export Package</h3>
        <p className="text-sm text-muted-foreground">Generate ready-to-use files for Aliucord.</p>
      </div>

      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Checkbox 
            id="xml" 
            checked={includeXml} 
            onCheckedChange={(c) => setIncludeXml(!!c)} 
            className="border-white/20 data-[state=checked]:bg-primary data-[state=checked]:text-black"
          />
          <Label htmlFor="xml" className="font-mono">Include Android Vectors (.xml)</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox 
            id="svg" 
            checked={includeSvg} 
            onCheckedChange={(c) => setIncludeSvg(!!c)}
            className="border-white/20 data-[state=checked]:bg-primary data-[state=checked]:text-black"
          />
          <Label htmlFor="svg" className="font-mono">Include Source SVGs (.svg)</Label>
        </div>
      </div>

      <Button 
        onClick={handleExport} 
        disabled={isExporting || (!includeXml && !includeSvg)}
        className="w-full bg-primary hover:bg-primary/90 text-black font-bold h-12"
      >
        {isExporting ? (
          <Loader2 className="w-5 h-5 animate-spin mr-2" />
        ) : (
          <Download className="w-5 h-5 mr-2" />
        )}
        Download ZIP
      </Button>
    </div>
  );
}
