import type { FC } from 'react';
import { NavLink, useParams, useSearchParams } from 'react-router';
import { useLazyGetDetailedPokemonByNameQuery } from '../../shared/api/pokemonApi.ts';
import { useAppDispatch } from '../../app/providers/store.ts';
import { toggleView } from '../../app/appSlice.ts';

const PokemonsListItem: FC<Pokemon> = ({ name, url }) => {
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
    <tr className="border border-gray-400 not-even:bg-gray-100 dark:not-even:bg-gray-800">
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
