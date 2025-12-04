import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, Check, Edit2, FileCode, ImageIcon, RefreshCw, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { suggestMapping, INITIAL_CROSSWALK } from "@/lib/crosswalk";

interface IconData {
  name: string;
  url: string;
  androidName: string | null;
  status: "pending" | "processing" | "done" | "error";
  vectorData?: string; // SVG string
}

interface IconGridProps {
  icons: IconData[];
  onUpdateIcon: (name: string, updates: Partial<IconData>) => void;
  onProcessAll: () => void;
}

export function IconGrid({ icons, onUpdateIcon, onProcessAll }: IconGridProps) {
  const [editingIcon, setEditingIcon] = useState<IconData | null>(null);

  const handleSaveMapping = (androidName: string) => {
    if (editingIcon) {
      onUpdateIcon(editingIcon.name, { androidName });
      setEditingIcon(null);
    }
  };

  // Get unique common Android names for suggestions
  const commonNames = Array.from(new Set(Object.values(INITIAL_CROSSWALK).map(v => v.android))).sort();

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between glass-panel p-4 rounded-lg sticky top-0 z-20 backdrop-blur-xl">
        <div className="flex items-center gap-4">
          <div className="text-sm font-mono text-muted-foreground">
            Total: <span className="text-white">{icons.length}</span>
          </div>
          <div className="text-sm font-mono text-muted-foreground">
            Mapped: <span className="text-primary">{icons.filter(i => i.androidName).length}</span>
          </div>
        </div>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => {
              // Auto-map all unmapped
              icons.forEach(icon => {
                if (!icon.androidName) {
                  const suggested = suggestMapping(icon.name);
                  if (suggested) onUpdateIcon(icon.name, { androidName: suggested });
                }
              });
            }}
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Auto-Map Names
          </Button>
          <Button size="sm" onClick={onProcessAll} className="bg-primary hover:bg-primary/90 text-black font-bold">
            <Settings className="w-4 h-4 mr-2" />
            Process Vectors
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {icons.map((icon) => (
          <motion.div
            key={icon.name}
            layout
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={`glass-panel rounded-lg p-3 relative group transition-all ${
              !icon.androidName ? "border-amber-500/30 bg-amber-500/5" : "border-white/5"
            }`}
          >
            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1 z-10">
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6 hover:bg-white/10 bg-black/40 backdrop-blur-sm"
                onClick={() => setEditingIcon(icon)}
              >
                <Edit2 className="w-3 h-3 text-white" />
              </Button>
            </div>

            <div className="aspect-square mb-3 bg-black/20 rounded flex items-center justify-center overflow-hidden relative">
              {icon.vectorData ? (
                <div 
                  className="w-12 h-12 text-primary fill-current"
                  dangerouslySetInnerHTML={{ __html: icon.vectorData }} 
                />
              ) : (
                <img 
                  src={icon.url} 
                  alt={icon.name} 
                  className="w-12 h-12 object-contain opacity-80"
                  loading="lazy"
                  crossOrigin="anonymous"
                />
              )}
              
              <div className="absolute bottom-1 right-1">
                {icon.status === "done" && <Check className="w-4 h-4 text-primary" />}
                {icon.status === "processing" && <RefreshCw className="w-4 h-4 text-blue-400 animate-spin" />}
                {icon.status === "error" && <AlertTriangle className="w-4 h-4 text-red-500" />}
              </div>
            </div>

            <div className="space-y-1">
              <p className="text-xs font-mono text-muted-foreground truncate" title={icon.name}>
                {icon.name}
              </p>
              <div className={`text-xs font-mono truncate flex items-center gap-1 ${
                icon.androidName ? "text-primary" : "text-amber-500"
              }`}>
                <FileCode className="w-3 h-3" />
                {icon.androidName || "Unmapped"}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <Dialog open={!!editingIcon} onOpenChange={(open) => !open && setEditingIcon(null)}>
        <DialogContent className="glass-panel border-white/10 text-white sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Map Icon: {editingIcon?.name}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="flex justify-center p-4 bg-black/20 rounded-lg">
              <img src={editingIcon?.url} className="w-16 h-16" crossOrigin="anonymous" />
            </div>
            <div className="space-y-2">
              <Label>Android Resource Name</Label>
              <Input 
                defaultValue={editingIcon?.androidName || ""} 
                placeholder="e.g. ic_notifications_white_24dp"
                className="font-mono bg-black/20 border-white/10"
                list="android-names"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSaveMapping(e.currentTarget.value);
                  }
                }}
              />
              <datalist id="android-names">
                {commonNames.map(name => (
                  <option key={name} value={name} />
                ))}
              </datalist>
              <p className="text-xs text-muted-foreground">
                Press Enter to save. Must match Aliucord expected resource names.
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
