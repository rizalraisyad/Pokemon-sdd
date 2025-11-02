# Tasks: Pokemon List Display

**Input**: Design documents from `/specs/002-pokemon-list/`
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

**Purpose**: Project initialization and Pokemon domain structure

- [x] T001 Setup Pokemon domain module structure in backend/src/domain/pokemon/
- [x] T002 [P] Install frontend dependencies (Tailwind CSS, Headless UI) in frontend/package.json
- [x] T003 [P] Install backend dependencies (Winston, cache-manager, axios) in backend/package.json
- [x] T004 [P] Configure Tailwind CSS in frontend/tailwind.config.js
- [x] T005 [P] Setup frontend PostCSS configuration in frontend/postcss.config.js

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [x] T006 Create Pokemon domain entity in backend/src/domain/entities/pokemon.entity.ts
- [x] T007 [P] Create Ability value object in backend/src/domain/value-objects/pokemon-ability.vo.ts
- [x] T008 [P] Create Pokemon repository interface in backend/src/domain/repositories/pokemon.repository.ts
- [x] T009 [P] Implement PokeAPI client in backend/src/infrastructure/external-apis/pokeapi/pokeapi.client.ts
- [x] T010 [P] Implement PokeAPI repository in backend/src/infrastructure/external-apis/pokeapi.repository.impl.ts
- [x] T011 [P] Setup Winston logger configuration in backend/src/infrastructure/logging/logger.config.ts
- [x] T012 [P] Create request logging interceptor in backend/src/infrastructure/logging/request-logger.interceptor.ts
- [x] T013 [P] Create response logging interceptor in backend/src/infrastructure/logging/response-logger.interceptor.ts
- [x] T014 [P] Setup Pokemon cache service in backend/src/infrastructure/cache/pokemon-cache.service.ts
- [x] T015 [P] Configure cache-manager module in backend/src/infrastructure/cache/cache.module.ts
- [x] T016 [P] Create Pokemon query validation pipe in backend/src/presentation/pipes/pokemon-query.pipe.ts
- [x] T017 [P] Create error handler middleware in backend/src/presentation/middleware/error-handler.middleware.ts
- [x] T018 [P] Setup Pokemon API service in frontend/src/services/api/pokemon.api.ts
- [x] T019 [P] Create Pokemon types in frontend/src/shared/types/pokemon.types.ts
- [x] T020 [P] Setup React Query infinite query hook in frontend/src/services/hooks/usePokemonList.ts
- [x] T021 [P] Create PokemonCard atom component in frontend/src/atoms/PokemonCard/PokemonCard.tsx
- [x] T022 [P] Create Image atom component with lazy loading in frontend/src/atoms/Image/Image.tsx
- [x] T023 [P] Create Badge atom component for types in frontend/src/atoms/Badge/Badge.tsx
- [x] T024 [P] Setup debounce utility in frontend/src/shared/utils/debounce.ts

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - View Pokemon List with Images and Details (Priority: P1) 🎯 MVP

**Goal**: Enable users to browse and view a list of Pokemon with images and key details in a user-friendly, scrollable interface with infinite scroll.

**Independent Test**: Load the Pokemon list page and verify Pokemon are displayed with images and details, and infinite scroll loads more items as user scrolls.

### Tests for User Story 1

> **NOTE: Write these tests FIRST, ensure they FAIL before implementation**

- [ ] T025 [P] [US1] Unit test for Pokemon entity in backend/src/domain/entities/pokemon.entity.test.ts
- [ ] T026 [P] [US1] Unit test for Ability value object in backend/src/domain/value-objects/pokemon-ability.vo.test.ts
- [ ] T027 [P] [US1] Unit test for PokeAPI client in backend/src/infrastructure/external-apis/pokeapi/pokeapi.client.test.ts
- [ ] T028 [P] [US1] Unit test for Pokemon cache service in backend/src/infrastructure/cache/pokemon-cache.service.test.ts
- [ ] T029 [P] [US1] Unit test for Pokemon service in backend/src/application/services/pokemon.service.test.ts
- [ ] T030 [P] [US1] Unit test for Pokemon controller in backend/src/presentation/controllers/pokemon.controller.test.ts
- [ ] T031 [P] [US1] Unit test for PokemonCard component in frontend/src/atoms/PokemonCard/PokemonCard.test.tsx
- [ ] T032 [P] [US1] Unit test for Image component in frontend/src/atoms/Image/Image.test.tsx
- [ ] T033 [P] [US1] Unit test for usePokemonList hook in frontend/src/services/hooks/usePokemonList.test.ts
- [ ] T034 [P] [US1] Integration test for Pokemon list endpoint in tests/integration/pokemon-list.integration.test.ts
- [ ] T035 [P] [US1] E2E test for Pokemon list display in tests/e2e/pokemon-list.e2e.test.ts

