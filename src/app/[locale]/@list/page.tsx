'use client';
import React from 'react';
import SearchBar from '@/lib/components/SearchBar/SearchBar.tsx';
import PokemonsList from '@/lib/components/PokemonList/PokemonsList.tsx';
import {
  clearPokemons,
  selectPokemons,
} from '@/lib/features/PokemonsList/pokemonsSlice.ts';
import { useAppDispatch, useAppSelector } from '@/lib/hooks.ts';
import { saveAs } from 'file-saver';

const Page = () => {
  const pokemons = useAppSelector(selectPokemons);
  const dispatch = useAppDispatch();
  const pokemonsCount = pokemons.length;
  const isEmpty = pokemonsCount === 0;

  const clearPokemonsHandle = () => {
    dispatch(clearPokemons());
  };
  const downloadHandle = async () => {
    try {
      const response = await fetch('/api/export-csv', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ pokemons }),
      });

      const blob = await response.blob();
      saveAs(blob, `${pokemons.length}_items.csv`);
    } catch (error) {
      console.error('Error during CSV download:', error);
    }
  };
  return (
    <>
      <SearchBar />
      <PokemonsList />
      {!isEmpty && (
        <div className="mt-2 self-center rounded-md border px-8 py-4 dark:border-gray-300 dark:bg-gray-800">
          <div className="flex flex-col items-center gap-2 dark:text-gray-400">
            <span className="dark:text-gray-400">
              <b className="dark:text-gray-300">Selected: </b>
              {pokemonsCount} item(s)
            </span>
            <div className="flex gap-2">
              <button
                onClick={clearPokemonsHandle}
                className="rounded-md border px-4 py-2 uppercase dark:border-gray-500 dark:text-gray-300"
              >
                deselect all
              </button>
              <button
                onClick={downloadHandle}
                className="rounded-md border px-4 py-2 uppercase dark:border-gray-500 dark:text-gray-300"
              >
                download
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Page;
