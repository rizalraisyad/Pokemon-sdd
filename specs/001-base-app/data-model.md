# Data Model: Base Application Setup

**Feature**: 001-base-app  
**Created**: 2025-01-27  
**Purpose**: Define data structures and entities for the base application

## Domain Entities

### Application Configuration

**Entity**: `AppConfig`
- **Purpose**: Centralized configuration management for both backend and frontend
- **Attributes**:
  - `environment`: string (development, staging, production)
  - `port`: number (service port)
  - `corsOrigin`: string (allowed CORS origins)
  - `logLevel`: string (debug, info, warn, error)
  - `apiVersion`: string (API version for routing)
- **Validation Rules**:
  - environment must be one of: development, staging, production
  - port must be between 1000 and 65535
  - logLevel must be one of: debug, info, warn, error
  - apiVersion must follow semantic versioning (e.g., "v1")

### Health Check Response

**Entity**: `HealthCheckResponse`
- **Purpose**: Standardized health check response format
- **Attributes**:
  - `status`: string (healthy, unhealthy, degraded)
  - `timestamp`: string (ISO 8601 format)
  - `uptime`: number (seconds since startup)
  - `version`: string (application version)
  - `services`: object (status of dependent services)
- **Validation Rules**:
  - status must be one of: healthy, unhealthy, degraded
  - timestamp must be valid ISO 8601 format
  - uptime must be non-negative number
  - version must follow semantic versioning

### API Response Standard

**Entity**: `ApiResponse<T>`
- **Purpose**: Standardized API response format for all endpoints
- **Attributes**:
  - `success`: boolean (operation success status)
  - `data`: T (response payload)
  - `message`: string (human-readable message)
  - `timestamp`: string (ISO 8601 format)
  - `requestId`: string (unique request identifier)
- **Validation Rules**:
  - success must be boolean
  - data can be any type T
  - message must be non-empty string
  - timestamp must be valid ISO 8601 format
  - requestId must be unique UUID

### Error Response

**Entity**: `ErrorResponse`
- **Purpose**: Standardized error response format
- **Attributes**:
  - `success`: boolean (always false)
  - `error`: object (error details)
    - `code`: string (error code)
    - `message`: string (error message)
    - `details`: object (additional error context)
  - `timestamp`: string (ISO 8601 format)
  - `requestId`: string (unique request identifier)
- **Validation Rules**:
  - success must be false
  - error.code must be non-empty string
  - error.message must be non-empty string
  - timestamp must be valid ISO 8601 format
  - requestId must be unique UUID

## Value Objects

### Environment Configuration

**Value Object**: `EnvironmentConfig`
- **Purpose**: Type-safe environment variable handling
- **Attributes**:
  - `NODE_ENV`: string
  - `PORT`: number
  - `CORS_ORIGIN`: string
  - `LOG_LEVEL`: string
  - `API_VERSION`: string
- **Validation**: All values must be validated and transformed to appropriate types

### Docker Configuration

**Value Object**: `DockerConfig`
- **Purpose**: Docker-specific configuration
- **Attributes**:
  - `containerName`: string
  - `imageTag`: string
  - `exposedPorts`: number[]
  - `environmentVariables`: object
  - `volumeMounts`: string[]
- **Validation**: Container names must be valid Docker identifiers

## Repository Interfaces

### Configuration Repository

**Interface**: `IConfigRepository`
- **Purpose**: Abstract configuration management
- **Methods**:
  - `getConfig(): Promise<AppConfig>`
  - `validateConfig(config: AppConfig): boolean`
  - `updateConfig(config: Partial<AppConfig>): Promise<void>`

### Health Check Repository

**Interface**: `IHealthRepository`
- **Purpose**: Abstract health check data access
- **Methods**:
  - `getSystemStatus(): Promise<HealthCheckResponse>`
  - `checkDependencies(): Promise<object>`
  - `getUptime(): Promise<number>`

## Data Transfer Objects (DTOs)

### Health Check DTO

**DTO**: `HealthCheckDto`
- **Purpose**: Data transfer for health check requests
- **Attributes**:
  - `includeServices`: boolean (optional, default false)
  - `timeout`: number (optional, default 5000ms)
- **Validation**: timeout must be between 1000 and 30000

### Configuration Update DTO

**DTO**: `ConfigUpdateDto`
- **Purpose**: Data transfer for configuration updates
- **Attributes**:
  - `logLevel`: string (optional)
  - `corsOrigin`: string (optional)
  - `apiVersion`: string (optional)
- **Validation**: All fields must pass respective validation rules

## State Management (Frontend)

### Application State

**State**: `AppState`
- **Purpose**: Global application state management
- **Attributes**:
  - `isLoading`: boolean
  - `error`: ErrorResponse | null
  - `config`: AppConfig | null
  - `lastUpdated`: string (ISO 8601 format)
- **Actions**:
  - `setLoading(loading: boolean)`
  - `setError(error: ErrorResponse | null)`
  - `setConfig(config: AppConfig)`
  - `clearError()`

### Cache State

**State**: `CacheState`
- **Purpose**: API response caching
- **Attributes**:
  - `queries`: Map<string, QueryCache>
  - `mutations`: Map<string, MutationCache>
  - `lastInvalidated`: string (ISO 8601 format)
- **Actions**:
  - `invalidateQuery(key: string)`
  - `invalidateAll()`
  - `setQueryData(key: string, data: any)`

## Relationships

- `AppConfig` is used by both backend and frontend services
- `HealthCheckResponse` is generated by backend and consumed by frontend
- `ApiResponse<T>` wraps all API responses
- `ErrorResponse` is used for all error scenarios
- `AppState` manages frontend application state
- `CacheState` manages API response caching

## Validation Rules Summary

1. All string fields must be non-empty (unless optional)
2. All numeric fields must be within valid ranges
3. All date fields must be valid ISO 8601 format
4. All UUID fields must be valid UUID format
5. All enum fields must match predefined values
6. All configuration values must be validated on startup
7. All API responses must follow standardized format
8. All error responses must include proper error codes and messages
