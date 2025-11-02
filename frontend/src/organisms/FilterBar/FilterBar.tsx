import React, { useState, useEffect } from 'react';
import { FilterSelect } from '../../molecules/FilterSelect/FilterSelect';
import { SortSelect } from '../../molecules/SortSelect/SortSelect';
import { pokemonApiService } from '../../services/api/pokemon.api';

interface FilterBarProps {
  selectedAbilities: string[];
  onAbilitiesChange: (abilities: string[]) => void;
  sortBy: 'ability' | 'name' | 'id';
  sortDirection: 'asc' | 'desc';
  onSortChange: (field: 'ability' | 'name' | 'id', direction: 'asc' | 'desc') => void;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  selectedAbilities,
  onAbilitiesChange,
  sortBy,
  sortDirection,
  onSortChange,
}) => {
  const [availableAbilities, setAvailableAbilities] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAbilities = async () => {
      try {
        setLoading(true);
        const response = await pokemonApiService.getAvailableAbilities();
        if (response.success && response.data?.abilities) {
          setAvailableAbilities(response.data.abilities);
        }
      } catch (error) {
        console.error('Failed to fetch abilities:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAbilities();
  }, []);

  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FilterSelect
          options={availableAbilities}
          selected={selectedAbilities}
          onChange={onAbilitiesChange}
          label="Filter by Ability"
          placeholder={loading ? 'Loading abilities...' : 'Select abilities...'}
        />
        <SortSelect
          sortBy={sortBy}
          sortDirection={sortDirection}
          onChange={onSortChange}
          label="Sort by"
        />
      </div>
    </div>
  );
};

