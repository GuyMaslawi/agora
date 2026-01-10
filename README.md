# Countries Dashboard

A full-stack Single Page Application (SPA) for browsing countries with real-time search and sorting capabilities.

## Tech Stack

- **Frontend**: React + TypeScript + Material UI (MUI)
- **Backend**: NestJS + TypeScript
- **Testing**: 
  - Frontend: Vitest + React Testing Library
  - Backend: Jest + Supertest
- **Data Source**: REST Countries API (via backend)

## Features

- View all countries with flag, name, capital, and population
- Real-time search by country name
- Sort by name (A→Z / Z→A) or population (asc/desc)
- Responsive grid layout
- Loading and error states with retry functionality
- In-memory caching on backend (10-minute TTL)

## Project Structure

```
agora/
├── client/          # React frontend
│   ├── src/
│   │   ├── api/     # API client
│   │   ├── components/
│   │   │   ├── CountriesPage/
│   │   │   ├── CountriesToolbar/
│   │   │   ├── CountriesGrid/
│   │   │   ├── CountryCard/
│   │   │   ├── LoadingState/
│   │   │   └── ErrorState/
│   │   └── types/   # TypeScript types
│   └── ...
├── server/          # NestJS backend
│   ├── src/
│   │   ├── countries/
│   │   │   ├── countries.controller.ts
│   │   │   ├── countries.service.ts
│   │   │   ├── countries.module.ts
│   │   │   └── countries.dto.ts
│   │   └── ...
│   └── ...
└── docker-compose.yml
```

## Setup

### Prerequisites

- Node.js 20+ 
- pnpm (or npm)
- Docker (optional, for containerized deployment)

### Installation

1. Install dependencies:
```bash
pnpm install
```

2. Start development servers:
```bash
pnpm dev
```

This will start:
- Frontend on http://localhost:3000
- Backend on http://localhost:3001

### Individual Commands

**Root level:**
- `pnpm dev` - Start both client and server in development mode
- `pnpm test` - Run all tests
- `pnpm build` - Build both client and server
- `pnpm lint` - Lint all code
- `pnpm format` - Format all code with Prettier

**Client:**
- `cd client && pnpm dev` - Start dev server
- `cd client && pnpm test` - Run tests
- `cd client && pnpm build` - Build for production

**Server:**
- `cd server && pnpm dev` - Start dev server with watch mode
- `cd server && pnpm test` - Run unit tests
- `cd server && pnpm test:e2e` - Run E2E tests
- `cd server && pnpm build` - Build for production

## Docker

### Build and Run with Docker Compose

```bash
docker-compose up --build
```

This will:
- Build and start the server on port 3001
- Build and start the client on port 3000
- Configure networking between containers

### Individual Docker Builds

**Server:**
```bash
cd server
docker build -t countries-server .
docker run -p 3001:3001 countries-server
```

**Client:**
```bash
cd client
docker build -t countries-client .
docker run -p 3000:3000 countries-client
```

## API Endpoints

### GET /api/countries

Returns a list of all countries with the following structure:

```json
[
  {
    "code": "US",
    "name": "United States",
    "capital": "Washington, D.C.",
    "population": 331000000,
    "flagUrl": "https://flagcdn.com/w320/us.png"
  }
]
```

**Response Codes:**
- `200` - Success
- `502` - External API failure

## Testing

### Frontend Tests

Tests use Vitest and React Testing Library with MSW for network mocking:

```bash
cd client
pnpm test
```

### Backend Tests

Tests use Jest and Supertest:

```bash
cd server
pnpm test          # Unit tests
pnpm test:e2e      # E2E tests
```

## Code Style

- **Styling**: All styles are in `.sx.ts` files (no inline styles)
- **Components**: Small, composable, memoized where appropriate
- **Functions**: Pure functions preferred, with memoization for derived data
- **TypeScript**: Strict typing throughout

## Architecture Decisions

1. **Monorepo**: Single repository for easier development and deployment
2. **Backend Proxy**: Client never calls external API directly; all requests go through backend
3. **Caching**: In-memory cache on backend (10-minute TTL) to reduce external API calls
4. **React Query**: Used for client-side data fetching, caching, and error handling
5. **Component Structure**: Each component has its own folder with `.tsx`, `.test.tsx`, and `.sx.ts` files

## License

MIT

