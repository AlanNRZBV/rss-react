import { Outlet } from 'react-router';
import { PokemonProvider } from './providers/PokemonProvider.tsx';
import ErrorBoundary from '../shared/components/errorBoundary/ErrorBoundary.tsx';

const App = () => {
  return (
    <ErrorBoundary message="Error occured">
      <PokemonProvider>
        <Outlet />
      </PokemonProvider>
    </ErrorBoundary>
  );
};

export default App;
