import { createBrowserRouter, RouteObject } from 'react-router-dom';
import { Main } from 'pages/main';

const routes: RouteObject[] = [
  {
    path: '/',
    element: <Main />,
  },
];

const router = createBrowserRouter(routes);

export { router };
