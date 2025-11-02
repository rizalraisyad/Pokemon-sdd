# Quickstart: Pokemon List Display

**Feature**: 002-pokemon-list  
**Created**: 2025-11-02  
**Purpose**: Quick reference guide for using the Pokemon list feature

## Overview

The Pokemon List Display feature provides a user-friendly interface to browse, search, filter, and sort Pokemon retrieved from the PokeAPI. The feature is optimized for performance with lightweight frontend libraries, scalable backend architecture, and comprehensive logging.

## API Endpoints

### Get Pokemon List

**Endpoint**: `GET /api/v1/pokemon`

**Query Parameters**:
- `offset` (optional, default: 0): Pagination offset
- `limit` (optional, default: 20, max: 100): Items per page
- `search` (optional): Search query for Pokemon names (partial match, case-insensitive)
- `abilities` (optional): Comma-separated ability names for filtering (OR logic)
- `sortBy` (optional): Sort field (`ability`, `name`, `id`, default: `id`)
- `sortDirection` (optional): Sort direction (`asc`, `desc`, default: `asc`)

**Example Request**:
```bash
# Basic list
curl "http://localhost:3000/api/v1/pokemon?offset=0&limit=20"

# With search
curl "http://localhost:3000/api/v1/pokemon?search=pikachu"

# With filter and sort
curl "http://localhost:3000/api/v1/pokemon?abilities=Overgrow,Chlorophyll&sortBy=ability&sortDirection=asc"
```

**Example Response**:
```json
{
  "success": true,
  "data": {
    "pokemon": [
      {
        "id": 1,
        "name": "bulbasaur",
        "imageUrl": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png",
        "types": ["grass", "poison"],
        "abilities": [
          {
            "name": "Overgrow",
            "isHidden": false,
            "slot": 1
          }
        ],
        "weight": 69,
        "height": 7
      }
    ],
    "totalCount": 1000,
    "offset": 0,
    "limit": 20,
    "hasMore": true,
    "nextOffset": 20
  },
  "message": "Pokemon list retrieved successfully",
  "timestamp": "2025-11-02T12:00:00Z",
  "requestId": "123e4567-e89b-12d3-a456-426614174000"
}
```

### Get Pokemon by ID

**Endpoint**: `GET /api/v1/pokemon/{id}`

**Example Request**:
```bash
curl "http://localhost:3000/api/v1/pokemon/1"
```

## Frontend Usage

### Basic Pokemon List

```typescript
import { usePokemonList } from '@/services/hooks/usePokemonList';

function PokemonListPage() {
  const { data, isLoading, error, fetchNextPage, hasNextPage } = usePokemonList({
    limit: 20,
  });

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage error={error} />;

  return (
    <div>
      {data?.pages.map((page) =>
        page.data.pokemon.map((pokemon) => (
          <PokemonCard key={pokemon.id} pokemon={pokemon} />
        ))
      )}
      {hasNextPage && (
        <button onClick={() => fetchNextPage()}>Load More</button>
      )}
    </div>
  );
}
```

### Search Pokemon

```typescript
import { usePokemonSearch } from '@/services/hooks/usePokemonSearch';

function SearchPokemon() {
  const [query, setQuery] = useState('');
  const { data, isLoading } = usePokemonSearch(query, {
    enabled: query.length > 0,
  });

  return (
    <SearchBox
      value={query}
      onChange={setQuery}
      placeholder="Search Pokemon..."
    />
  );
}
```

### Filter by Ability

```typescript
import { usePokemonFilter } from '@/services/hooks/usePokemonFilter';

function FilterPokemon() {
  const [selectedAbilities, setSelectedAbilities] = useState<string[]>([]);
  const { data } = usePokemonFilter({
    abilities: selectedAbilities,
    logic: 'OR',
  });

  return (
    <FilterSelect
      selected={selectedAbilities}
      onChange={setSelectedAbilities}
      options={availableAbilities}
      multiple
    />
  );
}
```

## Architecture Overview

### Backend Architecture

```
Request → Controller → Use Case → Service → Repository → PokeAPI Client
         ↓              ↓          ↓
       Logger       Logger      Logger
         ↓              ↓          ↓
    Response ← DTO ← Entity ← Transformation
```

