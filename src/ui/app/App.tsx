import './App.css';
import { FC } from 'react';
import { RouterProvider } from 'react-router-dom';
import { router } from 'core/router';
import { QueryProvider } from 'core/queryClient';

const App: FC = () => {
  return (
    <QueryProvider>
      <RouterProvider router={router} />
    </QueryProvider>
  );
};

export { App };
