import {
  type ChangeEvent,
  type FC,
  type FormEvent,
  useEffect,
  useState,
} from 'react';
import {
  useLazyGetPokemonByNameQuery,
  useLazyGetPokemonListQuery,
} from '../../shared/api/pokemonApi.ts';
import useLocalStorage from '../../shared/hooks/useLocalStorage.ts';
import { setSearchTerm } from './searchSlice.ts';
import { useAppDispatch } from '../../app/providers/store.ts';

const SearchBar: FC = () => {
  const [search, setSearch] = useState('');
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
    if (value) {
      setLocalState(value);
      dispatch(setSearchTerm(search));
      triggerSingle(search);
      return;
    }
    resetLocalState();
    console.log('data', search);
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
      className="flex items-center gap-2 border-b-2 border-b-black px-4 pt-2 pb-8"
    >
      <div className="flex basis-1/2 flex-col gap-2">
        <label htmlFor="search" className="text-xl">
          Search
        </label>
        <div className="rounded-md border border-gray-400 pl-4">
          <input
            type="text"
            id="search"
            name="search"
            className="w-full py-2 focus:outline-none"
            placeholder="type here"
            value={search}
            onChange={changeHandle}
          />
        </div>
      </div>
      <button
        type="submit"
        disabled={isAnyFetching || isAnyLoading}
        className="flex items-center gap-0.5 self-end rounded-md border border-gray-400 bg-gray-100 px-4 py-2 font-medium uppercase"
      >
        <span>submit</span>
        {(isAnyFetching || isAnyLoading) && (
          <svg
            className="mr-3 -ml-1 size-5 animate-spin text-white"
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
        )}
      </button>
    </form>
  );
};

export default SearchBar;
