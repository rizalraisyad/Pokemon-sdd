import { Injectable, Inject, Logger } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { Pokemon } from '../../domain/entities/pokemon.entity';

@Injectable()
export class PokemonCacheService {
  private readonly logger = new Logger(PokemonCacheService.name);
  private readonly TTL = 3600000; // 1 hour in milliseconds

  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  async get(key: string): Promise<any> {
    try {
      const value = await this.cacheManager.get(key);
      if (value) {
        this.logger.debug(`Cache hit: ${key}`);
      } else {
        this.logger.warn(`Cache miss: ${key}`);
      }
      return value;
    } catch (error) {
      this.logger.error(`Cache get error for ${key}: ${error instanceof Error ? error.message : 'Unknown error'}`);
      return null;
    }
  }

  async set(key: string, value: any, ttl?: number): Promise<void> {
    try {
      await this.cacheManager.set(key, value, ttl || this.TTL);
      this.logger.debug(`Cache set: ${key}`);
    } catch (error) {
      this.logger.error(`Cache set error for ${key}: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  async getPokemon(id: number): Promise<Pokemon | null> {
    const key = `pokemon:${id}`;
    return this.get(key);
  }

  async setPokemon(id: number, pokemon: Pokemon): Promise<void> {
    const key = `pokemon:${id}`;
    await this.set(key, pokemon);
  }

  async getPokemonList(offset: number, limit: number): Promise<any> {
    const key = `pokemon:list:${offset}:${limit}`;
    return this.get(key);
  }

  async setPokemonList(
    offset: number,
    limit: number,
    data: any,
  ): Promise<void> {
    const key = `pokemon:list:${offset}:${limit}`;
    await this.set(key, data);
  }

  async invalidatePokemon(id: number): Promise<void> {
    const key = `pokemon:${id}`;
    try {
      await this.cacheManager.del(key);
      this.logger.debug(`Cache invalidated: ${key}`);
    } catch (error) {
      this.logger.error(`Cache invalidate error for ${key}: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
}

