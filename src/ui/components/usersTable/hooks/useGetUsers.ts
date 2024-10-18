import { useQuery } from '@tanstack/react-query';
import { UserType } from 'components/usersTable/types.ts';
import { usersApi } from 'services/query';
import { userStore } from 'core/store';

const useGetUsers = () => {
  return useQuery({
    queryKey: [''],
    queryFn: async () => {
      const { data } = await usersApi.getUserData<UserType[]>();
      if (data && data.length > 0) {
        userStore.setState(() => {
          return {
            ['users']: data,
          };
        });
      }
    },
  });
};

export { useGetUsers };
