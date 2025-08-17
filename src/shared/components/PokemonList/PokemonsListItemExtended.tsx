'use client';
import type { ChangeEvent, FC } from 'react';
import { useLazyGetDetailedPokemonByNameQuery } from '@/lib/api/pokemonApi.ts';
import { useAppDispatch, useAppSelector } from '@/lib/hooks.ts';
import { useParams, useSearchParams } from 'next/navigation';
import {
  addPokemon,
  removePokemon,
  selectPokemons,
} from '@/lib/features/PokemonsList/pokemonsSlice.ts';
import { toggleView } from '@/lib/features/DetailedView/detailedViewSlice.ts';
import { Link } from '@/i18n/navigation.ts';

interface Props {
  pokemon: PokemonExtended;
}

const PokemonsListItemExtended: FC<Props> = ({ pokemon }) => {
  const { name, height, order, weight } = pokemon;
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
    <tr className="border-t border-t-gray-400">
      <td className="border border-gray-400 text-center">
        <input
          onChange={handleCheckboxChange}
          checked={isChecked}
          type="checkbox"
        />
      </td>
      <td className="flex justify-center">
        <Link
          onClick={toggleAndFetch}
          href={`/${name}${queryString}`}
          className="dark:text-gray-400"
        >
          {name}
        </Link>
      </td>
      <td>
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
      </td>
    </tr>
  );
};

export default PokemonsListItemExtended;
