import { Pokemon } from '../../domain/entities/pokemon.entity';
import { PokemonAbility } from '../../domain/value-objects/pokemon-ability.vo';

export class PokemonResponseDto {
  id: number;
  name: string;
  imageUrl: string;
  types: string[];
  abilities: Array<{
    name: string;
    isHidden: boolean;
    slot: number;
  }>;
  weight: number;
  height: number;

  static fromEntity(pokemon: Pokemon): PokemonResponseDto {
    return {
      id: pokemon.id,
      name: pokemon.name,
      imageUrl: pokemon.imageUrl,
      types: pokemon.types,
      abilities: pokemon.abilities.map((ability) => ({
        name: ability.name,
        isHidden: ability.isHidden,
        slot: ability.slot,
      })),
      weight: pokemon.weight,
      height: pokemon.height,
    };
  }
}

