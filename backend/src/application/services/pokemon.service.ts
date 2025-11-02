import { Injectable, Inject } from '@nestjs/common';
import { IPokemonRepository, PokemonQueryParams } from '../../domain/repositories/pokemon.repository';
import { Pokemon } from '../../domain/entities/pokemon.entity';
import { PokemonCacheService } from '../../infrastructure/cache/pokemon-cache.service';
import { POKEMON_REPOSITORY_TOKEN } from '../../domain/repositories/pokemon.repository.tokens';

@Injectable()
export class PokemonService {
  constructor(
    @Inject(POKEMON_REPOSITORY_TOKEN)
    private readonly pokemonRepository: IPokemonRepository,
    private readonly cacheService: PokemonCacheService,
  ) {}

  async getPokemonList(params: PokemonQueryParams) {
    const cacheKey = `pokemon:list:${JSON.stringify(params)}`;
    const cached = await this.cacheService.get(cacheKey);
    if (cached) {
      return cached;
    }

    const result = await this.pokemonRepository.findAll(params);
    await this.cacheService.set(cacheKey, result);
    return result;
  }

  async getPokemonById(id: number): Promise<Pokemon | null> {
    const cached = await this.cacheService.getPokemon(id);
    if (cached) {
      return cached;
    }

    const pokemon = await this.pokemonRepository.findById(id);
    if (pokemon) {
      await this.cacheService.setPokemon(id, pokemon);
    }
    return pokemon;
  }

  async getPokemonByName(name: string): Promise<Pokemon | null> {
    return this.pokemonRepository.findByName(name);
  }

  async getAvailableAbilities(): Promise<string[]> {
    const cacheKey = 'pokemon:abilities:list';
    const cached = await this.cacheService.get(cacheKey);
    if (cached) {
      return cached;
    }

    // Fetch a sample of Pokemon to extract unique abilities
    const result = await this.pokemonRepository.findAll({ offset: 0, limit: 100 });
    const abilitiesSet = new Set<string>();
    
    result.pokemon.forEach((pokemon) => {
      pokemon.abilities.forEach((ability) => {
        abilitiesSet.add(ability.name);
      });
    });

    const abilities = Array.from(abilitiesSet).sort();
    await this.cacheService.set(cacheKey, abilities, 86400000); // Cache for 24 hours
    return abilities;
  }
}

