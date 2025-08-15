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
import { useParams, useSearchParams } from 'next/navigation';
import { toggleView } from '@/lib/features/DetailedView/detailedViewSlice.ts';

const PokemonsListItem: FC<Pokemon> = ({ name, url }) => {
  const [trigger] = useLazyGetDetailedPokemonByNameQuery();
  const dispatch = useAppDispatch();
  const pokemons = useAppSelector(selectPokemons);
  const isChecked = pokemons.some((p) => p.name === name);
  const searchParams = useSearchParams();
  const params = useParams();

  const queryString = searchParams.toString()
    ? `?${searchParams.toString()}`
    : '';

  const toggleAndFetch = () => {
    if (name) {
      trigger(name);
      dispatch(toggleView(params.name ? 'refetch' : 'open'));
    } else {
      throw new Error('Unsupported data format');
    }
  };

  const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      dispatch(addPokemon({ name }));
    } else {
      dispatch(removePokemon(name));
    }
  };

  return (
    <tr className="border border-gray-400 not-even:bg-gray-100 dark:not-even:bg-gray-800">
      <td className="text-center">
        <input
          onChange={handleCheckboxChange}
          checked={isChecked}
          type="checkbox"
        />
      </td>
      <td className="flex justify-center border-x border-x-gray-400 px-2 py-1">
        <Link
          onClick={toggleAndFetch}
          href={`/details/${name}${queryString}`}
          className="dark:text-gray-400"
        >
          {name}
        </Link>
      </td>
      <td>
        <a href={url} className="ml-2 text-blue-400">
          {url}
        </a>
      </td>
    </tr>
  );
};

export default PokemonsListItem;
