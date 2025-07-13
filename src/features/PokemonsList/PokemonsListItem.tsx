import { Component } from 'react';

class PokemonsListItem extends Component<Pokemon> {
  render() {
    const { name, url } = this.props;
    return (
      <div>
        <span>{name}</span> <span>{url}</span>
      </div>
    );
  }
}

export default PokemonsListItem;
