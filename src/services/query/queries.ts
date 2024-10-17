import { QueryFunctionContext } from '@tanstack/react-query';
import axios from 'axios';

const defaultQueryFn = async ({ queryKey }: QueryFunctionContext) => {
  const { data } = await axios.get(`http://127.0.0.1:8000/${queryKey}`);
  return data;
};

export { defaultQueryFn };
