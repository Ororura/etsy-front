import { useQuery } from '@tanstack/react-query';
import { UserType } from 'components/usersTable/types.ts'; // Обновите путь на актуальный
import { userStore } from 'core/store';
import { usersApi } from 'services/query';

const useGetUsers = () => {
  return useQuery<UserType[], Error>({
    queryKey: ['users'],
    queryFn: async () => {
      try {
        const response = await usersApi.getUserData<UserType[]>();
        if (response && response.data && response.data.length > 0) {
          userStore.setState(() => ({
            ['users']: response.data,
          }));
        } else {
          return [];
        }

        return response.data;
      } catch (error) {
        console.error('Ошибка получения данных:', error);
        throw error;
      }
    },
  });
};

export { useGetUsers };
