import { Outlet } from 'react-router';
import { ThemeContextProvider } from './providers/themeContextProvider.tsx';
import ErrorBoundary from '../shared/components/errorBoundary/ErrorBoundary.tsx';
import Navbar from '../shared/components/Navbar/Navbar.tsx';

const App = () => {
  return (
    <ErrorBoundary message="Error occured">
      <ThemeContextProvider>
        <div className="flex h-full w-full flex-col px-8 py-4">
          <Navbar />
          <Outlet />
        </div>
      </ThemeContextProvider>
    </ErrorBoundary>
  );
};

export default App;
