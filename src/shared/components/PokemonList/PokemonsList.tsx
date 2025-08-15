'use client';
import { skipToken } from '@reduxjs/toolkit/query';
import { useSelector } from 'react-redux';
import { CheckIcon } from '@heroicons/react/24/outline';
import {
  pokemonApi,
  useGetPokemonByNameQuery,
  useGetPokemonListQuery,
} from '@/lib/api/pokemonApi.ts';
import useLocalStorage from '@/lib/hooks/useLocalStorage.ts';
import { selectCurrentSearchTerm } from '@/lib/features/SearchBar/searchBarSlice.ts';
import { useAppDispatch } from '@/lib/hooks.ts';
import PokemonsListItem from '@/shared/components/PokemonList/PokemonsListItem.tsx';
import PokemonsListItemExtended from '@/shared/components/PokemonList/PokemonsListItemExtended.tsx';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

const PokemonsList = () => {
  const { dataFromLs } = useLocalStorage();
  const currentSearchTerm = useSelector(selectCurrentSearchTerm);
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
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

  const changePage = (direction: 'next' | 'prev') => {
    let newOffset: number | undefined;
    if (direction === 'next' && listData?.next) {
      newOffset = extractOffset(listData.next);
    } else if (direction === 'prev' && listData?.previous) {
      newOffset = extractOffset(listData.previous);
    } else {
      return;
    }

    const newSearchParams = new URLSearchParams(searchParams.toString());

    if (newOffset !== undefined && newOffset > 0) {
      newSearchParams.set('offset', newOffset.toString());
      newSearchParams.set('limit', '10');
    } else {
      newSearchParams.delete('offset');
      newSearchParams.delete('limit');
    }

    router.push(`${pathname}?${newSearchParams.toString()}`);
  };

  const hasSingleData = !!currentSearchTerm || !!dataFromLs;
  const previous = listData?.previous;

  const isAnyLoading = isListLoading || isSingleLoading;
  const isAnyFetching = isSingleFetching || isListFetching;

  if (isAnyLoading || isAnyFetching) {
    return <div className="dark:text-gray-300">Loading</div>;
  }

  if (singleError) {
    return <div className="dark:text-gray-300">Pokemon search error</div>;
  }
  if (listError) {
    return <div className="dark:text-gray-300">Pokemon list error</div>;
  }

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
              onClick={() => {
                dispatch(pokemonApi.util.invalidateTags(['POKEMON_LIST']));
              }}
              className="mr-auto flex gap-2 rounded-md border border-black px-4 py-2 text-base font-medium uppercase dark:border-gray-400 dark:text-gray-400"
              disabled={isListLoading || isListFetching}
            >
              <span>refresh</span>
              {isListLoading ||
                (isListFetching && (
                  <svg
                    className="size-5 animate-spin"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="black"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="black"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                ))}
            </button>
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
