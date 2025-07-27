import { createBrowserRouter } from 'react-router';
import App from '../App.tsx';
import Home from '../../pages/Home.tsx';
import About from '../../pages/About.tsx';
import DetailedView from '../../features/DetailedView/DetailedView.tsx';
import NotFound from '../../pages/NotFound.tsx';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: '/details',
        Component: Home,
        children: [
          {
            path: ':name',
            Component: DetailedView,
          },
        ],
      },
      {
        path: ':name',
        Component: Home,
        children: [
          {
            path: 'extended',
            Component: DetailedView,
          },
        ],
      },
      {
        path: 'about',
        Component: About,
      },
      { path: '*', Component: NotFound },
    ],
  },
]);
