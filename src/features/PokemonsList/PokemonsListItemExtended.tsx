import { Component } from 'react';

class PokemonsListItemExtended extends Component<PokemonExtended> {
  render() {
    const { name, height, order, weight } = this.props;
    return (
      <div className="flex gap-2">
        <span>{name}</span>
        <span>{height}</span>
        <span>{order}</span>
        <span>{weight}</span>
      </div>
    );
  }
}

export default PokemonsListItemExtended;
