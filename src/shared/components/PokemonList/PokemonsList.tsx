'use client';
import { skipToken } from '@reduxjs/toolkit/query';
import { useSelector } from 'react-redux';
import { CheckIcon } from '@heroicons/react/24/outline';
import {
  useGetPokemonByNameQuery,
  useGetPokemonListQuery,
} from '@/lib/api/pokemonApi.ts';
import useLocalStorage from '@/lib/hooks/useLocalStorage.ts';
import { selectCurrentSearchTerm } from '@/lib/features/SearchBar/searchBarSlice.ts';
import PokemonsListItem from '@/shared/components/PokemonList/PokemonsListItem.tsx';
import PokemonsListItemExtended from '@/shared/components/PokemonList/PokemonsListItemExtended.tsx';
import { useSearchParams } from 'next/navigation';
import PokemonListControls from '@/shared/components/PokemonList/PokemonListControls.tsx';

const PokemonsList = () => {
  const { dataFromLs } = useLocalStorage();
  const currentSearchTerm = useSelector(selectCurrentSearchTerm);
  const searchParams = useSearchParams();
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

  const hasSingleData = !!currentSearchTerm || !!dataFromLs;
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
      <PokemonListControls
        isListFetching={isListFetching}
        isListLoading={isListLoading}
        currentSearchTerm={currentSearchTerm}
        dataFromLs={dataFromLs}
        hasSingleData={hasSingleData}
        offset={offset}
        listData={listData}
      />
    </table>
  );
};

export default PokemonsList;
