import { createBrowserRouter } from 'react-router';
import App from '../App.tsx';
import Home from '../../pages/Home.tsx';
import About from '../../pages/About.tsx';

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
        path: 'about',
        Component: About,
      },
    ],
  },
]);
