# Knowhere.live - Location Intelligence Platform

This is a comprehensive geospatial search platform that transforms OpenStreetMap data into actionable location insights. The application helps users discover locations, analyze neighborhoods, and find nearby amenities through three specialized search tools.

## Project Overview

Knowhere.live is a location intelligence web application built for real estate professionals, urban planners, and location researchers. It combines OpenStreetMap data with advanced search capabilities to help users make informed location-based decisions. The platform offers three main search modes:

1. **Place Search (Demo)** - Find specific places by keyword within geographic areas
2. **Nearby Discovery** - Explore amenities around any address within a specified radius
3. **Smart Neighborhoods** - AI-powered natural language search for neighborhood characteristics

## Architecture & Technology Stack

### Frontend

- **Framework**: Preact (React-like) with TypeScript
- **Styling**: Tailwind CSS with DaisyUI components
- **Mapping**: Mapbox GL JS with react-map-gl integration
- **Routing**: preact-router for client-side navigation
- **Forms**: react-hook-form for form management
- **Build Tool**: Vite with TypeScript support

### Backend & Infrastructure

- **Hosting**: Cloudflare Pages with Functions
- **API**: Cloudflare Workers handling geospatial queries
- **Data Source**: OpenStreetMap via custom query API
- **Storage**: Cloudflare KV for URL shortening

### Development Tools

- **Task Runner**: Taskfile (Go Task) for build automation
- **Linting**: Deno for code formatting and linting
- **Testing**: Vitest with Playwright for E2E testing
- **Documentation**: MkDocs for API documentation

## Folder Structure

```
/
├── src/                    # Frontend source code
│   ├── components/         # Reusable UI components
│   │   ├── bottom-nav.tsx  # Navigation dock component
│   │   ├── dialog.tsx      # Modal dialog component
│   │   └── legend.tsx      # Map legend component
│   ├── form/              # Dynamic form system
│   │   ├── component.tsx   # Main form component
│   │   ├── types.ts        # Form field type definitions
│   │   └── inputs/         # Form input components (address, area, range, etc.)
│   ├── manifests/         # Search tool configurations
│   │   ├── demo.ts         # Place search manifest
│   │   ├── nearby.ts       # Nearby discovery manifest
│   │   ├── neighborhood.ts # Smart neighborhoods manifest
│   │   ├── type.ts         # Manifest type definitions
│   │   └── scripts/        # JavaScript execution scripts for each tool
│   ├── pages/             # Application pages
│   │   ├── home.tsx        # Landing page
│   │   ├── search.tsx      # Search configuration page
│   │   ├── map.tsx         # Interactive map display
│   │   └── editor.tsx      # Manifest editor (beta)
│   └── render/            # Map rendering and data management
│       ├── manager.tsx     # State management for manifests and values
│       ├── layers.ts       # Mapbox layer definitions and event handling
│       └── bounds.ts       # Geographic bounds utilities
├── functions/             # Cloudflare Workers
│   ├── proxy/[[index]].js # API proxy for geospatial queries
│   ├── helloworld.js      # Basic worker example
│   └── prompt.js          # AI prompt processing
├── docs/                  # Documentation site
│   ├── src/               # Documentation source
│   │   ├── global.d.ts    # TypeScript definitions for query API
│   │   └── examples/      # Code examples
│   └── mkdocs.yml         # Documentation configuration
├── test/                  # Test files
├── k6/                    # Load testing scripts
├── prompt/                # AI prompt templates
└── public/                # Static assets
```

## Key Components & APIs

### Manifest System

The application uses a "manifest" system to define search tools. Each manifest contains:

- **Form Schema**: Dynamic form configuration with field types (address, range, checkbox, text, etc.)
- **JavaScript Source**: Query execution logic that runs in a sandboxed environment
- **About Text**: Description of the search tool's purpose

### Form Field Types

- `address`: Mapbox address autocomplete with geocoding
- `area`: Geographic area selector (states/provinces)
- `range`: Numeric range slider input
- `checkbox`: Boolean toggle for features
- `string`: Text input with validation
- `text`: Multi-line text input
- `prompt`: AI-powered natural language input

### Query API (Global Namespace)

The JavaScript execution environment provides these global objects:

- `query`: Execute OpenStreetMap queries and address lookups
- `geo`: Geographic utilities for points, bounds, and spatial operations
- `assert`: Validation utilities for GeoJSON and conditions
- `colors`: Color palette utilities for map styling
- `params`: Form values passed to the execution script

### Map Layer System

Map visualization uses a sophisticated layering system:

- Dynamic layer creation based on GeoJSON feature properties
- Interactive popups and click handlers for external links
- Legend-based layer visibility controls
- Clustering and spatial analysis for performance

## Development Workflow

### Build Commands

```bash
task              # Default: format, lint, typecheck, build, docs
task server       # Start local development server
task build        # Build with watch mode
task test         # Run test suite
```

### Environment Setup

- Uses Yarn package manager
- Requires Node.js and Deno for development
- Mapbox access token required for map functionality
- Cloudflare account needed for deployment

## API Integration

### External Services

- **Mapbox**: Map tiles, geocoding, and address autocomplete
- **OpenStreetMap**: Geographic data via custom query API
- **Cloudflare Workers**: Serverless execution environment

### Internal APIs

- `/proxy/api/runtime`: Execute JavaScript manifests with query API
- Session storage for state persistence
- URL parameter sharing for search results

## Coding Standards

### TypeScript

- Strict type checking enabled
- Interface definitions for all data structures
- Comprehensive type safety for geographic operations

### Component Architecture

- Functional components with hooks
- Props interfaces for type safety
- Consistent naming conventions (PascalCase for components)

### Styling

- Tailwind CSS utility classes
- DaisyUI component library
- Responsive design patterns
- Consistent spacing and typography

## Key Patterns

### State Management

- Local state with Preact hooks
- Session storage for persistence
- URL parameters for sharing
- Manager class for centralized state operations

### Error Handling

- Graceful fallbacks for failed queries
- User-friendly error messages
- Console logging for debugging

### Performance

- Lazy loading of map data
- Efficient GeoJSON processing
- Debounced user inputs
- Optimized bundle splitting

When working on this codebase, prioritize maintainable, type-safe code that follows the existing patterns for forms, maps, and state management. The manifest system is central to adding new search capabilities.
