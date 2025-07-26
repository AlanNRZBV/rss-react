import { Component } from 'react';

interface Props {
  pokemon: PokemonItem;
}

class PokemonsListItemExtended extends Component<Props> {
  render() {
    const { name, height, order, weight } = this.props.pokemon;
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
  }
}

export default PokemonsListItemExtended;
