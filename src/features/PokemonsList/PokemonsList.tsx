import PokemonsListItem from './PokemonsListItem.tsx';
import PokemonsListItemExtended from './PokemonsListItemExtended.tsx';
import { usePokemon } from '../../shared/hooks/usePokemon.ts';
import type { DefaultResponse } from '../../types';
import { usePokemonActions } from '../../shared/hooks/usePokemonActions.ts';

const PokemonsList = () => {
  const { app } = usePokemon();
  const { changePage } = usePokemonActions();
  const { isLoading, isError, defaultSearch, error, pokemon } = app;
  const { previous, next } = defaultSearch
    ? (defaultSearch as DefaultResponse)
    : { previous: null, next: null };

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
    <table className="mt-4 w-full border-collapse border border-gray-400">
      <thead className="">
        <tr className="text-lg">
          <th className="border-r border-r-gray-400 py-2">Name</th>
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
      {defaultSearch && (
        <caption className="caption-bottom">
          <div className="mt-2 flex justify-center gap-2">
            <button
              onClick={() => {
                changePage(previous);
              }}
              className={`rounded-md border px-4 py-2 text-base font-medium uppercase ${previous ? 'border-black text-black' : 'border-gray-400 text-gray-400'}`}
              disabled={previous === null}
            >
              previous
            </button>
            <button
              onClick={() => {
                changePage(next);
              }}
              className="rounded-md border border-black px-4 py-2 text-base font-medium uppercase"
            >
              next
            </button>
          </div>
        </caption>
      )}
    </table>
  );
};

export default PokemonsList;
