export class PokemonAbility {
  constructor(
    public readonly name: string,
    public readonly isHidden: boolean,
    public readonly slot: number,
  ) {
    this.validate();
  }

  private validate(): void {
    if (!this.name || this.name.trim().length === 0) {
      throw new Error('Ability name must be a non-empty string');
    }

    if (typeof this.isHidden !== 'boolean') {
      throw new Error('isHidden must be a boolean');
    }

    if (!Number.isInteger(this.slot) || this.slot < 1 || this.slot > 3) {
      throw new Error('Ability slot must be a positive integer between 1 and 3');
    }
  }

  static fromPokeAPI(abilityData: {
    ability: { name: string };
    is_hidden: boolean;
    slot: number;
  }): PokemonAbility {
    return new PokemonAbility(
      abilityData.ability.name,
      abilityData.is_hidden,
      abilityData.slot,
    );
  }

  equals(other: PokemonAbility): boolean {
    return (
      this.name === other.name &&
      this.isHidden === other.isHidden &&
      this.slot === other.slot
    );
  }
}

