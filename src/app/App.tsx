import { Outlet } from 'react-router';
import ErrorBoundary from '../shared/components/errorBoundary/ErrorBoundary.tsx';
import Navbar from '../shared/components/Navbar/Navbar.tsx';
import { useContext, useEffect } from 'react';
import { ThemeContext } from './context/themeContext.ts';
import { useAppDispatch, useAppSelector } from './providers/store.ts';
import {
  clearPokemons,
  exportToCSV,
  selectPokemons,
} from '../features/PokemonsList/pokemonSlice.ts';

const App = () => {
  const theme = useContext(ThemeContext);
  const pokemons = useAppSelector(selectPokemons);
  const dispatch = useAppDispatch();
  const pokemonsCount = pokemons.length;
  const isEmpty = pokemonsCount === 0;
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme ? theme : 'dark');
  }, [theme]);

  const clearPokemonsHandle = () => {
    dispatch(clearPokemons());
  };
  const downloadHandle = () => {
    dispatch(exportToCSV());
  };

  return (
    <ErrorBoundary message="Error occured">
      <div className="flex h-full w-full flex-col px-8 py-4 dark:bg-gray-900">
        <Navbar />
        <Outlet />
        {!isEmpty && (
          <div className="mt-2 self-center rounded-md border px-8 py-4 dark:border-gray-300 dark:bg-gray-800">
            <div className="flex flex-col items-center gap-2 dark:text-gray-400">
              <span className="dark:text-gray-400">
                <b className="dark:text-gray-300">Selected: </b>
                {pokemonsCount} item(s)
              </span>
              <div className="flex gap-2">
                <button
                  onClick={clearPokemonsHandle}
                  className="rounded-md border px-4 py-2 uppercase dark:border-gray-500 dark:text-gray-300"
                >
                  deselect all
                </button>
                <button
                  onClick={downloadHandle}
                  className="rounded-md border px-4 py-2 uppercase dark:border-gray-500 dark:text-gray-300"
                >
                  download
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </ErrorBoundary>
  );
};

export default App;
