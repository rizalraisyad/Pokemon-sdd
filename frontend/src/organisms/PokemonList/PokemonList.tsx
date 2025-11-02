import React, { useEffect, useRef } from 'react';
import { usePokemonList } from '../../services/hooks/usePokemonList';
import { PokemonCard } from '../../atoms/PokemonCard/PokemonCard';
import { Pokemon } from '../../shared/types/pokemon.types';

interface PokemonListProps {
  search?: string;
  abilities?: string[];
  sortBy?: 'ability' | 'name' | 'id';
  sortDirection?: 'asc' | 'desc';
}

export const PokemonList: React.FC<PokemonListProps> = ({
  search,
  abilities,
  sortBy,
  sortDirection,
}) => {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    error,
  } = usePokemonList({
    search,
    abilities,
    sortBy,
    sortDirection,
  });

  const observerTarget = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 0.1 },
    );

    const currentTarget = observerTarget.current;
    if (currentTarget) {
      observer.observe(currentTarget);
    }

    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget);
      }
    };
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-gray-600">Loading Pokemon...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-red-600">Error loading Pokemon: {error.message}</div>
      </div>
    );
  }

  const allPokemon: Pokemon[] =
    data?.pages.flatMap((page) => (page.success ? page.data.pokemon : [])) || [];

  if (allPokemon.length === 0) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-gray-600">No Pokemon found</div>
      </div>
    );
  }

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {allPokemon.map((pokemon) => (
          <PokemonCard key={pokemon.id} pokemon={pokemon} />
        ))}
      </div>

      <div ref={observerTarget} className="h-10 flex justify-center items-center mt-4">
        {isFetchingNextPage && (
          <div className="text-gray-600">Loading more Pokemon...</div>
        )}
        {!hasNextPage && allPokemon.length > 0 && (
          <div className="text-gray-600">No more Pokemon to load</div>
        )}
      </div>
    </div>
  );
};

