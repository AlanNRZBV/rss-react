import { Component } from 'react';
import PokemonsListItem from './PokemonsListItem.tsx';
import PokemonsListItemExtended from './PokemonsListItemExtended.tsx';

interface Props {
  defaultSearch: DefaultResponse | undefined;
  pokemon: PokemonExtended | undefined;
}

class PokemonsList extends Component<Props> {
  render() {
    const { defaultSearch, pokemon } = this.props;

    return (
      <table className="w-full border border-black">
        <thead className="border border-b-black">
          <tr className="text-lg">
            <th className="border border-r-black py-2">Name</th>
            <th>Description</th>
          </tr>
        </thead>
        {defaultSearch && (
          <tbody>
            {defaultSearch.results.map(({ name, url }, index) => (
              <PokemonsListItem key={index} name={name} url={url} />
            ))}
          </tbody>
        )}
        {pokemon && (
          <tbody>
            <PokemonsListItemExtended pokemon={pokemon} />
          </tbody>
        )}
      </table>
    );
  }
}

export default PokemonsList;
