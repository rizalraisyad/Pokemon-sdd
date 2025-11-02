# Data Model: Pokemon List Display

**Feature**: 002-pokemon-list  
**Created**: 2025-11-02  
**Purpose**: Define data structures and entities for Pokemon list feature

## Domain Entities

### Pokemon

**Entity**: `Pokemon`
- **Purpose**: Core domain entity representing a Pokemon with all essential attributes
- **Attributes**:
  - `id`: number (unique identifier from PokeAPI)
  - `name`: string (Pokemon name)
  - `imageUrl`: string (official artwork or sprite URL)
  - `types`: string[] (array of Pokemon types, e.g., ["Fire", "Flying"])
  - `abilities`: Ability[] (array of ability objects)
  - `weight`: number (Pokemon weight in hectograms)
  - `height`: number (Pokemon height in decimetres)
- **Validation Rules**:
  - id must be positive integer
  - name must be non-empty string
  - imageUrl must be valid URL format
  - types must be non-empty array
  - abilities must be array (can be empty if data missing)
  - weight and height must be non-negative numbers
- **Business Rules**:
  - Primary ability used for sorting (alphabetically first)
  - Image fallback to default sprite if official artwork unavailable

### Ability

**Entity**: `Ability`
- **Purpose**: Represents a Pokemon ability with name and metadata
- **Attributes**:
  - `name`: string (ability name)
  - `isHidden`: boolean (whether ability is hidden)
  - `slot`: number (ability slot position)
- **Validation Rules**:
  - name must be non-empty string
  - isHidden must be boolean
  - slot must be positive integer (1-3)
- **Business Rules**:
  - Used for filtering (OR logic: Pokemon with ANY selected ability)
  - Used for sorting (alphabetically first ability)

### Pokemon List Response

**Entity**: `PokemonListResponse`
- **Purpose**: Paginated response containing Pokemon list with metadata
- **Attributes**:
  - `pokemon`: Pokemon[] (array of Pokemon entities)
  - `totalCount`: number (total number of Pokemon available)
  - `offset`: number (current pagination offset)
  - `limit`: number (items per page)
  - `hasMore`: boolean (whether more items are available)
  - `nextOffset`: number | null (offset for next page, null if no more)
- **Validation Rules**:
  - pokemon must be array
  - totalCount must be non-negative integer
  - offset must be non-negative integer
  - limit must be positive integer (max 100)
  - hasMore must be boolean

### Search Query

**Entity**: `SearchQuery`
- **Purpose**: User search input and parameters
- **Attributes**:
  - `query`: string (search term)
  - `isCaseSensitive`: boolean (default false)
  - `matchType`: 'exact' | 'partial' | 'startsWith' (default 'partial')
- **Validation Rules**:
  - query must be non-empty string (max 100 characters)
  - Sanitized to prevent injection attacks
  - Trimmed and escaped

### Filter Criteria

**Entity**: `FilterCriteria`
- **Purpose**: User-selected filters for Pokemon list
- **Attributes**:
  - `abilities`: string[] (array of selected ability names)
  - `logic`: 'AND' | 'OR' (default 'OR' as per clarification)
- **Validation Rules**:
  - abilities must be array of non-empty strings
  - logic must be 'AND' or 'OR'
  - If empty abilities array, no filter applied

### Sort Criteria

**Entity**: `SortCriteria`
- **Purpose**: User-selected sorting options
- **Attributes**:
  - `field`: 'ability' | 'name' | 'id' (sort field)
  - `direction`: 'asc' | 'desc' (sort direction)
  - `useFirstAbility`: boolean (for ability sorting, use first ability as per clarification)
- **Validation Rules**:
  - field must be one of allowed values
  - direction must be 'asc' or 'desc'
  - If field is 'ability', useFirstAbility must be true

### Pokemon Query Parameters

**Entity**: `PokemonQueryParams`
- **Purpose**: Combined query parameters for Pokemon list endpoint
- **Attributes**:
  - `offset`: number (pagination offset, default 0)
  - `limit`: number (items per page, default 20, max 100)
  - `search`: string | null (search query, optional)
  - `filter`: FilterCriteria | null (filter criteria, optional)
  - `sort`: SortCriteria | null (sort criteria, optional)
- **Validation Rules**:
  - offset must be non-negative integer
  - limit must be between 1 and 100
  - search must be valid SearchQuery if provided
  - filter and sort validated if provided

## Value Objects

### Pokemon Type

