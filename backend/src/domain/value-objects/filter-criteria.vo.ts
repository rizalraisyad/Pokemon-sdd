export class FilterCriteria {
  constructor(
    public readonly abilities: string[],
    public readonly logic: 'AND' | 'OR' = 'OR',
  ) {
    this.validate();
  }

  private validate(): void {
    if (!Array.isArray(this.abilities)) {
      throw new Error('Abilities must be an array');
    }

    if (this.abilities.length > 0) {
      const invalidAbilities = this.abilities.filter(
        (ability) => !ability || typeof ability !== 'string' || ability.trim().length === 0,
      );
      if (invalidAbilities.length > 0) {
        throw new Error('Abilities must be non-empty strings');
      }
    }

    if (this.logic !== 'AND' && this.logic !== 'OR') {
      throw new Error("Logic must be either 'AND' or 'OR'");
    }
  }

  isEmpty(): boolean {
    return this.abilities.length === 0;
  }

  hasAbility(abilityName: string): boolean {
    return this.abilities.some(
      (ability) => ability.toLowerCase() === abilityName.toLowerCase(),
    );
  }

  static fromArray(abilities: string[], logic: 'AND' | 'OR' = 'OR'): FilterCriteria {
    return new FilterCriteria(abilities, logic);
  }

  static empty(): FilterCriteria {
    return new FilterCriteria([]);
  }
}

