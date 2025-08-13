# Overview

LuxeVoyage is a premium luxury travel agency website built as a modern, interactive multi-page application. The project showcases high-end travel packages and destinations with sophisticated animations, glassmorphism design effects, and responsive layouts. It features a React-based frontend with TypeScript, premium UI components from shadcn/ui, and a full-stack architecture using Express.js with PostgreSQL database integration via Drizzle ORM.

# Recent Changes

## 2025-08-13: Authentication & Package Categorization Updates
- Implemented Replit authentication system with Google/Apple ID login support
- Fixed package duplicates and categorized packages into 5 distinct topics:
  * Ultra Luxury (Antarctica, Dubai Penthouse, Maldives, Swiss Alps)
  * Wine Master (Tuscany, Bordeaux, Napa Valley, Champagne Region)
  * Cultural (Angkor, Morocco, Greece, Egypt)
  * Cultural Immersion (Japan Ryokan, Bhutan Monastery, Peru Inca, Tibet)
  * Private Suite (Bali Cliff Villa, Iceland Glass Igloo, Norway Fjords, Patagonia)
- Enhanced AI chatbot with improved responsive design and proper minimize/maximize functionality
- Fixed footer contact icon sizing to match phone and location icons
- Added comprehensive admin dashboard for booking management (leonjoejoseph2010@gmail.com access)
- Implemented chat history email forwarding to luxevoyage25@gmail.com
- Set database start date to August 20th, 2025
- Created landing page for non-authenticated users with role-based access control

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: React 18 with TypeScript for type safety and modern development
- **Routing**: Wouter for lightweight client-side routing
- **Styling**: Tailwind CSS with custom luxury color palette (navy-deep, gold-accent, blue variations)
- **UI Components**: shadcn/ui component library with extensive Radix UI primitives
- **Animations**: Framer Motion for smooth page transitions, scroll-triggered animations, and interactive effects
- **Design System**: Custom glassmorphism cards, gradient buttons, and parallax hero sections

## State Management
- **Data Fetching**: TanStack React Query for server state management and caching
- **Form Handling**: React Hook Form with Zod validation for type-safe form schemas
- **Local State**: React hooks (useState, useEffect) for component-level state

## Build System
- **Bundler**: Vite for fast development and optimized production builds
- **Development**: Hot module replacement and runtime error overlay
- **TypeScript**: Strict configuration with path mapping for clean imports

## Backend Architecture
- **Runtime**: Node.js with Express.js server
- **Database**: PostgreSQL with Drizzle ORM for type-safe database operations
- **Session Management**: PostgreSQL-based session storage with connect-pg-simple
- **API Structure**: RESTful endpoints under `/api` prefix

## Database Design
- **ORM**: Drizzle ORM with TypeScript schema definitions
- **Migrations**: Automated migration system with schema versioning
- **Database Provider**: Neon serverless PostgreSQL for cloud deployment

## Responsive Design
- **Mobile-First**: Tailwind CSS responsive utilities for all screen sizes
- **Navigation**: Hamburger menu with slide animations for mobile
- **Adaptive Layouts**: Flexbox and CSS Grid for complex responsive layouts

## Performance Optimizations
- **Image Optimization**: Preconnect headers for external image domains (Unsplash, Pixabay)
- **Font Loading**: Google Fonts with preconnect for Playfair Display and Inter
- **Code Splitting**: Vite automatic code splitting for optimal bundle sizes
- **Lazy Loading**: Intersection Observer API for scroll-triggered animations

## User Experience Features
- **Smooth Scrolling**: Custom smooth scroll behavior for navigation anchors
- **Lightbox Gallery**: Custom lightbox component for image viewing
- **Scroll Indicators**: Back-to-top button and scroll progress indicators
- **Form Validation**: Real-time validation with user-friendly error messages
- **Loading States**: Preloader animation and loading states throughout

# External Dependencies

## UI and Styling
- **shadcn/ui**: Complete component library with Radix UI primitives
- **Tailwind CSS**: Utility-first CSS framework with custom configuration
- **Framer Motion**: Animation library for smooth transitions and interactions
- **Font Awesome**: Icon library for social media and UI icons
- **Google Fonts**: Playfair Display (serif) and Inter (sans-serif) typography

## Database and Backend
- **Neon Database**: Serverless PostgreSQL cloud database
- **Drizzle ORM**: TypeScript-first ORM with schema management
- **Express.js**: Web application framework for Node.js
- **connect-pg-simple**: PostgreSQL session store for Express sessions

## Development Tools
- **TypeScript**: Static type checking and enhanced developer experience
- **Zod**: Schema validation for forms and API data
- **React Hook Form**: Performant form library with validation
- **TanStack React Query**: Server state management and caching

## External Services
- **Unsplash**: High-quality travel photography for backgrounds and destinations
- **Pixabay**: Additional royalty-free images for content
- **Google Maps**: Embedded maps for contact page (referenced but not yet implemented)

## Deployment and Development
- **Replit**: Cloud development environment with integrated deployment
- **Vite**: Build tool with development server and production bundling
- **ESBuild**: Fast JavaScript bundler for server-side code