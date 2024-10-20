import { AxiosResponse } from 'axios';
import { useMutation } from '@tanstack/react-query';

const useMutateData = <T>(axiosFn: (data: T) => Promise<AxiosResponse | undefined>) => {
  return useMutation({
    mutationFn: (data: T) => axiosFn(data),
  });
};

export { useMutateData };
