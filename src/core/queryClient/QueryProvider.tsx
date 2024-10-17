import { QueryClient, QueryClientProvider, QueryFunctionContext } from '@tanstack/react-query';
import { FC, PropsWithChildren } from 'react';

import axios from 'axios';

const defaultQueryFn = async ({ queryKey }: QueryFunctionContext) => {
  const { data } = await axios.get(`http://127.0.0.1:8000/${queryKey}`);
  return data;
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: defaultQueryFn,
    },
  },
});

const QueryProvider: FC<PropsWithChildren> = ({ children }) => {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};

export { QueryProvider };
