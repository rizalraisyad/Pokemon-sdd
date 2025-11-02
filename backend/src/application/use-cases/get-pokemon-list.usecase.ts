import { Injectable } from '@nestjs/common';
import { PokemonService } from '../services/pokemon.service';
import { PokemonQueryParams } from '../../domain/repositories/pokemon.repository';

@Injectable()
export class GetPokemonListUseCase {
  constructor(private readonly pokemonService: PokemonService) {}

  async execute(params: PokemonQueryParams) {
    return this.pokemonService.getPokemonList(params);
  }
}

