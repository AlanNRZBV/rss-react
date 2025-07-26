import type { Pokemon } from '../../types';
import type { FC } from 'react';

const PokemonsListItem: FC<Pokemon> = ({ name, url }) => {
  return (
    <tr className="not-last:border not-last:border-b-gray-400 not-even:bg-gray-100">
      <td className="flex justify-center px-2 py-1">
        <span className="font-medium capitalize">{name}</span>
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
