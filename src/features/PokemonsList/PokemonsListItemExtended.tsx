import type { FC } from 'react';
import type { PokemonExtended } from '../../types';
import { NavLink } from 'react-router';

interface Props {
  pokemon: PokemonExtended;
}

const PokemonsListItemExtended: FC<Props> = ({ pokemon }) => {
  const { name, height, order, weight } = pokemon;
  const clickHandler = () => {};
  return (
    <tr className="border-t border-t-gray-400">
      <td className="flex justify-center">
        <div className="flex justify-center"></div>
        <NavLink
          onClick={clickHandler}
          to={`details/${name}`}
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
