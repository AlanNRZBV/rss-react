import { Outlet } from 'react-router';
import { PokemonProvider } from './providers/PokemonProvider.tsx';

const App = () => {
  return (
    <PokemonProvider>
      <Outlet />
    </PokemonProvider>
  );
};

export default App;
