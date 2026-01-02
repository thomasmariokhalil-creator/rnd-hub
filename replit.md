# RND Student Hub

## Overview

RND Student Hub is a web application designed for students at Regiopolis-Notre Dame Catholic High School. It serves as a centralized information portal providing daily announcements, cafeteria menus, club listings, sports updates, and important school dates. The application follows a mobile-first design approach with a garnet (#800000) and gold (#FFD700) color scheme matching the school branding.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter (lightweight client-side router)
- **State Management**: TanStack React Query for server state caching and synchronization
- **Styling**: Tailwind CSS with CSS variables for theming, using shadcn/ui component library (New York style)
- **Build Tool**: Vite with HMR support
- **Typography**: DM Sans (body) and Outfit (display) fonts

The frontend follows a page-based architecture with shared components:
- Pages live in `client/src/pages/` (Home, News, Menu, Clubs, Sports, Events)
- Reusable components in `client/src/components/`
- Custom hooks for data fetching in `client/src/hooks/use-data.ts`
- UI primitives from shadcn/ui in `client/src/components/ui/`

### Backend Architecture
- **Runtime**: Node.js with Express
- **Language**: TypeScript (ESM modules)
- **API Design**: RESTful endpoints under `/api/` prefix
- **Schema Validation**: Zod for runtime type validation
- **Database ORM**: Drizzle ORM with PostgreSQL dialect

The server structure:
- `server/index.ts` - Express app setup and middleware
- `server/routes.ts` - API route handlers with data seeding
- `server/storage.ts` - Database access layer implementing IStorage interface
- `server/db.ts` - Database connection pool setup

### Data Models
Six core entities defined in `shared/schema.ts`:
1. **Announcements** - Daily news items with title, date, summary, content
2. **Menu Items** - Cafeteria offerings with date, category, location, price
3. **Clubs** - Student organizations with meeting times and contact info
4. **Sports Events** - Games and tryouts with dates and results
5. **School Events** - Important dates, schedules, holidays
6. **Featured Content** - Carousel items for homepage highlights

### Shared Code
The `shared/` directory contains code used by both frontend and backend:
- `schema.ts` - Drizzle table definitions and Zod insert schemas
- `routes.ts` - API route definitions with type-safe response schemas

### Build System
- Development: `tsx` for TypeScript execution with hot reload
- Production build: Vite for client bundling, esbuild for server bundling
- Database migrations: Drizzle Kit with `db:push` command

## External Dependencies

### Database
- **PostgreSQL** - Primary data store, connection via `DATABASE_URL` environment variable
- **Drizzle ORM** - Type-safe database queries and schema management
- **connect-pg-simple** - PostgreSQL session store (available but not currently used)

### UI Component Libraries
- **Radix UI** - Headless accessible component primitives (dialogs, dropdowns, tabs, etc.)
- **shadcn/ui** - Pre-styled component library built on Radix
- **Embla Carousel** - Touch-friendly carousel for featured content
- **Lucide React** - Icon library

### Utilities
- **date-fns** - Date formatting and manipulation
- **Zod** - Schema validation for API requests/responses
- **class-variance-authority** - Component variant styling

### Development Tools
- **Vite** - Frontend build tool with React plugin
- **Replit plugins** - Error overlay, cartographer, and dev banner for Replit environment