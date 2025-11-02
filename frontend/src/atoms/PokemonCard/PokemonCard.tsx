import React from 'react';
import { Pokemon } from '../../shared/types/pokemon.types';
import { Image } from '../Image/Image';
import { Badge } from '../Badge/Badge';

interface PokemonCardProps {
  pokemon: Pokemon;
  onClick?: () => void;
}

export const PokemonCard: React.FC<PokemonCardProps> = ({ pokemon, onClick }) => {
  return (
    <div
      className="pokemon-card cursor-pointer p-4"
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          onClick?.();
        }
      }}
    >
      <div className="flex flex-col items-center">
        <Image
          src={pokemon.imageUrl}
          alt={pokemon.name}
          className="w-32 h-32 object-contain mb-2"
        />
        <h3 className="text-lg font-semibold capitalize mb-1">{pokemon.name}</h3>
        <div className="flex flex-wrap gap-1 justify-center mb-2">
          {pokemon.types.map((type) => (
            <Badge key={type} label={type} variant="default" />
          ))}
        </div>
        <div className="text-sm text-gray-600">
          <p>ID: {pokemon.id}</p>
          {pokemon.abilities.length > 0 && (
            <p className="text-xs">
              Abilities: {pokemon.abilities.map((a) => a.name).join(', ')}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

