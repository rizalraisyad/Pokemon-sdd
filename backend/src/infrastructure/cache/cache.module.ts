import { Module } from '@nestjs/common';
import { CacheModule as NestCacheModule } from '@nestjs/cache-manager';
import { PokemonCacheService } from './pokemon-cache.service';

@Module({
  imports: [
    NestCacheModule.register({
      ttl: 3600000, // 1 hour
      max: 1000, // maximum number of items in cache
      isGlobal: true,
    }),
  ],
  providers: [PokemonCacheService],
  exports: [PokemonCacheService],
})
export class CacheModule {}

