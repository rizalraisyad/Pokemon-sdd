import { Pokemon } from '../entities/pokemon.entity';

export interface PokemonQueryParams {
  offset: number;
  limit: number;
  search?: string;
  abilities?: string[];
  sortBy?: 'ability' | 'name' | 'id';
  sortDirection?: 'asc' | 'desc';
}

export interface PokemonListResult {
  pokemon: Pokemon[];
  totalCount: number;
  offset: number;
  limit: number;
  hasMore: boolean;
  nextOffset: number | null;
}

export interface IPokemonRepository {
  findAll(params: PokemonQueryParams): Promise<PokemonListResult>;
  findById(id: number): Promise<Pokemon | null>;
  findByName(name: string): Promise<Pokemon | null>;
  findByAbility(abilityName: string): Promise<Pokemon[]>;
  search(query: string): Promise<Pokemon[]>;
}

