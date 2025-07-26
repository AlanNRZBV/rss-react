import PokemonsListItem from './PokemonsListItem.tsx';
import PokemonsListItemExtended from './PokemonsListItemExtended.tsx';
import { usePokemon } from '../../shared/hooks/usePokemon.ts';

const PokemonsList = () => {
  const { app } = usePokemon();
  const { isLoading, isError, defaultSearch, error, pokemon } = app;

  if (isError && error) {
    const { message, status } = error;

    if (status === 404) {
      return <div>Wrong pokemon name</div>;
    }

    return (
      <div>
        Something bad happen. Try to reload page
        <div className="flex flex-col">
          <span>Error status : {status}</span>
          <span>Error message : {message}</span>
        </div>
      </div>
    );
  }
  if (isLoading) {
    return <div>Loading content</div>;
  }

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
};

export default PokemonsList;
