import { QueryFunctionContext } from '@tanstack/react-query';
import axios from 'axios';

const getAccessToken = () => {
  return localStorage.getItem('accessToken');
};

const clearAccessToken = () => {
  localStorage.removeItem('accessToken');
};

const defaultQueryFn = async ({ queryKey }: QueryFunctionContext) => {
  const token = getAccessToken();

  try {
    const { data } = await axios.get(`http://193.233.254.138/${queryKey}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      clearAccessToken();
      console.error('Token is invalid, cleared from storage.');
    }
    throw error;
  }
};

const usersApi = {
  getUserData: async <T>() => {
    const token = getAccessToken();
    try {
      return await axios.get<T>('http://193.233.254.138/get-all-users', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        clearAccessToken();
        console.error('Token is invalid, cleared from storage.');
      }
    }
  },

  createUser: async <T>(data: T) => {
    const token = getAccessToken();
    try {
      return await axios.post('http://193.233.254.138/create-user', data, {
        headers: { Authorization: `Bearer ${token}` },
      });
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        clearAccessToken();
        console.error('Token is invalid, cleared from storage.');
      }
    }
  },

  updateUserData: async <T>(data: T) => {
    const token = getAccessToken();
    try {
      return await axios.post('http://localhost:8000/change-user-data', data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        clearAccessToken();
        console.error('Token is invalid, cleared from storage.');
      }
    }
  },

  deleteUserData: async <T>(data: T) => {
    const token = getAccessToken();
    try {
      return await axios.delete(`http://193.233.254.138/change-user-data`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: data,
      });
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        clearAccessToken();
        console.error('Token is invalid, cleared from storage.');
      }
    }
  },
};

export { defaultQueryFn, usersApi };
