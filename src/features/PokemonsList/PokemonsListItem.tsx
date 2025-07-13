import { Component } from 'react';

class PokemonsListItem extends Component<Pokemon> {
  render() {
    const { name, url } = this.props;
    return (
      <tr className="not-last:border-b-gray-400 not-last:border not-even:bg-gray-100">
        <td className="flex justify-center py-1 px-2">
          <span className="capitalize font-medium">{name}</span>
        </td>
        <td>
          <a href={url} className="text-blue-400">
            {url}
          </a>
        </td>
      </tr>
    );
  }
}

export default PokemonsListItem;
