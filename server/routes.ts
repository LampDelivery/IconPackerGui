import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import multer from "multer";
import AdmZip from "adm-zip";
import archiver from "archiver";
import path from "path";
import fs from "fs/promises";
import { existsSync, mkdirSync, createWriteStream } from "fs";
import ImageTracer from "imagetracerjs";
import { suggestKotlinName } from "./crosswalk";

const TEMP_DIR = "/tmp/iconpack-uploads";
const PROCESSED_DIR = "/tmp/iconpack-processed";

if (!existsSync(TEMP_DIR)) mkdirSync(TEMP_DIR, { recursive: true });
if (!existsSync(PROCESSED_DIR)) mkdirSync(PROCESSED_DIR, { recursive: true });

const storage = multer.diskStorage({
  destination: TEMP_DIR,
  filename: (_req, file, cb) => {
    const uniqueName = `${Date.now()}-${Math.random().toString(36).slice(2)}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 100 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    if (file.mimetype === "application/zip" || file.originalname.endsWith(".zip")) {
      cb(null, true);
    } else {
      cb(new Error("Only ZIP files are allowed"));
    }
  },
});

interface DiscoveredIcon {
  originalName: string;
  originalPath: string;
  suggestedKotlinName: string;
  buffer: Buffer;
}

function discoverIconsInZip(zipPath: string): DiscoveredIcon[] {
  const zip = new AdmZip(zipPath);
  const entries = zip.getEntries();
  const icons: DiscoveredIcon[] = [];
  
  for (const entry of entries) {
    if (entry.isDirectory) continue;
    const name = entry.entryName;
    if (!name.toLowerCase().endsWith(".png")) continue;
    const basename = path.basename(name);
    if (basename.startsWith(".") || basename.startsWith("__")) continue;
    
    const buffer = entry.getData();
    if (buffer.length === 0) continue;
    
    icons.push({
      originalName: basename,
      originalPath: name,
      suggestedKotlinName: suggestKotlinName(basename),
      buffer,
    });
  }
  
  return icons;
}

async function pngToSvg(pngBuffer: Buffer): Promise<string> {
  return new Promise((resolve, reject) => {
    const base64 = pngBuffer.toString("base64");
    const dataUri = `data:image/png;base64,${base64}`;
    
    ImageTracer.imageToSVG(
      dataUri,
      (svgString: string) => {
        if (svgString) {
          resolve(svgString);
        } else {
          reject(new Error("ImageTracer returned empty SVG"));
        }
      },
      {
        ltres: 1,
        qtres: 1,
        pathomit: 8,
        colorsampling: 2,
        numberofcolors: 16,
        strokewidth: 0,
        viewbox: true,
      }
    );
  });
}

function svgToAndroidVector(svgContent: string, viewportSize = 24): string {
  const pathRegex = /<path[^>]*d="([^"]*)"[^>]*(?:fill="([^"]*)")?[^>]*>/gi;
  const paths: Array<{ d: string; fill: string }> = [];
  
  let match;
  while ((match = pathRegex.exec(svgContent)) !== null) {
    paths.push({
      d: match[1],
      fill: match[2] || "#FFFFFFFF",
    });
  }
  
  if (paths.length === 0) {
    const altPathRegex = /<path[^>]*(?:fill="([^"]*)")?[^>]*d="([^"]*)"[^>]*>/gi;
    while ((match = altPathRegex.exec(svgContent)) !== null) {
      paths.push({
        d: match[2],
        fill: match[1] || "#FFFFFFFF",
      });
    }
  }
  
  let pathElements = "";
  paths.forEach((p) => {
    const fillColor = p.fill === "none" ? "#00000000" : p.fill.startsWith("#") ? p.fill : `#${p.fill}`;
    pathElements += `
    <path
        android:fillColor="${fillColor}"
        android:pathData="${p.d}" />`;
  });

  return `<?xml version="1.0" encoding="utf-8"?>
<vector xmlns:android="http://schemas.android.com/apk/res/android"
    android:width="${viewportSize}dp"
    android:height="${viewportSize}dp"
    android:viewportWidth="${viewportSize}"
    android:viewportHeight="${viewportSize}">
${pathElements}
</vector>`;
}

interface ProcessedSession {
  id: string;
  originalFileName: string;
  icons: Array<{
    originalName: string;
    originalPath: string;
    suggestedKotlinName: string;
    kotlinName: string;
    svgData?: string;
    xmlData?: string;
    status: "pending" | "processing" | "done" | "error";
    error?: string;
  }>;
  createdAt: Date;
}

