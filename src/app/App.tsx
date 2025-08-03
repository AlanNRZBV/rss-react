import { Outlet } from 'react-router';
import ErrorBoundary from '../shared/components/errorBoundary/ErrorBoundary.tsx';
import Navbar from '../shared/components/Navbar/Navbar.tsx';
import { useContext, useEffect } from 'react';
import { ThemeContext } from './context/themeContext.ts';

const App = () => {
  const theme = useContext(ThemeContext);
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme ? theme : 'dark');
  }, [theme]);
  return (
    <ErrorBoundary message="Error occured">
      <div className="flex h-full w-full flex-col px-8 py-4 dark:bg-gray-900">
        <Navbar />
        <Outlet />
      </div>
    </ErrorBoundary>
  );
};

export default App;
