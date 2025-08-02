import type { FC } from 'react';
import { NavLink, useParams, useSearchParams } from 'react-router';
import { useLazyGetDetailedPokemonByNameQuery } from '../../shared/api/pokemonApi.ts';
import { useAppDispatch } from '../../app/providers/store.ts';
import { toggleView } from '../../app/appSlice.ts';

interface Props {
  pokemon: PokemonExtended;
}

const PokemonsListItemExtended: FC<Props> = ({ pokemon }) => {
  const { name, height, order, weight } = pokemon;
  const [trigger] = useLazyGetDetailedPokemonByNameQuery();
  const dispatch = useAppDispatch();
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
  return (
    <tr className="border-t border-t-gray-400">
      <td className="flex justify-center">
        <div className="flex justify-center"></div>
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