const sessions = new Map<string, ProcessedSession>();

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {

  app.post("/api/upload", upload.single("iconpack"), async (req: Request, res: Response) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" });
      }

      const icons = discoverIconsInZip(req.file.path);
      
      if (icons.length === 0) {
        await fs.unlink(req.file.path).catch(() => {});
        return res.status(400).json({ error: "No PNG icons found in ZIP" });
      }

      const sessionId = `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
      
      const session: ProcessedSession = {
        id: sessionId,
        originalFileName: req.file.originalname,
        icons: icons.map((icon) => ({
          originalName: icon.originalName,
          originalPath: icon.originalPath,
          suggestedKotlinName: icon.suggestedKotlinName,
          kotlinName: icon.suggestedKotlinName,
          status: "pending" as const,
        })),
        createdAt: new Date(),
      };
      
      const sessionDir = path.join(PROCESSED_DIR, sessionId);
      await fs.mkdir(sessionDir, { recursive: true });
      
      for (const icon of icons) {
        const pngPath = path.join(sessionDir, icon.originalName);
        await fs.writeFile(pngPath, icon.buffer);
      }

      sessions.set(sessionId, session);
      
      await fs.unlink(req.file.path).catch(() => {});

      res.json({
        sessionId,
        iconCount: icons.length,
        icons: session.icons,
      });
    } catch (error: any) {
      console.error("Upload error:", error);
      res.status(500).json({ error: error.message || "Upload failed" });
    }
  });

  app.get("/api/session/:sessionId", (req: Request, res: Response) => {
    const session = sessions.get(req.params.sessionId);
    if (!session) {
      return res.status(404).json({ error: "Session not found" });
    }
    res.json(session);
  });

  app.post("/api/session/:sessionId/mapping", (req: Request, res: Response) => {
    const session = sessions.get(req.params.sessionId);
    if (!session) {
      return res.status(404).json({ error: "Session not found" });
    }

    const { mappings } = req.body;
    if (!mappings || typeof mappings !== "object") {
      return res.status(400).json({ error: "Invalid mappings" });
    }

    for (const [originalName, kotlinName] of Object.entries(mappings)) {
      const icon = session.icons.find((i) => i.originalName === originalName);
      if (icon && typeof kotlinName === "string") {
        icon.kotlinName = kotlinName;
      }
    }

    res.json({ success: true, icons: session.icons });
  });

  app.post("/api/session/:sessionId/convert", async (req: Request, res: Response) => {
    const session = sessions.get(req.params.sessionId);
    if (!session) {
      return res.status(404).json({ error: "Session not found" });
    }

    const sessionDir = path.join(PROCESSED_DIR, session.id);
    let successCount = 0;
    let errorCount = 0;

    for (const icon of session.icons) {
      if (icon.status === "done") {
        successCount++;
        continue;
      }
      
      icon.status = "processing";

      try {
        const pngPath = path.join(sessionDir, icon.originalName);
        const pngBuffer = await fs.readFile(pngPath);
        const svgData = await pngToSvg(pngBuffer);
        const xmlData = svgToAndroidVector(svgData);
        
        icon.svgData = svgData;
        icon.xmlData = xmlData;
        icon.status = "done";
        successCount++;
      } catch (error: any) {
        icon.status = "error";
        icon.error = error.message || "Conversion failed";
        errorCount++;
      }
    }

    res.json({
      success: true,
      successCount,
      errorCount,
      icons: session.icons,
    });
  });

  app.get("/api/session/:sessionId/download", async (req: Request, res: Response) => {
    const session = sessions.get(req.params.sessionId);
    if (!session) {
      return res.status(404).json({ error: "Session not found" });
    }

    const includeSvg = req.query.svg !== "false";
    const includeXml = req.query.xml !== "false";
    const packName = (req.query.name as string) || session.originalFileName.replace(".zip", "") || "iconpack";

    const archive = archiver("zip", { zlib: { level: 9 } });
    
    res.setHeader("Content-Type", "application/zip");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="${packName}-aliucord.zip"`
    );

    archive.pipe(res);

    const mappings: Record<string, { original: string; svg?: string; xml?: string }> = {};

    for (const icon of session.icons) {
      if (icon.status !== "done" || !icon.svgData) continue;

      const safeName = icon.kotlinName.toLowerCase().replace(/[^a-z0-9_]/g, "_");
      
      mappings[icon.originalName] = {
        original: icon.originalPath,
        svg: includeSvg ? `svg/${safeName}.svg` : undefined,
        xml: includeXml ? `drawable/${safeName}.xml` : undefined,
      };

      if (includeSvg) {
        archive.append(icon.svgData, { name: `svg/${safeName}.svg` });
      }

      if (includeXml && icon.xmlData) {
        archive.append(icon.xmlData, { name: `drawable/${safeName}.xml` });
      }
    }

    const manifest = JSON.stringify(
      {
        name: packName,
        version: "1.0.0",
        generatedAt: new Date().toISOString(),
        iconCount: Object.keys(mappings).length,
        mappings,
      },
      null,
      2
    );
    archive.append(manifest, { name: "manifest.json" });

    await archive.finalize();
  });

  app.delete("/api/session/:sessionId", async (req: Request, res: Response) => {
    const session = sessions.get(req.params.sessionId);
    if (!session) {
      return res.status(404).json({ error: "Session not found" });
    }

    const sessionDir = path.join(PROCESSED_DIR, session.id);
    await fs.rm(sessionDir, { recursive: true, force: true }).catch(() => {});
    sessions.delete(session.id);

    res.json({ success: true });
  });

  return httpServer;
}
