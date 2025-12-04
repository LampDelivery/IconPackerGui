// Simple SVG to Android VectorDrawable XML converter
// This is a client-side approximation.

export function svgToAndroidVector(svgContent: string, viewportSize = 24): string {
  // 1. Extract path data (d attribute)
  // This regex is a rough approximation. A real DOM parser is safer.
  
  const parser = new DOMParser();
  const doc = parser.parseFromString(svgContent, "image/svg+xml");
  const paths = Array.from(doc.querySelectorAll("path"));
  
  let pathElements = "";
  
  paths.forEach(path => {
    const d = path.getAttribute("d");
    const fill = path.getAttribute("fill") || "#FFFFFFFF"; // Default white if undefined
    
    if (d) {
      pathElements += `
    <path
        android:fillColor="${fill === 'none' ? '#00000000' : fill}"
        android:pathData="${d}" />`;
    }
  });

  // If no paths, try to grab from groups or just return empty (simplified)
  
  return `<?xml version="1.0" encoding="utf-8"?>
<vector xmlns:android="http://schemas.android.com/apk/res/android"
    android:width="${viewportSize}dp"
    android:height="${viewportSize}dp"
    android:viewportWidth="${viewportSize}"
    android:viewportHeight="${viewportSize}">
${pathElements}
</vector>`;
}

export function createManifest(
  packName: string, 
  version: string, 
  sourcePackId: string, 
  mappings: Record<string, string>
) {
  return JSON.stringify({
    name: packName,
    version: version,
    sourcePack: sourcePackId,
    mappings: mappings,
    generatedAt: new Date().toISOString()
  }, null, 2);
}
