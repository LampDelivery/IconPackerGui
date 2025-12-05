# Aliucord Icon Converter

## Overview
Aliucord Icon Converter is a web application that converts React Native (Discord RN) icon packs into Aliucord-compatible vector formats. Users can upload ZIP files containing PNG icons, and the tool will:
- Extract and detect PNG icons from the ZIP
- Convert PNG icons to SVG format using ImageTracer
- Generate Android VectorDrawable XML files
- Rename icons from RN naming convention (PascalCase) to Discord Kotlin naming convention (snake_case)

**Last Updated**: December 5, 2024

## Project Architecture

### Technology Stack
- **Frontend**: React 19 + Vite + Tailwind CSS v4
- **Backend**: Express.js + TypeScript
- **Database**: PostgreSQL (via Drizzle ORM) - optional, for future features
- **Icon Processing**: 
  - ImageTracer.js for PNG to SVG conversion
  - Custom SVG to Android VectorDrawable XML converter
- **File Handling**:
  - Multer for file uploads
  - AdmZip for ZIP extraction
  - Archiver for creating output ZIPs
- **UI Components**: Radix UI + shadcn/ui components
- **State Management**: TanStack React Query
- **Routing**: Wouter (client-side)

### Project Structure
```
.
├── client/                    # Frontend React application
│   ├── public/               # Static assets
│   └── src/
│       ├── components/       # React components
│       │   └── ui/          # Reusable UI components (shadcn/ui)
│       ├── hooks/           # Custom React hooks
│       ├── lib/             # Utility functions
│       │   ├── converter.ts    # SVG to XML conversion
│       │   ├── crosswalk.ts    # RN to Kotlin name mapping
│       │   └── queryClient.ts  # React Query setup
│       ├── pages/           # Page components
│       │   └── Home.tsx     # Main ZIP upload and conversion UI
│       └── types/           # TypeScript definitions
├── server/                   # Backend Express server
│   ├── index.ts            # Main server file
│   ├── routes.ts           # API routes (upload, convert, download)
│   ├── static.ts           # Static file serving
│   ├── storage.ts          # Data storage interface
│   └── vite.ts             # Vite dev middleware
├── shared/                  # Shared code between client/server
│   └── schema.ts           # Database schema (Drizzle)
└── script/
    └── build.ts            # Production build script
```

### Key Features
1. **ZIP Upload**: Drag-and-drop or click to upload RN icon pack ZIP files
2. **Auto-Detection**: Automatically finds all PNG icons in the ZIP
3. **Name Mapping**: 
   - Automatic RN to Kotlin name conversion (e.g., `CallIcon.png` → `ic_call_24dp`)
   - Manual editing of mappings
   - Crosswalk database with common icon mappings
4. **PNG to SVG**: Converts PNG icons to clean SVG vectors using ImageTracer
5. **SVG to XML**: Generates Android VectorDrawable XML files
6. **Export Options**: Choose to include SVG files, XML files, or both
7. **Download**: Get a ZIP with converted and renamed icons + manifest

### API Endpoints
- `POST /api/upload` - Upload ZIP file, returns session ID and detected icons
- `GET /api/session/:id` - Get session details
- `POST /api/session/:id/mapping` - Update icon name mappings
- `POST /api/session/:id/convert` - Convert all icons (PNG → SVG → XML)
- `GET /api/session/:id/download` - Download converted ZIP
- `DELETE /api/session/:id` - Clean up session

### Icon Naming Convention
| RN Format | Kotlin Format |
|-----------|---------------|
| `CallIcon.png` | `ic_call_24dp.xml` |
| `SearchIcon.png` | `ic_search_24dp.xml` |
| `SettingsGearIcon.png` | `ic_settings_gear_24dp.xml` |

## Development

### Running Locally
The application runs on a single Express server that serves both the API and the frontend:

- **Development**: `npm run dev` (port 5000)
  - Backend serves API routes and Vite dev middleware
  - Frontend uses Vite HMR for fast refresh
  
- **Production**: `npm run build && npm start`
  - Builds client and server into `dist/`
  - Serves static files from `dist/public`

### Database
The application uses PostgreSQL with Drizzle ORM (for future user features):

- **Schema**: `shared/schema.ts` defines the database tables
- **Migrations**: `npm run db:push` to sync schema changes
- **Configuration**: `drizzle.config.ts`

Currently uses in-memory session storage for icon processing.

### Environment Variables
- `DATABASE_URL`: PostgreSQL connection string
- `SESSION_SECRET`: Session encryption key
- `NODE_ENV`: Environment (development/production)
- `PORT`: Server port (default: 5000)

## Deployment

### Configuration
- **Type**: Autoscale deployment
- **Build**: `npm run build`
- **Start**: `npm start`
- **Port**: 5000 (required for Replit)

The build process:
1. Compiles frontend with Vite to `dist/public`
2. Bundles backend server with esbuild to `dist/index.cjs`
3. Minifies and optimizes for production

### Important Notes
- Server must bind to `0.0.0.0:5000` for Replit's proxy
- Vite config includes `allowedHosts: true` for iframe proxy support
- All API routes are prefixed with `/api`
- Temporary files are stored in `/tmp/` and cleaned up after sessions

## GitHub Pages Deployment

The app now supports client-side-only processing and can be deployed to GitHub Pages:

### Setup
1. Push to a GitHub repository
2. Go to Settings > Pages
3. Under "Build and deployment", select "GitHub Actions"
4. Push to `main` branch - the workflow at `.github/workflows/deploy-pages.yml` handles deployment

### Build Commands
- `npm run build:static` - Build static site for GitHub Pages (outputs to `dist/`)
- Uses `vite.config.static.ts` with relative base path

### Client-Side Processing
The app now processes everything in the browser:
- JSZip for ZIP extraction
- ImageTracer.js for PNG to SVG conversion
- No server required - all processing happens locally

## Recent Changes
- **2024-12-05**: Added GitHub Pages support
  - Migrated to client-side-only processing using JSZip and ImageTracer.js
  - Added GitHub Actions workflow for automatic deployment
  - Added `build:static` script for static site builds
  - Updated README with deployment instructions
- **2024-12-05**: Complete rewrite for ZIP upload workflow
  - Replaced Themes+ API fetching with local ZIP upload
  - Added server-side PNG to SVG conversion
  - Added SVG to Android VectorDrawable XML conversion
  - Created comprehensive RN to Kotlin name mapping crosswalk
  - New drag-and-drop upload UI
  - Icon mapping editor with inline editing
  - Export options for SVG/XML formats
  - Session-based processing with cleanup
- **2024-12-04**: Initial project import and Replit setup

## Icon Pack Sources
- **RN Icons**: https://github.com/nexpid/Themelings/tree/data/icons/app/design/components/Icon/native/redesign/generated/images
- **Kotlin Icons**: https://gitdab.com/Juby210/discord-jadx/src/branch/alpha/app/src/main/res/drawable

## Troubleshooting

### Common Issues
1. **Upload fails**: Ensure the file is a valid ZIP containing PNG files
2. **Conversion errors**: Check browser console for ImageTracer errors
3. **Missing icons**: Some icons may fail conversion if PNG is corrupted or too complex
4. **Port conflicts**: Ensure nothing else is using port 5000

### Development Tips
- Use React DevTools for component debugging
- Check browser console for frontend errors
- Server logs show API request/response details
- Vite provides fast HMR during development
