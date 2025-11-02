import { Injectable } from '@nestjs/common';
import { Pokemon } from '../../domain/entities/pokemon.entity';
import {
  IPokemonRepository,
  PokemonQueryParams,
  PokemonListResult,
} from '../../domain/repositories/pokemon.repository';
import { PokeApiClient } from './pokeapi/pokeapi.client';

@Injectable()
export class PokeApiRepository implements IPokemonRepository {
  constructor(private readonly pokeApiClient: PokeApiClient) {}

  async findAll(params: PokemonQueryParams): Promise<PokemonListResult> {
    const { offset, limit } = params;

    const listResponse = await this.pokeApiClient.getPokemonList(offset, limit);
    const totalCount = listResponse.count;

    const pokemonPromises = listResponse.results.map((result: { name: string; url: string }) => {
      const id = this.extractIdFromUrl(result.url);
      return this.findById(id);
    });

    let pokemon = (await Promise.all(pokemonPromises)).filter(
      (p): p is Pokemon => p !== null,
    );

    if (params.search) {
      pokemon = this.filterBySearch(pokemon, params.search);
    }

    if (params.abilities && params.abilities.length > 0) {
      pokemon = this.filterByAbilities(pokemon, params.abilities);
    }

    if (params.sortBy) {
      pokemon = this.sortPokemon(pokemon, params.sortBy, params.sortDirection || 'asc');
    }

    const hasMore = offset + limit < totalCount;
    const nextOffset = hasMore ? offset + limit : null;

    return {
      pokemon,
      totalCount,
      offset,
      limit,
      hasMore,
      nextOffset,
    };
  }

  async findById(id: number): Promise<Pokemon | null> {
    const data = await this.pokeApiClient.getPokemonById(id);
    if (!data) {
      return null;
    }
    return Pokemon.fromPokeAPI(data);
  }

  async findByName(name: string): Promise<Pokemon | null> {
    const data = await this.pokeApiClient.getPokemonByName(name);
    if (!data) {
      return null;
    }
    return Pokemon.fromPokeAPI(data);
  }

  async findByAbility(abilityName: string): Promise<Pokemon[]> {
    const results: Pokemon[] = [];
    let offset = 0;
    const limit = 100;

    while (true) {
      const listResponse = await this.pokeApiClient.getPokemonList(offset, limit);
      
      for (const result of listResponse.results) {
        const id = this.extractIdFromUrl(result.url);
        const pokemon = await this.findById(id);
        if (pokemon && pokemon.hasAbility(abilityName)) {
          results.push(pokemon);
        }
      }

      if (offset + limit >= listResponse.count) {
        break;
      }
      offset += limit;
    }

    return results;
  }

  async search(query: string): Promise<Pokemon[]> {
    const results: Pokemon[] = [];
    const searchLower = query.toLowerCase().trim();
    let offset = 0;
    const limit = 100;

    while (true) {
      const listResponse = await this.pokeApiClient.getPokemonList(offset, limit);
      
      for (const result of listResponse.results) {
        if (result.name.toLowerCase().includes(searchLower)) {
          const id = this.extractIdFromUrl(result.url);
          const pokemon = await this.findById(id);
          if (pokemon) {
            results.push(pokemon);
          }
        }
      }

      if (offset + limit >= listResponse.count) {
        break;
      }
      offset += limit;
    }

    return results;
  }

  private extractIdFromUrl(url: string): number {
    const match = url.match(/\/(\d+)\/?$/);
    return match ? parseInt(match[1], 10) : 0;
  }

  private filterBySearch(pokemon: Pokemon[], search: string): Pokemon[] {
    const searchLower = search.toLowerCase().trim();
    return pokemon.filter((p) => p.name.toLowerCase().includes(searchLower));
  }

  private filterByAbilities(pokemon: Pokemon[], abilities: string[]): Pokemon[] {
    return pokemon.filter((p) => abilities.some((ability) => p.hasAbility(ability)));
  }

  private sortPokemon(
    pokemon: Pokemon[],
    sortBy: 'ability' | 'name' | 'id',
    direction: 'asc' | 'desc',
  ): Pokemon[] {
    const sorted = [...pokemon].sort((a, b) => {
      let comparison = 0;

      switch (sortBy) {
        case 'ability': {
          const aAbility = a.getPrimaryAbilityName() || '';
          const bAbility = b.getPrimaryAbilityName() || '';
          comparison = aAbility.localeCompare(bAbility);
          break;
        }
        case 'name':
          comparison = a.name.localeCompare(b.name);
          break;
        case 'id':
          comparison = a.id - b.id;
          break;
      }

      return direction === 'asc' ? comparison : -comparison;
    });

    return sorted;
  }
}

