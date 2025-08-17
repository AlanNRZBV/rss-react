'use client';
import { Link } from '@/i18n/navigation';
import type { ChangeEvent, FC } from 'react';
import { useLazyGetDetailedPokemonByNameQuery } from '@/lib/api/pokemonApi.ts';
import { useAppDispatch, useAppSelector } from '@/lib/hooks.ts';
import {
  addPokemon,
  removePokemon,
  selectPokemons,
} from '@/lib/features/PokemonsList/pokemonsSlice.ts';
import { useSearchParams } from 'next/navigation';

interface Props {
  pokemonExtended?: PokemonExtended;
  pokemon?: Pokemon;
}

const PokemonsListItem: FC<Props> = ({ pokemonExtended, pokemon }) => {
  const [trigger] = useLazyGetDetailedPokemonByNameQuery();
  const dispatch = useAppDispatch();
  const pokemons = useAppSelector(selectPokemons);
  const searchParams = useSearchParams();

  if (!pokemonExtended && !pokemon) {
    return (
      <tr>
        <td>data error</td>
      </tr>
    );
  }

  const name = pokemon?.name;
  const url = pokemon?.url;
  const nameFromExtended = pokemonExtended?.name;
  const order = pokemonExtended?.order;
  const weight = pokemonExtended?.weight;
  const height = pokemonExtended?.height;

  const actualName = name ?? nameFromExtended;
  const actualNameObj = actualName ? { name: actualName } : undefined;

  if (!actualName || !actualNameObj) {
    return (
      <tr>
        <td>name error</td>
      </tr>
    );
  }

  const isChecked = pokemons.some((p) => p.name === name);

  const queryString = searchParams.toString()
    ? `?${searchParams.toString()}`
    : '';

  const toggleAndFetch = () => {
    if (name) {
      trigger(name);
    } else {
      throw new Error('Unsupported data format');
    }
  };

  const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      dispatch(addPokemon(actualNameObj));
    } else {
      dispatch(removePokemon(actualName));
    }
  };

  return (
    <tr className="border border-gray-400 not-even:bg-gray-100 dark:not-even:bg-gray-800">
      <td className="text-center">
        <input
          onChange={handleCheckboxChange}
          checked={isChecked}
          type="checkbox"
          disabled={!!pokemonExtended}
        />
      </td>
      <td className="flex justify-center border-x border-x-gray-400 px-2 py-1">
        <Link
          onClick={toggleAndFetch}
          href={`/details/${actualName}${queryString}`}
          className="dark:text-gray-400"
        >
          {actualName}
        </Link>
      </td>
      <td>
        {pokemonExtended ? (
          <div className="flex grow gap-4">
            <div>
              <span className="font-medium">Height:</span> {height}
            </div>
            <div>
              <span className="font-medium">Order:</span> {order}
            </div>
            <div>
              <span className="font-medium">Weight:</span> {weight}
            </div>
          </div>
        ) : (
          <a href={url} className="ml-2 text-blue-400">
            {url}
          </a>
        )}
      </td>
    </tr>
  );
};

export default PokemonsListItem;