**Value Object**: `PokemonType`
- **Purpose**: Type-safe Pokemon type
- **Attributes**:
  - `name`: string (type name: Normal, Fire, Water, etc.)
- **Validation**: Must match known Pokemon types

### Image URL

**Value Object**: `ImageURL`
- **Purpose**: Validated image URL with fallback support
- **Attributes**:
  - `primary`: string (primary image URL)
  - `fallback`: string (fallback sprite URL)
- **Validation**: Both must be valid URLs, fallback used if primary fails

## Repository Interfaces

### Pokemon Repository

**Interface**: `IPokemonRepository`
- **Purpose**: Abstract Pokemon data access
- **Methods**:
  - `findAll(params: PokemonQueryParams): Promise<PokemonListResponse>`
  - `findById(id: number): Promise<Pokemon | null>`
  - `findByName(name: string): Promise<Pokemon | null>`
  - `findByAbility(abilityName: string): Promise<Pokemon[]>`
  - `search(query: SearchQuery): Promise<Pokemon[]>`

## Data Transfer Objects (DTOs)

### Get Pokemon List DTO

**DTO**: `GetPokemonListDto`
- **Purpose**: Request DTO for Pokemon list endpoint
- **Attributes**:
  - `offset`: number (optional, default 0)
  - `limit`: number (optional, default 20, max 100)
  - `search`: string (optional)
  - `abilities`: string[] (optional, filter by abilities)
  - `sortBy`: 'ability' | 'name' | 'id' (optional)
  - `sortDirection`: 'asc' | 'desc' (optional, default 'asc')
- **Validation**:
  - All fields validated and sanitized
  - Search query sanitized
  - Abilities array validated

### Pokemon Response DTO

**DTO**: `PokemonResponseDto`
- **Purpose**: Response DTO for Pokemon entity
- **Attributes**: Same as Pokemon entity
- **Transformation**: Domain entity → DTO for API response

### Error Response DTO

**DTO**: `ErrorResponseDto`
- **Purpose**: Standardized error response
- **Attributes**:
  - `success`: false
  - `error`: {
    - `code`: string (error code)
    - `message`: string (user-friendly message)
    - `details`: object (optional additional context)
  }
  - `timestamp`: string (ISO 8601)
  - `requestId`: string (UUID)

## State Management (Frontend)

### Pokemon List State

**State**: `PokemonListState`
- **Purpose**: Frontend state for Pokemon list
- **Attributes**:
  - `pokemon`: Pokemon[]
  - `isLoading`: boolean
  - `error`: ErrorResponse | null
  - `hasMore`: boolean
  - `offset`: number
  - `searchQuery`: string
  - `filters`: FilterCriteria
  - `sort`: SortCriteria
- **Actions**:
  - `loadMore()`
  - `search(query: string)`
  - `filter(criteria: FilterCriteria)`
  - `sort(criteria: SortCriteria)`
  - `reset()`

### Cache State

**State**: `PokemonCacheState`
- **Purpose**: React Query cache for Pokemon data
- **Attributes**:
  - `queries`: Map<string, QueryCache> (cached queries)
  - `mutations`: Map<string, MutationCache> (cache mutations)
  - `staleTime`: number (5 minutes default)
  - `cacheTime`: number (10 minutes default)

## Relationships

- Pokemon has many Abilities (one-to-many)
- Pokemon has many Types (many-to-many)
- Pokemon List contains many Pokemon (one-to-many)
- Filter Criteria filters Pokemon List (applies to collection)
- Sort Criteria orders Pokemon List (applies to collection)
- Search Query filters Pokemon List (applies to collection)

## Validation Rules Summary

1. All string fields must be non-empty (unless optional)
2. All numeric fields must be within valid ranges
3. All URL fields must be valid URL format
4. All array fields must contain valid items
5. Search queries must be sanitized and length-limited
6. Filter and sort criteria must be validated before application
7. Pagination parameters must be positive integers within limits
8. Image URLs must have fallback options

## Data Transformation

### PokeAPI Response → Domain Entity

**Transformation**: PokeAPI response structure → Pokemon domain entity
- Map `id` from PokeAPI
- Map `name` from PokeAPI
- Extract `imageUrl` from `sprites.other['official-artwork'].front_default` or fallback
- Transform `types` array to string array
- Transform `abilities` array to Ability entities
- Extract `weight` and `height`

### Domain Entity → DTO

**Transformation**: Pokemon entity → PokemonResponseDto
- Direct mapping of all fields
- Ensure all fields are properly serialized

