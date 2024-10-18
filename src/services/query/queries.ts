import { QueryFunctionContext } from '@tanstack/react-query';
import axios from 'axios';

const defaultQueryFn = async ({ queryKey }: QueryFunctionContext) => {
  const { data } = await axios.get(`http://127.0.0.1:8000/${queryKey}`);
  return data;
};

const usersApi = {
  getUserData: async <T>() => {
    return await axios.get<T>('http://127.0.0.1:8000/get-all-users');
  },
};

export { defaultQueryFn, usersApi };
