import { useState } from 'react';
import SearchBar from '../features/SearchBar/SearchBar.tsx';
import { Outlet } from 'react-router';
import PokemonsList from '../features/PokemonsList/PokemonsList.tsx';

const Home = () => {
  const [detailedView, setDetailedView] = useState(false);

  console.log('Home page render');

  return (
    <div className="flex h-full w-full px-8 py-4">
      <div className="grow border border-blue-500">
        <SearchBar />
        <PokemonsList />
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
