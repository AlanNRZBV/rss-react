import type { FC } from 'react';
import type { PokemonItem } from '../../types';

interface Props {
  pokemon: PokemonItem;
}

const PokemonsListItemExtended: FC<Props> = ({ pokemon }) => {
  const { name, height, order, weight } = pokemon;
  return (
    <tr>
      <td className="flex justify-center">
        <div className="flex justify-center"></div>
        <span className="font-medium capitalize">{name}</span>
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