### Implementation for User Story 1

- [x] T036 [P] [US1] Implement get Pokemon list use case in backend/src/application/use-cases/get-pokemon-list.usecase.ts
- [x] T037 [P] [US1] Create Pokemon service in backend/src/application/services/pokemon.service.ts
- [x] T038 [P] [US1] Create Pokemon list DTO in backend/src/application/dto/get-pokemon-list.dto.ts
- [x] T039 [P] [US1] Create Pokemon response DTO in backend/src/application/dto/pokemon-response.dto.ts
- [x] T040 [P] [US1] Implement Pokemon controller in backend/src/presentation/controllers/pokemon.controller.ts
- [x] T041 [P] [US1] Create Pokemon module in backend/src/presentation/controllers/pokemon.module.ts
- [x] T042 [P] [US1] Create PokemonList organism component in frontend/src/organisms/PokemonList/PokemonList.tsx
- [x] T043 [P] [US1] Create PokemonListLayout template in frontend/src/templates/PokemonListLayout/PokemonListLayout.tsx
- [x] T044 [P] [US1] Create PokemonListPage in frontend/src/pages/PokemonListPage/PokemonListPage.tsx
- [x] T045 [P] [US1] Implement infinite scroll with Intersection Observer in frontend/src/organisms/PokemonList/PokemonList.tsx
- [x] T046 [P] [US1] Add loading state indicators in frontend/src/organisms/PokemonList/PokemonList.tsx
- [x] T047 [US1] Register Pokemon module in backend/src/app.module.ts
- [x] T048 [US1] Add Pokemon list route in frontend/src/App.tsx
- [x] T049 [US1] Configure PokeAPI base URL in backend/src/infrastructure/config/pokeapi.config.ts
- [x] T050 [US1] Setup rate limiting for PokeAPI requests in backend/src/infrastructure/external-apis/pokeapi/pokeapi.client.ts

**Checkpoint**: At this point, User Story 1 should be fully functional and testable independently

---

## Phase 4: User Story 2 - Search Pokemon by Name (Priority: P2)

**Goal**: Enable users to quickly find a specific Pokemon by searching for its name (partial match, case-insensitive).

**Independent Test**: Enter a search query and verify that matching Pokemon are displayed and non-matching Pokemon are hidden, with empty state when no results.

### Tests for User Story 2

- [ ] T051 [P] [US2] Unit test for search Pokemon use case in backend/src/application/use-cases/search-pokemon.usecase.test.ts
- [ ] T052 [P] [US2] Unit test for search query validation in backend/src/presentation/pipes/pokemon-query.pipe.test.ts
- [ ] T053 [P] [US2] Unit test for SearchBox component in frontend/src/molecules/SearchBox/SearchBox.test.tsx
- [ ] T054 [P] [US2] Unit test for usePokemonSearch hook in frontend/src/services/hooks/usePokemonSearch.test.ts
- [ ] T055 [P] [US2] Integration test for search endpoint in tests/integration/pokemon-search.integration.test.ts
- [ ] T056 [P] [US2] E2E test for Pokemon search in tests/e2e/pokemon-search.e2e.test.ts

### Implementation for User Story 2

- [ ] T057 [P] [US2] Create SearchQuery entity in backend/src/domain/value-objects/search-query.vo.ts
- [ ] T058 [P] [US2] Implement search Pokemon use case in backend/src/application/use-cases/search-pokemon.usecase.ts
- [ ] T059 [P] [US2] Create search Pokemon DTO in backend/src/application/dto/search-pokemon.dto.ts
- [ ] T060 [P] [US2] Add search parameter handling to Pokemon controller in backend/src/presentation/controllers/pokemon.controller.ts
- [ ] T061 [P] [US2] Create SearchBox molecule component in frontend/src/molecules/SearchBox/SearchBox.tsx
- [ ] T062 [P] [US2] Create usePokemonSearch hook in frontend/src/services/hooks/usePokemonSearch.ts
- [ ] T063 [P] [US2] Add search API method in frontend/src/services/api/pokemon.api.ts
- [ ] T064 [P] [US2] Integrate SearchBox into PokemonListLayout in frontend/src/templates/PokemonListLayout/PokemonListLayout.tsx
- [ ] T065 [US2] Implement debounced search in frontend/src/molecules/SearchBox/SearchBox.tsx
- [ ] T066 [US2] Add empty state component for no search results in frontend/src/organisms/EmptyState/EmptyState.tsx
- [ ] T067 [US2] Add search query sanitization in backend/src/presentation/pipes/pokemon-query.pipe.ts

