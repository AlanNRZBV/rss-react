import type { ChangeEvent, FC } from 'react';
import { NavLink, useParams, useSearchParams } from 'react-router';
import { useLazyGetDetailedPokemonByNameQuery } from '../../shared/api/pokemonApi.ts';
import { useAppDispatch, useAppSelector } from '../../app/providers/store.ts';
import { toggleView } from '../../app/appSlice.ts';
import { addPokemon, removePokemon, selectPokemons } from './pokemonSlice.ts';

const PokemonsListItem: FC<Pokemon> = ({ name, url }) => {
  const [trigger] = useLazyGetDetailedPokemonByNameQuery();
  const dispatch = useAppDispatch();
  const pokemons = useAppSelector(selectPokemons);
  const isChecked = pokemons.some((p) => p.name === name);
  const [searchParams] = useSearchParams();
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
      <td className="border border-gray-400 text-center">
        <input
          onChange={handleCheckboxChange}
          checked={isChecked}
          type="checkbox"
        />
      </td>
      <td className="flex justify-center px-2 py-1">
        <NavLink
          onClick={toggleAndFetch}
          to={`/details/${name}${queryString}`}
          className="font-medium capitalize dark:text-gray-300"
          replace
        >
          {name}
        </NavLink>
      </td>
      <td>
        <a href={url} className="text-blue-400">
          {url}
        </a>
      </td>
    </tr>
  );
};

export default PokemonsListItem;
