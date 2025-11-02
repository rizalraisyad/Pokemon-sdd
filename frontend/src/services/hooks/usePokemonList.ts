import { useInfiniteQuery } from '@tanstack/react-query';
import { pokemonApiService } from '../api/pokemon.api';
import { PokemonListResponse, PokemonQueryParams } from '../../shared/types/pokemon.types';

interface UsePokemonListOptions {
  search?: string;
  abilities?: string[];
  sortBy?: 'ability' | 'name' | 'id';
  sortDirection?: 'asc' | 'desc';
  limit?: number;
}

export const usePokemonList = (options: UsePokemonListOptions = {}) => {
  const { search, abilities, sortBy, sortDirection, limit = 20 } = options;

  return useInfiniteQuery<PokemonListResponse>({
    queryKey: ['pokemon', 'list', search, abilities, sortBy, sortDirection],
    queryFn: async ({ pageParam = 0 }) => {
      const params: PokemonQueryParams = {
        offset: pageParam as number,
        limit,
        ...(search && { search }),
        ...(abilities && abilities.length > 0 && { abilities }),
        ...(sortBy && { sortBy }),
        ...(sortDirection && { sortDirection }),
      };
      return pokemonApiService.getPokemonList(params);
    },
    getNextPageParam: (lastPage) => {
      if (lastPage.success && lastPage.data.hasMore) {
        return lastPage.data.nextOffset;
      }
      return undefined;
    },
    initialPageParam: 0,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

