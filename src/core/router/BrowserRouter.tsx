import { createBrowserRouter, RouteObject } from 'react-router-dom';
import { Main } from 'pages/main';
import { Auth } from 'pages/auth';

const routes: RouteObject[] = [
  {
    path: '/',
    element: <Main />,
  },
  {
    path: '/login',
    element: <Auth />,
  },
];

const router = createBrowserRouter(routes);

export { router };