**Checkpoint**: At this point, User Stories 1 AND 2 should both work independently

---

## Phase 5: User Story 3 - Filter and Sort Pokemon by Ability (Priority: P3)

**Goal**: Enable users to filter the Pokemon list to show only Pokemon with specific abilities (OR logic) and sort them by ability name (using alphabetically first ability).

**Independent Test**: Select ability filters and sort criteria, verify filtered Pokemon are displayed and sorted correctly, with empty state when no matches.

### Tests for User Story 3

- [ ] T068 [P] [US3] Unit test for filter Pokemon use case in backend/src/application/use-cases/filter-pokemon.usecase.test.ts
- [ ] T069 [P] [US3] Unit test for sort Pokemon use case in backend/src/application/use-cases/sort-pokemon.usecase.test.ts
- [ ] T070 [P] [US3] Unit test for FilterCriteria value object in backend/src/domain/value-objects/filter-criteria.vo.test.ts
- [ ] T071 [P] [US3] Unit test for SortCriteria value object in backend/src/domain/value-objects/sort-criteria.vo.test.ts
- [ ] T072 [P] [US3] Unit test for FilterSelect component in frontend/src/molecules/FilterSelect/FilterSelect.test.tsx
- [ ] T073 [P] [US3] Unit test for SortSelect component in frontend/src/molecules/SortSelect/SortSelect.test.tsx
- [ ] T074 [P] [US3] Unit test for usePokemonFilter hook in frontend/src/services/hooks/usePokemonFilter.test.ts
- [ ] T075 [P] [US3] Integration test for filter and sort endpoints in tests/integration/pokemon-filter-sort.integration.test.ts
- [ ] T076 [P] [US3] E2E test for Pokemon filter and sort in tests/e2e/pokemon-filter-sort.e2e.test.ts

### Implementation for User Story 3

- [x] T077 [P] [US3] Create FilterCriteria value object in backend/src/domain/value-objects/filter-criteria.vo.ts
- [x] T078 [P] [US3] Create SortCriteria value object in backend/src/domain/value-objects/sort-criteria.vo.ts
- [x] T079 [P] [US3] Implement filter Pokemon use case in backend/src/application/use-cases/filter-pokemon.usecase.ts
- [x] T080 [P] [US3] Implement sort Pokemon use case in backend/src/application/use-cases/sort-pokemon.usecase.ts
- [x] T081 [P] [US3] Create filter Pokemon DTO in backend/src/application/dto/filter-pokemon.dto.ts
- [x] T082 [P] [US3] Add filter and sort parameter handling to Pokemon controller in backend/src/presentation/controllers/pokemon.controller.ts
- [x] T083 [P] [US3] Implement ability extraction helper for sorting in backend/src/application/services/pokemon.service.ts
- [x] T084 [P] [US3] Create FilterSelect molecule component in frontend/src/molecules/FilterSelect/FilterSelect.tsx
- [x] T085 [P] [US3] Create SortSelect molecule component in frontend/src/molecules/SortSelect/SortSelect.tsx
- [x] T086 [P] [US3] Create FilterBar organism component in frontend/src/organisms/FilterBar/FilterBar.tsx
- [x] T087 [P] [US3] Create usePokemonFilter hook in frontend/src/services/hooks/usePokemonFilter.ts
- [x] T088 [P] [US3] Add filter and sort API methods in frontend/src/services/api/pokemon.api.ts
- [x] T089 [P] [US3] Integrate FilterBar into PokemonListLayout in frontend/src/templates/PokemonListLayout/PokemonListLayout.tsx
- [x] T090 [US3] Fetch available abilities list for filter options in backend/src/application/services/pokemon.service.ts
- [x] T091 [US3] Add ability filter state management in frontend/src/organisms/FilterBar/FilterBar.tsx
- [x] T092 [US3] Implement combined filter, sort, and search logic in backend/src/application/services/pokemon.service.ts

**Checkpoint**: All user stories should now be independently functional

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories and final refinements

