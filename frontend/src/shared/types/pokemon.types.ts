export interface PokemonAbility {
  name: string;
  isHidden: boolean;
  slot: number;
}

export interface Pokemon {
  id: number;
  name: string;
  imageUrl: string;
  types: string[];
  abilities: PokemonAbility[];
  weight: number;
  height: number;
}

export interface PokemonListResponse {
  success: boolean;
  data: {
    pokemon: Pokemon[];
    totalCount: number;
    offset: number;
    limit: number;
    hasMore: boolean;
    nextOffset: number | null;
  };
  timestamp: string;
  requestId?: string;
}

export interface PokemonQueryParams {
  offset?: number;
  limit?: number;
  search?: string;
  abilities?: string[];
  sortBy?: 'ability' | 'name' | 'id';
  sortDirection?: 'asc' | 'desc';
}

export interface ErrorResponse {
  success: false;
  error: {
    code: string;
    message: string;
    details?: Record<string, unknown>;
  };
  timestamp: string;
  requestId?: string;
}

