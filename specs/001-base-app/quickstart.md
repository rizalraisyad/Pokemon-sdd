# Quickstart Guide: Base Application Setup

**Feature**: 001-base-app  
**Created**: 2025-01-27  
**Purpose**: Get the base application running quickly with minimal setup

## Prerequisites

- Docker 20.10+ and Docker Compose 2.0+
- Git
- 4GB RAM available
- Ports 3000 and 3001 available on your machine

## Quick Setup (2 minutes)

### 1. Clone and Start

```bash
# Clone the repository
git clone <repository-url>
cd pokemon-sdd

# Start the application
docker-compose up
```

### 2. Verify Installation

Open your browser and visit:
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:3001/api/v1/health
- **API Documentation**: http://localhost:3001/api/docs

You should see:
- A working React application with Atomic Design components
- A health check response from the NestJS API
- Interactive Swagger documentation

## Development Mode

### Hot Reloading Setup

```bash
# Start in development mode with hot reloading
docker-compose -f docker-compose.yml -f docker-compose.dev.yml up
```

This enables:
- Automatic backend restart on code changes
- React Fast Refresh for instant UI updates
- Source maps for debugging
- Volume mounting for live code editing

### Environment Configuration

Copy the example environment file:

```bash
cp .env.example .env
```

Edit `.env` to customize:
- API ports and URLs
- CORS origins
- Log levels
- Database connections (if added later)

## Project Structure

```
pokemon-sdd/
├── backend/                 # NestJS API
│   ├── src/
│   │   ├── domain/         # Business logic
│   │   ├── application/    # Use cases
│   │   ├── infrastructure/ # External concerns
│   │   └── presentation/   # Controllers
│   └── Dockerfile
├── frontend/               # React App
│   ├── src/
│   │   ├── atoms/         # Basic components
│   │   ├── molecules/     # Composite components
│   │   ├── organisms/     # Complex components
│   │   ├── templates/     # Layouts
│   │   └── pages/         # Page components
│   └── Dockerfile
└── docker-compose.yml     # Orchestration
```

## API Usage

### Health Check

```bash
# Basic health check
curl http://localhost:3001/api/v1/health

# With service dependencies
curl "http://localhost:3001/api/v1/health?includeServices=true"
```

### Configuration

```bash
# Get current configuration
curl -H "Authorization: Bearer <token>" \
     http://localhost:3001/api/v1/config

# Update configuration
curl -X PUT \
     -H "Content-Type: application/json" \
     -H "Authorization: Bearer <token>" \
     -d '{"logLevel": "debug"}' \
     http://localhost:3001/api/v1/config
```

## Frontend Development

### Component Development

The frontend follows Atomic Design principles:

1. **Atoms**: Basic UI elements (Button, Input, Typography)
2. **Molecules**: Simple combinations (SearchBox, FormField)
3. **Organisms**: Complex components (Header, DataTable)
4. **Templates**: Page layouts (MainLayout, AuthLayout)
5. **Pages**: Specific implementations (HomePage, DashboardPage)

### State Management

- **Server State**: React Query for API data
- **Client State**: React Context for UI state
- **Caching**: Intelligent caching with React Query

### API Integration

```typescript
// Example API hook
import { useQuery } from '@tanstack/react-query';

const useHealthCheck = () => {
  return useQuery({
    queryKey: ['health'],
    queryFn: () => fetch('/api/v1/health').then(res => res.json()),
    staleTime: 30000, // 30 seconds
  });
};
```

## Testing

### Test Organization

The project follows constitution-mandated test organization:

- **Unit Tests**: Co-located with source files (e.g., `Button.tsx` → `Button.test.tsx`)
- **Integration Tests**: Centralized in `tests/integration/` directory
- **E2E Tests**: Centralized in `tests/e2e/` directory

### Run All Tests

```bash
# Backend tests
docker-compose exec backend npm test

# Frontend tests
docker-compose exec frontend npm test

# Integration tests
docker-compose exec backend npm run test:integration
docker-compose exec frontend npm run test:integration

# E2E tests
docker-compose exec frontend npm run test:e2e
```

### Test Coverage

- Backend: Jest + Supertest (90%+ coverage)
- Frontend: Jest + React Testing Library (90%+ coverage)
- E2E: Playwright for full user flows

### Test File Examples

```bash
# Unit tests (co-located)
src/components/Button/Button.tsx
src/components/Button/Button.test.tsx

# Integration tests (centralized)
tests/integration/api.integration.test.ts
tests/integration/auth.integration.test.ts

# E2E tests (centralized)
tests/e2e/user-flow.e2e.test.ts
tests/e2e/auth-flow.e2e.test.ts
```

## Troubleshooting

### Common Issues

**Port conflicts**:
```bash
# Check what's using the ports
lsof -i :3000
lsof -i :3001

# Kill processes if needed
kill -9 <PID>
```

**Docker issues**:
```bash
# Clean up Docker
docker-compose down
docker system prune -f
docker-compose up --build
```

**Permission issues** (Linux/Mac):
```bash
# Fix file permissions
sudo chown -R $USER:$USER .
```

### Logs

```bash
# View all logs
docker-compose logs

# View specific service logs
docker-compose logs backend
docker-compose logs frontend

# Follow logs in real-time
docker-compose logs -f
```

## Performance Monitoring

### Backend Metrics

- API response times (target: <200ms)
- Memory usage
- CPU usage
- Request throughput

### Frontend Metrics

- First Contentful Paint (target: <1.5s)
- Largest Contentful Paint (target: <2.5s)
- Cumulative Layout Shift (target: <0.1)
- First Input Delay (target: <100ms)

### Monitoring Commands

```bash
# Check container health
docker-compose ps

# Monitor resource usage
docker stats

# Check application logs
docker-compose logs --tail=100
```

## Next Steps

1. **Add Features**: Use this base to build your specific features
2. **Database Integration**: Add PostgreSQL or MongoDB
3. **Authentication**: Implement JWT-based auth
4. **Deployment**: Deploy to cloud platforms
5. **Monitoring**: Add APM tools (New Relic, DataDog)

## Support

- **Documentation**: Check the `/docs` folder
- **API Reference**: Visit http://localhost:3001/api/docs
- **Issues**: Report bugs in the project repository
- **Team**: Contact the development team

---

**Happy coding!** 🚀
