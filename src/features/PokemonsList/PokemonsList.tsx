import PokemonsListItem from './PokemonsListItem.tsx';
import PokemonsListItemExtended from './PokemonsListItemExtended.tsx';

const PokemonsList = () => {
  const defaultSearch = {
    results: [],
  };

  const pokemon = false;
  const previous = false;

  const changePage = () => {};
  return (
    <table className="mt-4 w-full border border-gray-400">
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
                changePage();
              }}
              className={`rounded-md border px-4 py-2 text-base font-medium uppercase ${previous ? 'border-black text-black' : 'border-gray-400 text-gray-400'}`}
            >
              previous
            </button>
            <button
              onClick={() => {
                changePage();
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
