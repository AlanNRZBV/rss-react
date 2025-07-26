import { Outlet } from 'react-router';
import { PokemonProvider } from './providers/PokemonProvider.tsx';

const App = () => {
  console.log('App render');

  return (
    <PokemonProvider>
      <Outlet />
    </PokemonProvider>
  );
};

export default App;
