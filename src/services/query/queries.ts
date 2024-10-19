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
      clearAccessToken(); // Clear the token if it is invalid
      console.error('Token is invalid, cleared from storage.');
    }
    throw error; // Rethrow the error for further handling if necessary
  }
};

// API object with authorization for specific endpoints and error handling
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
        clearAccessToken(); // Clear the token if it is invalid
        console.error('Token is invalid, cleared from storage.');
      }
      throw error; // Rethrow the error for further handling if necessary
    }
  },
};

export { defaultQueryFn, usersApi };
