import PokemonsListItem from './PokemonsListItem.tsx';
import PokemonsListItemExtended from './PokemonsListItemExtended.tsx';
import {
  useGetPokemonByNameQuery,
  useGetPokemonListQuery,
} from '../../shared/api/pokemonApi.ts';
import useLocalStorage from '../../shared/hooks/useLocalStorage.ts';
import { skipToken } from '@reduxjs/toolkit/query';

const PokemonsList = () => {
  const { dataFromLs } = useLocalStorage();

  const {
    data: singleData,
    isLoading: isSingleLoading,
    error: singleError,
  } = useGetPokemonByNameQuery(dataFromLs ?? skipToken);

  const {
    data: listData,
    isLoading: isListLoading,
    error: listError,
  } = useGetPokemonListQuery(undefined, { skip: !!dataFromLs });
  const previous = false;

  if (isSingleLoading || isListLoading) {
    return <div>Loading</div>;
  }

  if (singleError || listError) {
    return <div>error</div>;
  }

  const changePage = () => {};
  return (
    <table className="mt-4 w-full border border-gray-400">
      <thead className="">
        <tr className="text-lg">
          <th className="border-r border-r-gray-400 py-2">Name</th>
          <th>Description</th>
        </tr>
      </thead>
      {listData && (
        <tbody>
          {listData.results.map(({ name, url }, index) => (
            <PokemonsListItem key={index} name={name} url={url} />
          ))}
        </tbody>
      )}
      {singleData && (
        <tbody>
          <PokemonsListItemExtended pokemon={singleData} />
        </tbody>
      )}
      {listData && (
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
