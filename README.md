# Aliucord Icon Converter

Convert React Native icon packs to Aliucord-compatible vector icons (SVG/XML) with proper Discord Kotlin naming.

## Features

- Upload ZIP files containing PNG icons
- Automatic conversion to SVG and Android Vector XML formats
- Smart name mapping to Discord Kotlin naming conventions
- Client-side processing (no server required, works on static hosting)
- Download converted icons as a ZIP file

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

## GitHub Pages Deployment

This project supports automatic deployment to GitHub Pages. Here's how to set it up:

### Option 1: Automatic Deployment (Recommended)

1. Push your code to a GitHub repository
2. Go to your repository's Settings > Pages
3. Under "Build and deployment", select "GitHub Actions" as the source
4. Push to the `main` branch - the included workflow will automatically build and deploy

The workflow file at `.github/workflows/deploy-pages.yml` handles:
- Installing dependencies
- Building the static site
- Deploying to GitHub Pages

### Option 2: Manual Deployment

1. Build the static site:
   ```bash
   npm run build:static
   ```

2. The built files will be in the `dist` folder

3. In GitHub repository Settings > Pages:
   - Select "Deploy from a branch"
   - Choose the branch where you pushed the `dist` folder contents

## Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server (full-stack) |
| `npm run build:static` | Build static site for GitHub Pages |
| `npm run build` | Build full-stack production version |
| `npm start` | Run production server |

## How It Works

1. Upload a ZIP file containing PNG icons
2. Icons are extracted and analyzed in the browser using JSZip
3. PNGs are converted to SVG using ImageTracer.js
4. SVGs are converted to Android Vector XML format
5. Download the converted icons as a ZIP file

All processing happens entirely in your browser - no data is sent to any server.

## License

MIT
