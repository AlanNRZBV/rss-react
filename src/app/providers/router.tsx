import { createBrowserRouter } from 'react-router';
import App from '../App.tsx';
import Home from '../../pages/Home.tsx';
import About from '../../pages/About.tsx';
import DetailedView from '../../features/DetailedView/DetailedView.tsx';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, Component: Home },
      {
        path: ':searchString',
        Component: Home,
        children: [
          {
            path: 'pokemon/:pokemonName',
            Component: DetailedView,
          },
        ],
      },
      {
        path: 'about',
        Component: About,
      },
    ],
  },
]);
