import { z } from "zod";

// Schema for the Themes+ list.json
export const PackSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().optional(),
  authors: z.array(z.string()).optional(),
  version: z.string().optional(),
  config: z.string().optional(), // URL to config.json
  load: z.string().optional(),   // Base URL for assets
});

export type Pack = z.infer<typeof PackSchema>;

export const PackConfigSchema = z.object({
  icons: z.record(z.string(), z.string()).optional(), // Map of IconName -> filename or source
  // Add other config fields as discovered in real packs
});

export type PackConfig = z.infer<typeof PackConfigSchema>;

const LIST_URL = "https://raw.githubusercontent.com/nexpid/ThemesPlus/main/iconpacks/list.json";

export async function fetchPackList(): Promise<Pack[]> {
  try {
    const res = await fetch(LIST_URL);
    if (!res.ok) throw new Error("Failed to fetch pack list");
    const data = await res.json();
    // The list might be wrapped or an array directly. 
    // Based on user description, it seems to be a list.
    // We'll validate safely.
    if (Array.isArray(data)) {
      return data.map(p => PackSchema.parse(p));
    } else if (data.list && Array.isArray(data.list)) {
      return data.list.map((p: any) => PackSchema.parse(p));
    }
    return [];
  } catch (error) {
    console.error("Error fetching packs:", error);
    return [];
  }
}

export async function fetchPackConfig(configUrl: string): Promise<PackConfig | null> {
  try {
    const res = await fetch(configUrl);
    if (!res.ok) return null;
    return await res.json();
  } catch (error) {
    console.error("Error fetching pack config:", error);
    return null;
  }
}

export function getIconUrl(baseUrl: string, iconPath: string): string {
  // Ensure trailing slash on base and no leading slash on path
  const cleanBase = baseUrl.endsWith("/") ? baseUrl : `${baseUrl}/`;
  const cleanPath = iconPath.startsWith("/") ? iconPath.slice(1) : iconPath;
  return `${cleanBase}${cleanPath}`;
}
