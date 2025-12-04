import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Activity, Layers, ShieldCheck } from "lucide-react";
import { fetchPackList, fetchPackConfig, Pack, getIconUrl } from "@/lib/themesplus";
import { PackSelector } from "@/components/PackSelector";
import { IconGrid } from "@/components/IconGrid";
import { ExportPanel } from "@/components/ExportPanel";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import ImageTracer from "imagetracerjs";

// Types
interface IconState {
  name: string;
  url: string;
  androidName: string | null;
  status: "pending" | "processing" | "done" | "error";
  vectorData?: string;
}

export default function Home() {
  const [packs, setPacks] = useState<Pack[]>([]);
  const [selectedPack, setSelectedPack] = useState<Pack | null>(null);
  const [icons, setIcons] = useState<IconState[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  // Load packs on mount
  useEffect(() => {
    fetchPackList().then(data => {
      setPacks(data);
      setLoading(false);
    });
  }, []);

  const handleSelectPack = async (pack: Pack) => {
    setSelectedPack(pack);
    setLoading(true);
    
    if (!pack.config || !pack.load) {
      toast({
        title: "Invalid Pack",
        description: "This pack is missing config or load URL.",
        variant: "destructive"
      });
      setLoading(false);
      return;
    }

    try {
      const config = await fetchPackConfig(pack.config);
      if (config && config.icons) {
        const iconList: IconState[] = Object.entries(config.icons).map(([name, path]) => ({
          name,
          url: getIconUrl(pack.load!, path),
          androidName: null,
          status: "pending"
        }));
        setIcons(iconList);
      } else {
        toast({ title: "Empty Pack", description: "No icons found in config." });
      }
    } catch (e) {
      toast({ title: "Error", description: "Failed to load pack details.", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const processIcons = async () => {
    // Process pending icons
    const newIcons = [...icons];
    
    for (let i = 0; i < newIcons.length; i++) {
      if (newIcons[i].status === "pending" || newIcons[i].status === "error") {
        newIcons[i].status = "processing";
        setIcons([...newIcons]); // Force update to show spinner
        
        try {
          // Convert PNG to SVG using ImageTracer
          // Since we are in browser, we load the image and trace it
          const svgString = await new Promise<string>((resolve, reject) => {
             ImageTracer.imageToSVG(newIcons[i].url, (svgStr: string) => {
               resolve(svgStr);
             }, {
               ltres: 1, 
               qtres: 1, 
               pathomit: 8, 
               colorsampling: 2, 
               numberofcolors: 2, // Force monochrome-ish
               strokewidth: 0,
               viewbox: true
             });
          });
          
          newIcons[i].vectorData = svgString;
          newIcons[i].status = "done";
        } catch (e) {
          console.error(e);
          newIcons[i].status = "error";
        }
        
        setIcons([...newIcons]);
      }
    }
    
    toast({ title: "Processing Complete", description: `Processed ${newIcons.filter(i => i.status === "done").length} icons.` });
  };

  const updateIcon = (name: string, updates: Partial<IconState>) => {
    setIcons(prev => prev.map(icon => icon.name === name ? { ...icon, ...updates } : icon));
  };

  if (!selectedPack) {
    return (
      <div className="min-h-screen bg-background text-foreground p-8 font-sans">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold tracking-tighter bg-gradient-to-r from-white to-white/50 bg-clip-text text-transparent">
              Aliucord Pack Maker
            </h1>
            <p className="text-muted-foreground max-w-2xl">
              Select a Themes+ icon pack to convert it into an Aliucord-compatible vector pack.
            </p>
          </div>
          
          <PackSelector packs={packs} onSelect={handleSelectPack} isLoading={loading} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground font-sans flex flex-col md:flex-row">
      {/* Sidebar */}
      <div className="w-full md:w-80 border-r border-white/10 p-6 flex flex-col gap-6 bg-black/20 backdrop-blur-sm fixed md:sticky top-0 h-auto md:h-screen z-30 overflow-y-auto">
        <Button 
          variant="ghost" 
          className="self-start -ml-2 text-muted-foreground hover:text-white"
          onClick={() => setSelectedPack(null)}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Packs
        </Button>
        
        <div className="space-y-2">
          <h2 className="text-xl font-bold text-primary">{selectedPack.name}</h2>
          <p className="text-sm text-muted-foreground">{selectedPack.description}</p>
        </div>

        <div className="space-y-4 flex-1">
          <div className="glass-panel p-4 rounded-lg space-y-3">
            <div className="flex items-center gap-3 text-sm">
              <Layers className="w-4 h-4 text-primary" />
              <span>{icons.length} Icons Found</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <ShieldCheck className="w-4 h-4 text-primary" />
              <span>{icons.filter(i => i.androidName).length} Mapped</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Activity className="w-4 h-4 text-primary" />
              <span>{icons.filter(i => i.status === 'done').length} Vectorized</span>
            </div>
          </div>

          <ExportPanel packName={selectedPack.name} icons={icons} />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 md:p-8 overflow-x-hidden">
        <div className="max-w-6xl mx-auto">
          <IconGrid 
            icons={icons} 
            onUpdateIcon={updateIcon} 
            onProcessAll={processIcons} 
          />
        </div>
      </div>
    </div>
  );
}
