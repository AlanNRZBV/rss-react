'use client';
import { useTranslations } from 'next-intl';
import {
  type ChangeEvent,
  type FC,
  type FormEvent,
  useEffect,
  useState,
} from 'react';
import useLocalStorage from '@/lib/hooks/useLocalStorage.ts';
import { useAppDispatch } from '@/lib/hooks.ts';
import {
  useLazyGetPokemonByNameQuery,
  useLazyGetPokemonListQuery,
} from '@/lib/api/pokemonApi.ts';
import { setSearchTerm } from '@/lib/features/SearchBar/searchBarSlice.ts';
import CustomButton from '@/shared/components/CustomButton/CustomButton.tsx';

const SearchBar: FC = () => {
  const [search, setSearch] = useState('');
  const t = useTranslations('HomePage');
  const { setLocalState, dataFromLs, resetLocalState } = useLocalStorage();
  const dispatch = useAppDispatch();
  const [
    triggerSingle,
    { isLoading: isSingleLoading, isFetching: isSingleFetching },
  ] = useLazyGetPokemonByNameQuery();
  const [
    triggerFetchList,
    { isLoading: isListLoading, isFetching: isListFetching },
  ] = useLazyGetPokemonListQuery();

  useEffect(() => {
    if (dataFromLs) {
      setSearch(dataFromLs);
    }
  }, [dataFromLs]);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const value = search.trim().toLowerCase();
    if (value && value !== '') {
      setLocalState(value);
      dispatch(setSearchTerm(search));
      triggerSingle(search);
      return;
    }
    resetLocalState();
    dispatch(setSearchTerm(search));
    triggerFetchList(undefined);
  };

  const changeHandle = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const isAnyLoading = isListLoading || isSingleLoading;
  const isAnyFetching = isSingleFetching || isListFetching;

  return (
    <form
      onSubmit={onSubmit}
      className="flex items-center gap-2 border-b-2 border-b-black px-4 pt-2 pb-8 dark:border-b-gray-400"
    >
      <div className="flex basis-1/2 flex-col gap-2">
        <label htmlFor="search" className="text-xl dark:text-gray-300">
          {t('search')}
        </label>
        <div className="rounded-md border border-gray-400 pl-4">
          <input
            type="text"
            id="search"
            name="search"
            className="w-full py-2 focus:outline-none dark:text-gray-100 dark:placeholder-gray-600"
            placeholder={t('searchPlaceholder')}
            value={search}
            onChange={changeHandle}
          />
        </div>
      </div>
      <div className="self-end">
        <CustomButton
          disabled={isAnyFetching || isAnyLoading}
          isLoading={isAnyFetching || isAnyLoading}
          type="submit"
          text={t('searchSubmitBtn')}
        />
      </div>
    </form>
  );
};

export default SearchBar;
