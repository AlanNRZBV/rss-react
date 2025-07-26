import { type ChangeEvent, type FormEvent, useEffect, useState } from 'react';
import SearchBar from '../features/SearchBar/SearchBar.tsx';
import useLocalStorage from '../shared/hooks/useLocalStorage.ts';
import { Outlet } from 'react-router';
import { fetchDefaultData } from '../shared/helpers/fetchDefaultData.ts';
import PokemonsList from '../features/PokemonsList/PokemonsList.tsx';

const initialState: AppState = {
  search: '',
  defaultSearch: undefined,
  pokemon: undefined,
  error: undefined,
  isLoading: false,
  isError: false,
};

const Home = () => {
  const [app, setApp] = useState<AppState>(initialState);
  const [detailedView, setDetailedView] = useState(false);
  const { dataFromLs, setLocalState } = useLocalStorage();

  const { search, isLoading, isError, error, defaultSearch, pokemon } = app;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setApp((prevState) => ({
      ...prevState,
      [name]: value.toLowerCase().trim(),
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      setLocalState(search);
    } catch (e) {
      console.error('Caught on try - handleSubmit - ', e);
    }
  };

  useEffect(() => {
    const isDefaultResponse = (
      arg: DefaultResponse | BasicError
    ): arg is DefaultResponse => {
      return (arg as DefaultResponse) !== undefined;
    };

    const fetchAndUpdate = async () => {
      try {
        setApp((prevState) => ({ ...prevState, isLoading: true }));
        const res = await fetchDefaultData();

        if (isDefaultResponse(res)) {
          setApp((prevState) => ({
            ...prevState,
            defaultSearch: res,
            isError: false,
            isLoading: false,
          }));
          return;
        } else {
          setApp((prevState) => ({
            ...prevState,
            isLoading: false,
            isError: true,
            error: res,
          }));
        }
      } catch (e) {
        console.error('Caught on try - fetchAndUpdate -', e);
        setApp((prevState) => ({
          ...prevState,
          isLoading: false,
          isError: true,
          error: { status: 0, message: 'Unexpected error' },
        }));
      }
    };

    if (dataFromLs) {
      setApp((prevState) => ({ ...prevState, search: dataFromLs }));
      fetchAndUpdate();
      return;
    }
    fetchAndUpdate();
  }, [dataFromLs]);

  return (
    <div className="flex h-full w-full px-8 py-4">
      <div className="grow border border-blue-500">
        <SearchBar
          search={search}
          onChange={handleChange}
          onSubmit={handleSubmit}
          isLoading={isLoading}
        />
        <PokemonsList
          defaultSearch={defaultSearch}
          pokemon={pokemon}
          isLoading={isLoading}
          isError={isError}
          error={error}
        />
        <button
          onClick={() => {
            setDetailedView(!detailedView);
          }}
        >
          test
        </button>
      </div>
      <div
        className={`overflow-hidden border border-amber-600 transition-all delay-100 duration-200 ${detailedView ? 'ml-4 basis-1/2 opacity-100' : 'ml-0 basis-0 opacity-0'}`}
      >
        <div
          className={`transition-all duration-200 ${
            detailedView ? 'w-full opacity-100' : 'w-0 opacity-0'
          }`}
        >
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Home;
