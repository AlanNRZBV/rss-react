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
        <table className="border border-black w-full">
          <thead className="border border-b-black">
            <tr className="text-lg">
              <th className="border border-r-black py-2">Name</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {defaultSearch.results.map(({ name, url }, index) => (
              <PokemonsListItem key={index} name={name} url={url} />
            ))}
          </tbody>
        </table>
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
