import { motion } from "framer-motion";
import { Pack } from "@/lib/themesplus";
import { Check, ChevronRight, Package } from "lucide-react";

interface PackSelectorProps {
  packs: Pack[];
  onSelect: (pack: Pack) => void;
  isLoading: boolean;
}

export function PackSelector({ packs, onSelect, isLoading }: PackSelectorProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="h-32 glass-panel rounded-lg animate-pulse" />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {packs.map((pack) => (
        <motion.div
          key={pack.id}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onSelect(pack)}
          className="group cursor-pointer glass-panel p-6 rounded-lg border border-white/5 hover:border-primary/50 transition-colors relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          
          <div className="relative z-10 flex items-start justify-between">
            <div>
              <h3 className="text-lg font-semibold font-mono tracking-tight text-white group-hover:text-primary transition-colors">
                {pack.name}
              </h3>
              <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                {pack.description || "No description provided."}
              </p>
              {pack.authors && (
                <div className="mt-3 flex items-center gap-2 text-xs text-slate-400">
                  <span className="px-1.5 py-0.5 rounded bg-white/5 border border-white/10">
                    v{pack.version || "1.0"}
                  </span>
                  <span>by {pack.authors.join(", ")}</span>
                </div>
              )}
            </div>
            <div className="text-white/20 group-hover:text-primary transition-colors">
              <Package className="w-6 h-6" />
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
