import React, { useState } from 'react';
import { PokemonListLayout } from '../../templates/PokemonListLayout/PokemonListLayout';

export const PokemonListPage: React.FC = () => {
  const [search, setSearch] = useState<string>('');
  const [selectedAbilities, setSelectedAbilities] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<'ability' | 'name' | 'id'>('id');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  const handleAbilitiesChange = (abilities: string[]) => {
    setSelectedAbilities(abilities);
  };

  const handleSortChange = (field: 'ability' | 'name' | 'id', direction: 'asc' | 'desc') => {
    setSortBy(field);
    setSortDirection(direction);
  };

  return (
    <PokemonListLayout
      search={search}
      abilities={selectedAbilities}
      sortBy={sortBy}
      sortDirection={sortDirection}
      onAbilitiesChange={handleAbilitiesChange}
      onSortChange={handleSortChange}
    />
  );
};

