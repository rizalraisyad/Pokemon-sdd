import React from 'react';
import { PokemonList } from '../../organisms/PokemonList/PokemonList';
import { FilterBar } from '../../organisms/FilterBar/FilterBar';

interface PokemonListLayoutProps {
  search?: string;
  abilities?: string[];
  sortBy?: 'ability' | 'name' | 'id';
  sortDirection?: 'asc' | 'desc';
  onAbilitiesChange?: (abilities: string[]) => void;
  onSortChange?: (field: 'ability' | 'name' | 'id', direction: 'asc' | 'desc') => void;
}

export const PokemonListLayout: React.FC<PokemonListLayoutProps> = ({
  search,
  abilities = [],
  sortBy = 'id',
  sortDirection = 'asc',
  onAbilitiesChange,
  onSortChange,
}) => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Pokemon List</h1>
      <FilterBar
        selectedAbilities={abilities}
        onAbilitiesChange={onAbilitiesChange || (() => {})}
        sortBy={sortBy}
        sortDirection={sortDirection}
        onSortChange={onSortChange || (() => {})}
      />
      <PokemonList
        search={search}
        abilities={abilities}
        sortBy={sortBy}
        sortDirection={sortDirection}
      />
    </div>
  );
};

