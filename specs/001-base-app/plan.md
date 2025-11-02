# Implementation Plan: Base Application Setup

**Branch**: `001-base-app` | **Date**: 2025-01-27 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/001-base-app/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/commands/plan.md` for the execution workflow.

## Summary

Create a complete full-stack application with NestJS backend and React frontend that can be easily set up and run using a single Docker Compose file. The application will implement Clean Architecture, Atomic Design, comprehensive security measures, and performance optimization for rapid development and deployment.

## Technical Context

<!--
  ACTION REQUIRED: Replace the content in this section with the technical details
  for the project. The structure here is presented in advisory capacity to guide
  the iteration process.
-->

**Language/Version**: Node.js 18+, TypeScript 5.0+, React 18+, NestJS 10+  
**Primary Dependencies**: NestJS, React, Docker, Docker Compose, Express, Axios, React Query  
**Storage**: N/A (stateless base application)  
**Testing**: Jest, React Testing Library, Supertest, @nestjs/testing  
**Target Platform**: Docker containers (Linux-based), Web browsers (Chrome, Firefox, Safari)  
**Project Type**: Web application (frontend + backend)  
**Performance Goals**: 200ms API response, 1.5s FCP, 2.5s LCP, 0.1 CLS, 100ms FID  
**Constraints**: <2min startup time, 95% first-attempt success, cross-platform compatibility  
**Scale/Scope**: Development team setup, single Docker Compose orchestration, hot reloading support

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

**Architecture Compliance**:
- [x] Project structure follows Clean Architecture with Domain/Application/Infrastructure/Presentation layers
- [x] Files organized by domain modules (DDD principles)
- [x] Dependencies point inward toward domain layer
- [x] Configuration managed through centralized config service

**Code Quality Gates**:
- [x] SOLID principles applied throughout design
- [x] DRY principle enforced - no code duplication
- [x] Single responsibility functions identified
- [x] Test strategy defined for all components

**Security & Performance**:
- [x] Security measures planned for all API endpoints
- [x] Performance requirements defined (200ms simple requests, 2s complex)
- [x] Caching strategy identified where appropriate
- [x] Input validation and output sanitization planned

**API Contract Compliance**:
- [x] API contract format standardized (JSON request/response)
- [x] OpenAPI/Swagger documentation planned for all endpoints
- [x] Request sanitization strategy defined (validation, escaping, trimming)
- [x] API versioning approach determined
- [x] Backward compatibility strategy established

**Frontend Development Compliance**:
- [x] Atomic Design methodology planned (Atoms → Molecules → Organisms → Templates → Pages)
- [x] Component architecture designed for reusability and composability
- [x] Design system and styling patterns established
- [x] Data flow architecture planned (child → parent component communication)
- [x] State management strategy with intelligent caching defined
- [x] Authentication via HTTP-only cookies implemented
- [x] HTTPS and security headers configured
- [x] Frontend performance targets set (FCP <1.5s, LCP <2.5s, CLS <0.1, FID <100ms)

**Development Standards**:
- [x] TDD approach defined for all functions
- [x] Test coverage target set (minimum 90%)
- [x] Code review process established
- [x] Static analysis and security scanning configured

**Test Organization Compliance**:
- [x] Unit test co-location strategy defined (tests next to source files)
- [x] E2E test directory structure planned (centralized tests/e2e/)
- [x] Integration test organization planned (tests/integration/)
- [x] Test naming conventions established (.test.ts, .spec.ts)
- [x] Test file discoverability and maintainability ensured

## Project Structure

### Documentation (this feature)

```text
specs/[###-feature]/
├── plan.md              # This file (/speckit.plan command output)
├── research.md          # Phase 0 output (/speckit.plan command)
├── data-model.md        # Phase 1 output (/speckit.plan command)
├── quickstart.md        # Phase 1 output (/speckit.plan command)
├── contracts/           # Phase 1 output (/speckit.plan command)
└── tasks.md             # Phase 2 output (/speckit.tasks command - NOT created by /speckit.plan)
```

### Source Code (repository root)

```text
backend/
├── src/
│   ├── domain/              # Domain layer (entities, value objects, business logic)
│   │   ├── entities/
│   │   │   ├── user.entity.ts
│   │   │   └── user.entity.test.ts        # Unit test co-located
│   │   ├── value-objects/
│   │   │   ├── email.vo.ts
│   │   │   └── email.vo.test.ts           # Unit test co-located
│   │   └── repositories/
│   │       ├── user.repository.ts
│   │       └── user.repository.test.ts    # Unit test co-located
│   ├── application/         # Application layer (use cases, services)
│   │   ├── use-cases/
│   │   │   ├── create-user.usecase.ts
│   │   │   └── create-user.usecase.test.ts # Unit test co-located
│   │   ├── services/
│   │   │   ├── user.service.ts
│   │   │   └── user.service.test.ts       # Unit test co-located
│   │   └── dto/
│   │       ├── create-user.dto.ts
│   │       └── create-user.dto.test.ts    # Unit test co-located
│   ├── infrastructure/      # Infrastructure layer (external concerns)
│   │   ├── database/
│   │   │   ├── user.repository.impl.ts
│   │   │   └── user.repository.impl.test.ts # Unit test co-located
│   │   ├── external-apis/
│   │   │   ├── email.service.ts
│   │   │   └── email.service.test.ts      # Unit test co-located
│   │   └── config/
│   │       ├── app.config.ts
│   │       └── app.config.test.ts         # Unit test co-located
│   ├── presentation/        # Presentation layer (controllers, middleware)
│   │   ├── controllers/
│   │   │   ├── user.controller.ts
│   │   │   └── user.controller.test.ts    # Unit test co-located
│   │   ├── middleware/
│   │   │   ├── auth.middleware.ts
│   │   │   └── auth.middleware.test.ts    # Unit test co-located
│   │   └── pipes/
│   │       ├── validation.pipe.ts
│   │       └── validation.pipe.test.ts    # Unit test co-located
│   ├── shared/              # Shared utilities
│   │   ├── decorators/
│   │   │   ├── auth.decorator.ts
│   │   │   └── auth.decorator.test.ts     # Unit test co-located
│   │   ├── guards/
│   │   │   ├── jwt.guard.ts
│   │   │   └── jwt.guard.test.ts         # Unit test co-located
│   │   └── interceptors/
│   │       ├── logging.interceptor.ts
│   │       └── logging.interceptor.test.ts # Unit test co-located
│   └── main.ts
├── tests/                   # Centralized test directories
│   ├── integration/         # Integration tests
│   │   ├── user.integration.test.ts
│   │   └── auth.integration.test.ts
│   └── e2e/                 # E2E tests
│       ├── user.e2e.test.ts
│       └── auth.e2e.test.ts
├── Dockerfile
└── package.json

frontend/
├── src/
│   ├── atoms/               # Atomic Design - Atoms
│   │   ├── Button/
│   │   │   ├── Button.tsx
│   │   │   └── Button.test.tsx            # Unit test co-located
│   │   ├── Input/
│   │   │   ├── Input.tsx
│   │   │   └── Input.test.tsx             # Unit test co-located
│   │   └── Typography/
│   │       ├── Typography.tsx
│   │       └── Typography.test.tsx        # Unit test co-located
│   ├── molecules/           # Atomic Design - Molecules
│   │   ├── SearchBox/
│   │   │   ├── SearchBox.tsx
│   │   │   └── SearchBox.test.tsx         # Unit test co-located
│   │   ├── Card/
│   │   │   ├── Card.tsx
│   │   │   └── Card.test.tsx              # Unit test co-located
│   │   └── FormField/
│   │       ├── FormField.tsx
│   │       └── FormField.test.tsx        # Unit test co-located
│   ├── organisms/           # Atomic Design - Organisms
│   │   ├── Header/
│   │   │   ├── Header.tsx
│   │   │   └── Header.test.tsx            # Unit test co-located
│   │   ├── Navigation/
│   │   │   ├── Navigation.tsx
│   │   │   └── Navigation.test.tsx        # Unit test co-located
│   │   └── DataTable/
│   │       ├── DataTable.tsx
│   │       └── DataTable.test.tsx         # Unit test co-located
│   ├── templates/           # Atomic Design - Templates
│   │   ├── MainLayout/
│   │   │   ├── MainLayout.tsx
│   │   │   └── MainLayout.test.tsx        # Unit test co-located
│   │   └── AuthLayout/
│   │       ├── AuthLayout.tsx
│   │       └── AuthLayout.test.tsx        # Unit test co-located
│   ├── pages/               # Atomic Design - Pages
│   │   ├── HomePage/
│   │   │   ├── HomePage.tsx
│   │   │   └── HomePage.test.tsx          # Unit test co-located
│   │   └── DashboardPage/
│   │       ├── DashboardPage.tsx
│   │       └── DashboardPage.test.tsx     # Unit test co-located
│   ├── services/            # API communication
│   │   ├── api/
│   │   │   ├── user.api.ts
│   │   │   └── user.api.test.ts           # Unit test co-located
│   │   ├── hooks/
│   │   │   ├── useUser.ts
│   │   │   └── useUser.test.ts            # Unit test co-located
│   │   └── cache/
│   │       ├── queryClient.ts
│   │       └── queryClient.test.ts        # Unit test co-located
│   ├── shared/              # Shared utilities
│   │   ├── utils/
│   │   │   ├── formatters.ts
│   │   │   └── formatters.test.ts         # Unit test co-located
│   │   ├── constants/
│   │   │   ├── api.constants.ts
│   │   │   └── api.constants.test.ts      # Unit test co-located
│   │   └── types/
│   │       ├── user.types.ts
│   │       └── user.types.test.ts         # Unit test co-located
│   └── App.tsx
├── tests/                   # Centralized test directories
│   ├── integration/         # Integration tests
│   │   ├── api.integration.test.ts
│   │   └── auth.integration.test.ts
│   └── e2e/                 # E2E tests
│       ├── user-flow.e2e.test.ts
│       └── auth-flow.e2e.test.ts
├── Dockerfile
└── package.json

docker-compose.yml
.env.example
README.md
```

**Structure Decision**: Web application structure selected with Clean Architecture for backend and Atomic Design for frontend. Backend follows Domain/Application/Infrastructure/Presentation layers, while frontend uses Atomic Design hierarchy. Both services are containerized with Docker and orchestrated via Docker Compose. Test organization follows constitution requirements: unit tests are co-located with source files using .test.ts/.test.tsx naming convention, while E2E and integration tests are centralized in tests/ directories for better maintainability and discoverability.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| [e.g., 4th project] | [current need] | [why 3 projects insufficient] |
| [e.g., Repository pattern] | [specific problem] | [why direct DB access insufficient] |
