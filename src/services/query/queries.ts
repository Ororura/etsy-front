import { QueryFunctionContext } from '@tanstack/react-query';
import axios from 'axios';

const getAccessToken = () => localStorage.getItem('accessToken');
const getRefreshToken = () => localStorage.getItem('refreshToken');
const setAccessToken = (token: string) => localStorage.setItem('accessToken', token);
const clearTokens = () => {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
};

const refreshToken = async (): Promise<string> => {
  const refreshToken = getRefreshToken();
  if (!refreshToken) throw new Error('No refresh token available');

  const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/api/token/refresh/`, {
    refresh: refreshToken,
  });
  setAccessToken(data.access);
  return data.access;
};

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

api.interceptors.request.use(async (config) => {
  const token = getAccessToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (axios.isAxiosError(error) && error.response?.status === 401 && error.config) {
      try {
        const newToken = await refreshToken();
        error.config.headers.Authorization = `Bearer ${newToken}`;
        return api.request(error.config);
      } catch (refreshError) {
        clearTokens();
        console.error(refreshError);
        throw new Error('Unauthorized');
      }
    }
    throw error;
  },
);

const defaultQueryFn = async ({ queryKey }: QueryFunctionContext) => {
  const { data } = await api.get(`/${queryKey}`);
  return data;
};

const usersApi = {
  getUserData: async <T>() => (await api.get<T>('/get-all-users')).data,
  changeChance: async <T>(body: T) => (await api.post('/generate-url', body)).data,
  createUser: async <T>(data: T) => (await api.post('/create-user', data)).data,
  updateUserData: async <T>(data: T) => (await api.post('/change-user-data', data)).data,
  deleteUserData: async <T>(data: T) => (await api.delete('/change-user-data', { data })).data,
};

export { defaultQueryFn, usersApi };