- [ ] T093 [P] Add error boundary component in frontend/src/organisms/ErrorBoundary/ErrorBoundary.tsx
- [ ] T094 [P] Implement comprehensive error handling in frontend/src/pages/PokemonListPage/PokemonListPage.tsx
- [ ] T095 [P] Add loading skeleton components in frontend/src/molecules/PokemonCardSkeleton/PokemonCardSkeleton.tsx
- [ ] T096 [P] Optimize Pokemon image loading with fallback in frontend/src/atoms/Image/Image.tsx
- [ ] T097 [P] Add request ID generation middleware in backend/src/presentation/middleware/request-id.middleware.ts
- [ ] T098 [P] Enhance logging with request context in backend/src/infrastructure/logging/request-logger.interceptor.ts
- [ ] T099 [P] Add warning logging for cache misses in backend/src/infrastructure/cache/pokemon-cache.service.ts
- [ ] T100 [P] Add warning logging for PokeAPI rate limit warnings in backend/src/infrastructure/external-apis/pokeapi/pokeapi.client.ts
- [ ] T101 [P] Implement retry logic with exponential backoff in backend/src/infrastructure/external-apis/pokeapi/pokeapi.client.ts
- [ ] T102 [P] Add OpenAPI/Swagger documentation generation in backend/src/main.ts
- [ ] T103 [P] Create comprehensive error messages for all error scenarios
- [ ] T104 [P] Add performance monitoring and metrics collection
- [ ] T105 [P] Optimize bundle size and code splitting in frontend/vite.config.ts
- [ ] T106 [P] Add accessibility attributes to all interactive components
- [ ] T107 [P] Update README.md with Pokemon list feature documentation
- [ ] T108 [P] Run quickstart.md validation and testing

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
- **User Story 2 (P2)**: Can start after Foundational (Phase 2) - Depends on US1 for base list functionality
- **User Story 3 (P3)**: Can start after Foundational (Phase 2) - Depends on US1 for base list functionality

### Within Each User Story

- Tests (if included) MUST be written and FAIL before implementation
- Domain entities before services
- Services before use cases
- Use cases before controllers
- Controllers before frontend integration
- Core implementation before integration
- Story complete before moving to next priority

### Parallel Opportunities

- All Setup tasks marked [P] can run in parallel
- All Foundational tasks marked [P] can run in parallel (within Phase 2)
- Once Foundational phase completes, User Story 1 can start
- All tests for a user story marked [P] can run in parallel
- Domain entities and value objects within a story marked [P] can run in parallel
- Frontend and backend work can proceed in parallel once foundational is done

---

## Parallel Example: User Story 1

```bash
# Launch all domain tests for User Story 1 together:
Task: "Unit test for Pokemon entity in backend/src/domain/entities/pokemon.entity.test.ts"
Task: "Unit test for Ability value object in backend/src/domain/value-objects/pokemon-ability.vo.test.ts"
Task: "Unit test for PokeAPI client in backend/src/infrastructure/external-apis/pokeapi/pokeapi.client.test.ts"

# Launch all frontend component tests together:
Task: "Unit test for PokemonCard component in frontend/src/atoms/PokemonCard/PokemonCard.test.tsx"
Task: "Unit test for Image component in frontend/src/atoms/Image/Image.test.tsx"
Task: "Unit test for usePokemonList hook in frontend/src/services/hooks/usePokemonList.test.ts"

# Launch all implementation tasks in parallel (after tests):
Task: "Implement get Pokemon list use case in backend/src/application/use-cases/get-pokemon-list.usecase.ts"
Task: "Create Pokemon service in backend/src/application/services/pokemon.service.ts"
Task: "Create PokemonList organism component in frontend/src/organisms/PokemonList/PokemonList.tsx"
Task: "Create PokemonListLayout template in frontend/src/templates/PokemonListLayout/PokemonListLayout.tsx"
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
5. Add Polish phase → Final refinement and optimization
6. Each story adds value without breaking previous stories

### Parallel Team Strategy

With multiple developers:

1. Team completes Setup + Foundational together
2. Once Foundational is done:
   - Developer A: User Story 1 (backend focus)
   - Developer B: User Story 1 (frontend focus)
   - Developer C: User Story 2 preparation
3. After US1 complete:
   - Developer A: User Story 2 (backend search)
   - Developer B: User Story 2 (frontend search UI)
   - Developer C: User Story 3 (backend filter/sort)
4. Stories complete and integrate independently

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- Each user story should be independently completable and testable
- Verify tests fail before implementing
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
- Avoid: vague tasks, same file conflicts, cross-story dependencies that break independence
- Logging must capture: request details, response details, warnings, errors with context
- PokeAPI integration must handle rate limits, timeouts, and errors gracefully
- Frontend must use lightweight libraries (Tailwind CSS, Headless UI) only
- All API contracts must follow OpenAPI specification

