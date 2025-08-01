import type { Pokemon } from '../../types';
import type { FC } from 'react';
import { NavLink } from 'react-router';

const PokemonsListItem: FC<Pokemon> = ({ name, url }) => {
  const toggleAndFetch = () => {};

  return (
    <tr className="border border-gray-400 not-even:bg-gray-100">
      <td className="flex justify-center px-2 py-1">
        <NavLink
          onClick={toggleAndFetch}
          to={`details/${name}`}
          className="font-medium capitalize"
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
