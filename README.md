# Pokemon Data Analysis Project

Full-stack application with NestJS backend and React frontend, containerized with Docker for easy setup and deployment.

## Quick Start

### Prerequisites

- Docker and Docker Compose installed
- Git installed

### Setup

1. Clone the repository:
```bash
git clone <repository-url>
cd pokemon-sdd/pokemon
```

2. Copy environment variables:
```bash
cp .env.example .env
```

3. Start the application:
```bash
docker-compose up
```

4. Access the application:
- Frontend: http://localhost:3001
- Backend API: http://localhost:3000/api/v1

## Project Structure

```
.
├── backend/          # NestJS backend application
│   ├── src/         # Source code (Clean Architecture)
│   └── Dockerfile   # Backend container configuration
├── frontend/         # React frontend application
│   ├── src/         # Source code (Atomic Design)
│   └── Dockerfile   # Frontend container configuration
└── docker-compose.yml # Orchestration configuration
```

## Development

### Backend Development

```bash
cd backend
npm install
npm run start:dev
```

### Frontend Development

```bash
cd frontend
npm install
npm run dev
```

## Testing

### Run All Tests

```bash
# Backend tests
cd backend && npm test

# Frontend tests
cd frontend && npm test

# E2E tests
cd frontend && npm run test:e2e
```

## Architecture

- **Backend**: Clean Architecture with Domain/Application/Infrastructure/Presentation layers
- **Frontend**: Atomic Design methodology (Atoms → Molecules → Organisms → Templates → Pages)
- **Testing**: Unit tests co-located with source files, E2E tests centralized

## Documentation

See `specs/001-base-app/` for detailed specifications, implementation plans, and task lists.

