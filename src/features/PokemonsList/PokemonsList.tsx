import { Component } from 'react';
import PokemonsListItem from './PokemonsListItem.tsx';

interface Props {
  defaultSearch: DefaultResponse | undefined;
  pokemon: PokemonExtended | undefined;
}

class PokemonsList extends Component<Props> {
  render() {
    const { defaultSearch, pokemon } = this.props;

    if (defaultSearch) {
      return (
        <div>
          {defaultSearch.results.map(({ name, url }, index) => (
            <PokemonsListItem key={index} name={name} url={url} />
          ))}
        </div>
      );
    }

    if (pokemon) {
      return <div>{pokemon.name}</div>;
    }

    return (
      <div>
        <div>something unpredictable happen</div>
      </div>
    );
  }
}

export default PokemonsList;
