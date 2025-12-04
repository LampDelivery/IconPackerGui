# Aliucord Pack Maker

## Overview
Aliucord Pack Maker is a web application that converts Themes+ icon packs into Aliucord-compatible vector packs. It downloads icon packs from Themes+ and converts PNG icons to SVG format using ImageTracer.

**Last Updated**: December 4, 2024

## Project Architecture

### Technology Stack
- **Frontend**: React 19 + Vite + Tailwind CSS v4
- **Backend**: Express.js + TypeScript
- **Database**: PostgreSQL (via Drizzle ORM)
- **Icon Processing**: ImageTracer.js for PNG to SVG conversion
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
│       │   ├── ui/          # Reusable UI components (shadcn/ui)
│       │   ├── ExportPanel.tsx
│       │   ├── IconGrid.tsx
│       │   └── PackSelector.tsx
│       ├── hooks/           # Custom React hooks
│       ├── lib/             # Utility functions
│       │   ├── converter.ts    # Icon conversion logic
│       │   ├── crosswalk.ts    # Icon mapping
│       │   └── themesplus.ts   # Themes+ API client
│       ├── pages/           # Page components
│       └── types/           # TypeScript definitions
├── server/                   # Backend Express server
│   ├── index.ts            # Main server file
│   ├── routes.ts           # API routes
│   ├── static.ts           # Static file serving
│   ├── storage.ts          # Data storage interface
│   └── vite.ts             # Vite dev middleware
├── shared/                  # Shared code between client/server
│   └── schema.ts           # Database schema (Drizzle)
└── script/
    └── build.ts            # Production build script
```

### Key Features
1. **Pack Selection**: Browse and select from available Themes+ icon packs
2. **Icon Processing**: Converts PNG icons to SVG vectors using ImageTracer
3. **Batch Processing**: Process multiple icons simultaneously
4. **Export**: Download converted icon packs as ZIP files
5. **Android Name Mapping**: Map icon names to Android resource names

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
The application uses PostgreSQL with Drizzle ORM:

- **Schema**: `shared/schema.ts` defines the database tables
- **Migrations**: `npm run db:push` to sync schema changes
- **Configuration**: `drizzle.config.ts`

Currently uses in-memory storage (`MemStorage`) for user data. The database schema includes a `users` table with authentication support.

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

## Recent Changes
- **2024-12-04**: Initial project import and Replit setup
  - Installed dependencies
  - Configured PostgreSQL database
  - Set up development workflow
  - Configured deployment settings
  - Verified application functionality

## Maintenance

### Adding New Icon Packs
Icon pack data is fetched from Themes+ API. See `client/src/lib/themesplus.ts` for the API client.

### Updating Dependencies
```bash
npm update
npm audit fix
```

### Database Updates
After modifying `shared/schema.ts`:
```bash
npm run db:push
```

## Troubleshooting

### Common Issues
1. **Port conflicts**: Ensure nothing else is using port 5000
2. **Database connection**: Verify `DATABASE_URL` is set correctly
3. **Build failures**: Clear `dist/` and rebuild
4. **Icon processing errors**: Check browser console for ImageTracer errors

### Development Tips
- Use React DevTools for component debugging
- Check browser console for frontend errors
- Server logs show API request/response details
- Vite provides fast HMR during development
