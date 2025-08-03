import type { ChangeEvent, FC } from 'react';
import { NavLink, useParams, useSearchParams } from 'react-router';
import { useLazyGetDetailedPokemonByNameQuery } from '../../shared/api/pokemonApi.ts';
import { useAppDispatch, useAppSelector } from '../../app/providers/store.ts';
import { toggleView } from '../../app/appSlice.ts';
import { addPokemon, removePokemon, selectPokemons } from './pokemonSlice.ts';

interface Props {
  pokemon: PokemonExtended;
}

const PokemonsListItemExtended: FC<Props> = ({ pokemon }) => {
  const { name, height, order, weight } = pokemon;
  const [trigger] = useLazyGetDetailedPokemonByNameQuery();
  const dispatch = useAppDispatch();
  const [searchParams] = useSearchParams();
  const pokemons = useAppSelector(selectPokemons);

  const isChecked = pokemons.some((p) => p.name === name);
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
        <NavLink
          onClick={toggleAndFetch}
          to={`/details/${name}${queryString}`}
          className="font-medium capitalize"
        >
          {name}
        </NavLink>
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
