# Tasks: Base Application Setup

**Input**: Design documents from `/specs/001-base-app/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Tests**: Tests are included as they are explicitly required by the constitution (TDD approach with 90%+ coverage).

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- **Web app**: `backend/src/`, `frontend/src/`
- **Tests**: Unit tests co-located with source files, E2E tests in centralized `tests/` directories

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [x] T001 Create project root structure with backend/ and frontend/ directories
- [x] T002 Initialize NestJS backend project with TypeScript in backend/
- [x] T003 Initialize React frontend project with TypeScript in frontend/
- [x] T004 [P] Configure ESLint and Prettier for both backend and frontend
- [x] T005 [P] Setup TypeScript configuration for both projects
- [x] T006 [P] Configure Jest testing framework for both projects
- [x] T007 [P] Setup Docker configuration files (Dockerfile, docker-compose.yml)
- [x] T008 [P] Create .env.example files for both projects
- [x] T009 [P] Setup package.json scripts for development and production
- [x] T010 [P] Configure Git hooks and pre-commit validation

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [x] T011 Setup Clean Architecture project structure in backend/src/
- [x] T012 [P] Setup Atomic Design component structure in frontend/src/
- [x] T013 [P] Implement centralized configuration service in backend/src/infrastructure/config/
- [x] T014 [P] Setup environment variable management and validation
- [x] T015 [P] Configure NestJS modules and dependency injection
- [x] T016 [P] Setup React Query for state management in frontend/src/services/
- [x] T017 [P] Implement base domain entities (AppConfig, HealthCheckResponse, ApiResponse)
- [ ] T018 [P] Setup error handling and logging infrastructure (Winston)
- [ ] T019 [P] Configure security middleware (input validation, output sanitization)
- [ ] T020 [P] Setup API contract validation and OpenAPI/Swagger generation
- [ ] T021 [P] Configure request sanitization pipeline (trimming, escaping, validation)
- [ ] T022 [P] Setup HTTP-only cookie authentication framework
- [ ] T023 [P] Configure HTTPS and security headers for frontend-backend communication
- [x] T024 [P] Setup performance monitoring and caching framework
- [x] T025 [P] Configure unit test co-location structure (tests next to source files)
- [x] T026 [P] Setup E2E test directory structure (centralized tests/e2e/)
- [x] T027 [P] Configure integration test directory structure (tests/integration/)
- [x] T028 [P] Setup test naming conventions and file organization
- [x] T029 [P] Configure Docker networking and volume mounting for development
- [x] T030 [P] Setup health check endpoints and monitoring

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - Quick Development Setup (Priority: P1) 🎯 MVP

**Goal**: Enable developers to quickly set up a complete development environment with both backend and frontend applications running locally with minimal configuration.

**Independent Test**: Run `docker-compose up` and verify both backend and frontend are accessible and communicating properly.

### Tests for User Story 1

> **NOTE: Write these tests FIRST, ensure they FAIL before implementation**

- [ ] T031 [P] [US1] Unit test for health check endpoint in backend/src/presentation/controllers/health.controller.test.ts
- [ ] T032 [P] [US1] Unit test for AppConfig service in backend/src/infrastructure/config/app.config.test.ts
- [ ] T033 [P] [US1] Unit test for React App component in frontend/src/App.test.tsx
- [ ] T034 [P] [US1] Integration test for Docker setup in tests/integration/docker-setup.integration.test.ts
- [ ] T035 [P] [US1] E2E test for complete application startup in tests/e2e/startup.e2e.test.ts

### Implementation for User Story 1

- [x] T036 [P] [US1] Create AppConfig entity in backend/src/domain/entities/app-config.entity.ts
- [x] T037 [P] [US1] Create HealthCheckResponse entity in backend/src/domain/entities/health-check-response.entity.ts
- [x] T038 [P] [US1] Create ApiResponse entity in backend/src/domain/entities/api-response.entity.ts
- [x] T039 [P] [US1] Implement AppConfig service in backend/src/infrastructure/config/app.config.ts
- [x] T040 [P] [US1] Implement health check service in backend/src/application/services/health.service.ts
- [x] T041 [P] [US1] Create health check controller in backend/src/presentation/controllers/health.controller.ts
- [x] T042 [P] [US1] Create main App component in frontend/src/App.tsx
- [x] T043 [P] [US1] Create basic layout template in frontend/src/templates/MainLayout/MainLayout.tsx
- [x] T044 [P] [US1] Create home page in frontend/src/pages/HomePage/HomePage.tsx
- [x] T045 [P] [US1] Setup API service for health check in frontend/src/services/api/health.api.ts
- [x] T046 [P] [US1] Create health check hook in frontend/src/services/hooks/useHealth.ts
- [x] T047 [US1] Configure Docker Compose for both services in docker-compose.yml
- [x] T048 [US1] Create backend Dockerfile in backend/Dockerfile
- [x] T049 [US1] Create frontend Dockerfile in frontend/Dockerfile
- [x] T050 [US1] Setup environment configuration in .env.example
- [x] T051 [US1] Create README.md with setup instructions
- [x] T052 [US1] Add logging for startup operations in both services

**Checkpoint**: At this point, User Story 1 should be fully functional and testable independently

---

## Phase 4: User Story 2 - Environment Consistency (Priority: P2)

**Goal**: Ensure local development environment matches production and other team members' setups exactly.

**Independent Test**: Verify that the same Docker setup works identically across different machines and operating systems.

### Tests for User Story 2

- [ ] T053 [P] [US2] Unit test for configuration validation in backend/src/infrastructure/config/app.config.test.ts
- [ ] T054 [P] [US2] Unit test for environment variable handling in backend/src/infrastructure/config/env.config.test.ts
- [ ] T055 [P] [US2] Integration test for cross-platform compatibility in tests/integration/cross-platform.integration.test.ts
- [ ] T056 [P] [US2] E2E test for new team member setup in tests/e2e/team-setup.e2e.test.ts

### Implementation for User Story 2

- [ ] T057 [P] [US2] Create environment configuration validation in backend/src/infrastructure/config/env.config.ts
- [ ] T058 [P] [US2] Implement configuration validation service in backend/src/application/services/config-validation.service.ts
- [ ] T059 [P] [US2] Create configuration endpoint in backend/src/presentation/controllers/config.controller.ts
- [ ] T060 [P] [US2] Setup configuration management in frontend/src/services/config/config.service.ts
- [ ] T061 [P] [US2] Create configuration display component in frontend/src/organisms/ConfigDisplay/ConfigDisplay.tsx
- [ ] T062 [P] [US2] Add configuration validation to Docker setup
- [ ] T063 [P] [US2] Create development vs production Docker configurations
- [ ] T064 [P] [US2] Setup volume mounting for configuration files
- [ ] T065 [US2] Add configuration validation to startup process
- [ ] T066 [US2] Create team setup documentation in docs/team-setup.md

**Checkpoint**: At this point, User Stories 1 AND 2 should both work independently

---

## Phase 5: User Story 3 - Easy Deployment (Priority: P3)

**Goal**: Enable easy deployment of the complete application stack to any environment that supports Docker.

**Independent Test**: Deploy the Docker setup to a cloud environment and verify both applications work correctly.

### Tests for User Story 3

- [ ] T067 [P] [US3] Unit test for deployment configuration in backend/src/infrastructure/config/deployment.config.test.ts
- [ ] T068 [P] [US3] Integration test for production Docker setup in tests/integration/production-deployment.integration.test.ts
- [ ] T069 [P] [US3] E2E test for cloud deployment in tests/e2e/cloud-deployment.e2e.test.ts

### Implementation for User Story 3

- [ ] T070 [P] [US3] Create production Docker configuration in docker-compose.prod.yml
- [ ] T071 [P] [US3] Implement deployment configuration service in backend/src/infrastructure/config/deployment.config.ts
- [ ] T072 [P] [US3] Create deployment health checks in backend/src/application/services/deployment-health.service.ts
- [ ] T073 [P] [US3] Setup production environment variables in .env.production
- [ ] T074 [P] [US3] Create deployment documentation in docs/deployment.md
- [ ] T075 [P] [US3] Setup container orchestration configuration
- [ ] T076 [P] [US3] Configure production logging and monitoring
- [ ] T077 [P] [US3] Setup horizontal scaling configuration
- [ ] T078 [P] [US3] Create deployment scripts in scripts/deploy.sh
- [ ] T079 [P] [US3] Add deployment validation to CI/CD pipeline

**Checkpoint**: All user stories should now be independently functional

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [ ] T080 [P] Update documentation in README.md and docs/
- [ ] T081 [P] Code cleanup and refactoring across all components
- [ ] T082 [P] Performance optimization across all services
- [ ] T083 [P] Additional unit tests to reach 90%+ coverage
- [ ] T084 [P] Security hardening and vulnerability scanning
- [ ] T085 [P] Run quickstart.md validation and testing
- [ ] T086 [P] Setup monitoring and alerting for production
- [ ] T087 [P] Create troubleshooting guide in docs/troubleshooting.md
- [ ] T088 [P] Setup automated testing in CI/CD pipeline
- [ ] T089 [P] Create performance benchmarks and monitoring

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3+)**: All depend on Foundational phase completion
  - User stories can then proceed in parallel (if staffed)
  - Or sequentially in priority order (P1 → P2 → P3)
- **Polish (Phase 6)**: Depends on all desired user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2) - No dependencies on other stories
- **User Story 2 (P2)**: Can start after Foundational (Phase 2) - May integrate with US1 but should be independently testable
- **User Story 3 (P3)**: Can start after Foundational (Phase 2) - May integrate with US1/US2 but should be independently testable

### Within Each User Story

- Tests (if included) MUST be written and FAIL before implementation
- Models before services
- Services before endpoints
- Core implementation before integration
- Story complete before moving to next priority

### Parallel Opportunities

- All Setup tasks marked [P] can run in parallel
- All Foundational tasks marked [P] can run in parallel (within Phase 2)
- Once Foundational phase completes, all user stories can start in parallel (if team capacity allows)
- All tests for a user story marked [P] can run in parallel
- Models within a story marked [P] can run in parallel
- Different user stories can be worked on in parallel by different team members

---

## Parallel Example: User Story 1

```bash
# Launch all tests for User Story 1 together:
Task: "Unit test for health check endpoint in backend/src/presentation/controllers/health.controller.test.ts"
Task: "Unit test for AppConfig service in backend/src/infrastructure/config/app.config.test.ts"
Task: "Unit test for React App component in frontend/src/App.test.tsx"
Task: "Integration test for Docker setup in tests/integration/docker-setup.integration.test.ts"
Task: "E2E test for complete application startup in tests/e2e/startup.e2e.test.ts"

# Launch all models for User Story 1 together:
Task: "Create AppConfig entity in backend/src/domain/entities/app-config.entity.ts"
Task: "Create HealthCheckResponse entity in backend/src/domain/entities/health-check-response.entity.ts"
Task: "Create ApiResponse entity in backend/src/domain/entities/api-response.entity.ts"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational (CRITICAL - blocks all stories)
3. Complete Phase 3: User Story 1
4. **STOP and VALIDATE**: Test User Story 1 independently
5. Deploy/demo if ready

### Incremental Delivery

1. Complete Setup + Foundational → Foundation ready
2. Add User Story 1 → Test independently → Deploy/Demo (MVP!)
3. Add User Story 2 → Test independently → Deploy/Demo
4. Add User Story 3 → Test independently → Deploy/Demo
5. Each story adds value without breaking previous stories

### Parallel Team Strategy

With multiple developers:

1. Team completes Setup + Foundational together
2. Once Foundational is done:
   - Developer A: User Story 1
   - Developer B: User Story 2
   - Developer C: User Story 3
3. Stories complete and integrate independently

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- Each user story should be independently completable and testable
- Verify tests fail before implementing
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
- Avoid: vague tasks, same file conflicts, cross-story dependencies that break independence
