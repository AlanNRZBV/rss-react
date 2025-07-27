import SearchBar from '../features/SearchBar/SearchBar.tsx';
import { Outlet } from 'react-router';
import PokemonsList from '../features/PokemonsList/PokemonsList.tsx';
import { usePokemon } from '../shared/hooks/usePokemon.ts';

const Home = () => {
  const { detailedView } = usePokemon();

  return (
    <div className="flex h-full w-full flex-col">
      <div className="grow">
        <SearchBar />
        <PokemonsList />
      </div>
      <div
        className={`overflow-hidden transition-all delay-100 duration-200 ${detailedView ? 'ml-4 basis-1/2 opacity-100' : 'ml-0 basis-0 opacity-0'}`}
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
