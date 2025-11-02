import { Module } from '@nestjs/common';
import { PokemonController } from './pokemon.controller';
import { PokemonService } from '../../application/services/pokemon.service';
import { GetPokemonListUseCase } from '../../application/use-cases/get-pokemon-list.usecase';
import { PokeApiClient } from '../../infrastructure/external-apis/pokeapi/pokeapi.client';
import { PokeApiRepository } from '../../infrastructure/external-apis/pokeapi.repository.impl';
import { CacheModule } from '../../infrastructure/cache/cache.module';
import { POKEMON_REPOSITORY_TOKEN } from '../../domain/repositories/pokemon.repository.tokens';

@Module({
  imports: [CacheModule],
  controllers: [PokemonController],
  providers: [
    PokemonService,
    GetPokemonListUseCase,
    PokeApiClient,
    {
      provide: POKEMON_REPOSITORY_TOKEN,
      useClass: PokeApiRepository,
    },
  ],
  exports: [PokemonService],
})
export class PokemonModule {}

