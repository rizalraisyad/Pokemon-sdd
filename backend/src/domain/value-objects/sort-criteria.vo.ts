export class SortCriteria {
  constructor(
    public readonly field: 'ability' | 'name' | 'id',
    public readonly direction: 'asc' | 'desc' = 'asc',
    public readonly useFirstAbility: boolean = true,
  ) {
    this.validate();
  }

  private validate(): void {
    const validFields = ['ability', 'name', 'id'];
    if (!validFields.includes(this.field)) {
      throw new Error(`Field must be one of: ${validFields.join(', ')}`);
    }

    if (this.direction !== 'asc' && this.direction !== 'desc') {
      throw new Error("Direction must be either 'asc' or 'desc'");
    }

    if (this.field === 'ability' && !this.useFirstAbility) {
      throw new Error('useFirstAbility must be true when sorting by ability');
    }
  }

  isAscending(): boolean {
    return this.direction === 'asc';
  }

  isDescending(): boolean {
    return this.direction === 'desc';
  }

  static byAbility(direction: 'asc' | 'desc' = 'asc'): SortCriteria {
    return new SortCriteria('ability', direction, true);
  }

  static byName(direction: 'asc' | 'desc' = 'asc'): SortCriteria {
    return new SortCriteria('name', direction);
  }

  static byId(direction: 'asc' | 'desc' = 'asc'): SortCriteria {
    return new SortCriteria('id', direction);
  }

  static default(): SortCriteria {
    return new SortCriteria('id', 'asc');
  }
}

