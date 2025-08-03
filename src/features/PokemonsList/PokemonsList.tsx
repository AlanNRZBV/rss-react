import PokemonsListItem from './PokemonsListItem.tsx';
import PokemonsListItemExtended from './PokemonsListItemExtended.tsx';
import {
  useGetPokemonByNameQuery,
  useGetPokemonListQuery,
} from '../../shared/api/pokemonApi.ts';
import useLocalStorage from '../../shared/hooks/useLocalStorage.ts';
import { skipToken } from '@reduxjs/toolkit/query';
import { selectCurrentSearchTerm } from '../SearchBar/searchSlice.ts';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router';
import { CheckIcon } from '@heroicons/react/24/outline';

const PokemonsList = () => {
  const { dataFromLs } = useLocalStorage();
  const currentSearchTerm = useSelector(selectCurrentSearchTerm);
  const [searchParams, setSearchParams] = useSearchParams();
  const offset = searchParams.get('offset')
    ? parseInt(searchParams.get('offset') as string, 10)
    : undefined;
  const queryArg = currentSearchTerm ?? dataFromLs ?? skipToken;

  const {
    data: singleData,
    isLoading: isSingleLoading,
    isFetching: isSingleFetching,
    error: singleError,
  } = useGetPokemonByNameQuery(queryArg, {
    skip: !currentSearchTerm && !dataFromLs,
    refetchOnMountOrArgChange: true,
  });

  const {
    data: listData,
    isLoading: isListLoading,
    isFetching: isListFetching,
    error: listError,
  } = useGetPokemonListQuery(offset, {
    skip: !!currentSearchTerm || !!dataFromLs,
    refetchOnMountOrArgChange: true,
  });

  const extractOffset = (url: string | null): number | undefined => {
    if (!url) return undefined;
    const params = new URL(url).searchParams;
    return parseInt(params.get('offset') || '0', 10);
  };

  const hasSingleData = !!currentSearchTerm || !!dataFromLs;
  const previous = listData?.previous;

  const isAnyLoading = isListLoading || isSingleLoading;
  const isAnyFetching = isSingleFetching || isListFetching;

  if (isAnyLoading || isAnyFetching) {
    return <div className="dark:text-gray-300">Loading</div>;
  }

  if (singleError) {
    return <div className="dark:text-gray-300">Ошибка поиска покемона </div>;
  }
  if (listError) {
    return <div className="dark:text-gray-300">Ошибка загрузки списка</div>;
  }

  const changePage = (direction: 'next' | 'prev') => {
    let newOffset: number | undefined;
    if (direction === 'next' && listData?.next) {
      newOffset = extractOffset(listData.next);
    } else if (direction === 'prev' && listData?.previous) {
      newOffset = extractOffset(listData.previous);
    } else {
      return;
    }
    if (newOffset !== undefined) {
      setSearchParams({ offset: newOffset.toString() });
    } else {
      setSearchParams({});
    }
  };
  return (
    <table className="mt-4 w-full border border-gray-400">
      <thead className="bg-gray-100 dark:bg-gray-800">
        <tr className="text-lg dark:text-gray-300">
          <th>
            <CheckIcon className="mx-auto h-[16px]" />
          </th>
          <th className="border-x border-x-gray-400 py-2">Name</th>
          <th>Description</th>
        </tr>
      </thead>
      {!hasSingleData && listData && (
        <tbody>
          {listData.results.map(({ name, url }, index) => (
            <PokemonsListItem key={index} name={name} url={url} />
          ))}
        </tbody>
      )}
      {hasSingleData && singleData && (
        <tbody>
          <PokemonsListItemExtended pokemon={singleData} />
        </tbody>
      )}
      {!hasSingleData && listData && (
        <caption className="caption-bottom">
          <div className="mt-2 flex justify-center gap-2">
            <button
              onClick={() => changePage('prev')}
              className={`rounded-md border px-4 py-2 text-base font-medium uppercase ${previous ? 'border-black text-black dark:border-gray-400 dark:text-gray-400' : 'border-gray-400 text-gray-400 dark:border-black dark:text-black'}`}
            >
              previous
            </button>
            <button
              onClick={() => changePage('next')}
              className="rounded-md border border-black px-4 py-2 text-base font-medium uppercase dark:border-gray-400 dark:text-gray-400"
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
