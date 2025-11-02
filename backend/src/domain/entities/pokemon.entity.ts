import { PokemonAbility } from '../value-objects/pokemon-ability.vo';

export class Pokemon {
  constructor(
    public readonly id: number,
    public readonly name: string,
    public readonly imageUrl: string,
    public readonly types: string[],
    public readonly abilities: PokemonAbility[],
    public readonly weight: number,
    public readonly height: number,
  ) {
    this.validate();
  }

  private validate(): void {
    if (!Number.isInteger(this.id) || this.id <= 0) {
      throw new Error('Pokemon ID must be a positive integer');
    }

    if (!this.name || this.name.trim().length === 0) {
      throw new Error('Pokemon name must be a non-empty string');
    }

    try {
      new URL(this.imageUrl);
    } catch {
      throw new Error(`Invalid image URL format: ${this.imageUrl}`);
    }

    if (!Array.isArray(this.types) || this.types.length === 0) {
      throw new Error('Pokemon types must be a non-empty array');
    }

    if (!Array.isArray(this.abilities)) {
      throw new Error('Pokemon abilities must be an array');
    }

    if (this.weight < 0) {
      throw new Error('Pokemon weight must be a non-negative number');
    }

    if (this.height < 0) {
      throw new Error('Pokemon height must be a non-negative number');
    }
  }

  getPrimaryAbilityName(): string | null {
    if (this.abilities.length === 0) {
      return null;
    }
    const sortedAbilities = [...this.abilities].sort((a, b) =>
      a.name.localeCompare(b.name),
    );
    return sortedAbilities[0].name;
  }

  hasAbility(abilityName: string): boolean {
    return this.abilities.some((ability) => ability.name === abilityName);
  }

  static fromPokeAPI(pokeData: any): Pokemon {
    const types = pokeData.types.map((type: any) => type.type.name);
    const abilities = pokeData.abilities.map((ability: any) =>
      PokemonAbility.fromPokeAPI(ability),
    );

    const imageUrl =
      pokeData.sprites?.other?.['official-artwork']?.front_default ||
      pokeData.sprites?.front_default ||
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/0.png';

    return new Pokemon(
      pokeData.id,
      pokeData.name,
      imageUrl,
      types,
      abilities,
      pokeData.weight || 0,
      pokeData.height || 0,
    );
  }
}