**Key Components**:
- **Controller**: REST endpoints, request/response handling
- **Use Cases**: Business logic (get list, search, filter, sort)
- **Services**: Domain services, orchestration
- **Repository**: Data access abstraction
- **PokeAPI Client**: External API integration with caching

### Frontend Architecture

```
Page → Organism → Molecule → Atom
  ↓
Hook (React Query) → API Service → Backend
```

**Key Components**:
- **Pages**: PokemonListPage
- **Organisms**: PokemonList, FilterBar, SearchBox
- **Molecules**: PokemonCard, FilterSelect, SortSelect
- **Atoms**: Button, Input, Image, Badge
- **Hooks**: usePokemonList, usePokemonSearch, usePokemonFilter

## Logging

### Request Logging

All incoming requests are logged with:
- HTTP method and path
- Request headers
- Query parameters
- Request timestamp
- Request ID (for tracing)

### Response Logging

All responses are logged with:
- HTTP status code
- Response time (duration)
- Response size
- Request ID (for correlation)

### Error Logging

Errors are logged with:
- Error code and message
- Stack trace (development)
- Request context
- Timestamp

**Example Log Entry**:
```json
{
  "level": "info",
  "method": "GET",
  "path": "/api/v1/pokemon",
  "query": { "offset": "0", "limit": "20" },
  "statusCode": 200,
  "duration": 145,
  "requestId": "123e4567-e89b-12d3-a456-426614174000",
  "timestamp": "2025-11-02T12:00:00Z"
}
```

## Performance Optimization

### Frontend

- **Image Lazy Loading**: Images load only when visible
- **Code Splitting**: Routes loaded on demand
- **React.memo**: Pokemon cards memoized for performance
- **Debounced Search**: Search input debounced (300ms)
- **Virtual Scrolling**: Optional for very large lists

### Backend

- **Caching**: In-memory cache with 1-hour TTL
- **Connection Pooling**: HTTP connections reused
- **Rate Limiting**: PokeAPI requests limited to 10 req/s
- **Response Compression**: Gzip compression enabled
- **Parallel Processing**: Filter/sort operations optimized

## Error Handling

### API Errors

- **404 Not Found**: Pokemon or endpoint not found
- **400 Bad Request**: Invalid query parameters
- **500 Internal Server Error**: Server-side error
- **503 Service Unavailable**: PokeAPI unavailable

### Frontend Error States

- **Loading State**: Spinner or skeleton screen
- **Error State**: User-friendly error message
- **Empty State**: Message when no Pokemon match filters
- **Fallback**: Show cached data if API unavailable

## Testing Scenarios

### Unit Tests

```typescript
// Pokemon entity validation
describe('Pokemon Entity', () => {
  it('should validate Pokemon with all required fields', () => {
    const pokemon = new Pokemon({
      id: 1,
      name: 'bulbasaur',
      imageUrl: 'https://...',
      types: ['grass'],
      abilities: [new Ability('Overgrow')],
    });
    expect(pokemon.isValid()).toBe(true);
  });
});
```

### Integration Tests

```typescript
// API endpoint testing
describe('GET /api/v1/pokemon', () => {
  it('should return paginated Pokemon list', async () => {
    const response = await request(app)
      .get('/api/v1/pokemon')
      .query({ offset: 0, limit: 20 });
    expect(response.status).toBe(200);
    expect(response.body.data.pokemon).toHaveLength(20);
  });
});
```

### E2E Tests

```typescript
// User flow testing
describe('Pokemon List E2E', () => {
  it('should load and display Pokemon list', async () => {
    await page.goto('/pokemon');
    await expect(page.locator('[data-testid="pokemon-card"]')).toBeVisible();
  });
});
```

## Troubleshooting

### Common Issues

1. **Slow API responses**: Check cache hit rate, verify PokeAPI status
2. **Images not loading**: Check image URLs, verify CORS configuration
3. **Filter not working**: Verify ability names match PokeAPI format
4. **Infinite scroll not triggering**: Check Intersection Observer setup

### Debugging

- Check request/response logs for detailed information
- Verify PokeAPI rate limits not exceeded
- Check cache status and TTL settings
- Monitor frontend performance metrics

