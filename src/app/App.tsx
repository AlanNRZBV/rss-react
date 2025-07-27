import { Outlet } from 'react-router';
import { PokemonProvider } from './providers/PokemonProvider.tsx';
import ErrorBoundary from '../shared/components/errorBoundary/ErrorBoundary.tsx';
import Navbar from '../shared/components/Navbar/Navbar.tsx';

const App = () => {
  return (
    <ErrorBoundary message="Error occured">
      <PokemonProvider>
        <div className="flex h-full w-full flex-col px-8 py-4">
          <Navbar />
          <Outlet />
        </div>
      </PokemonProvider>
    </ErrorBoundary>
  );
};

export default App;
