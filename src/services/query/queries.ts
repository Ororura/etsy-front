import { QueryFunctionContext } from '@tanstack/react-query';
import axios from 'axios';

const getAccessToken = () => {
  return localStorage.getItem('accessToken');
};

const getRefreshToken = () => {
  return localStorage.getItem('refreshToken');
};

const setAccessToken = (token: string) => {
  localStorage.setItem('accessToken', token);
};

const clearTokens = () => {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
};

const refreshToken = async () => {
  const refreshToken = getRefreshToken();
  if (!refreshToken) {
    throw new Error('No refresh token available');
  }

  try {
    const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/api/token_refresh`, {
      refresh: refreshToken,
    });
    setAccessToken(data.access);
    return data.access;
  } catch (error) {
    console.error('Login failed:', error);
    clearTokens();
    throw new Error('Failed to refresh token');
  }
};

const defaultQueryFn = async ({ queryKey }: QueryFunctionContext) => {
  let token = getAccessToken();

  try {
    const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/${queryKey}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      try {
        token = await refreshToken();
        const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/${queryKey}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        return data;
      } catch (refreshError) {
        clearTokens();
        console.error('Failed to refresh token, cleared tokens.', refreshError);
        throw new Error('Unauthorized');
      }
    }
    throw error;
  }
};

const usersApi = {
  getUserData: async <T>() => {
    let token = getAccessToken();
    try {
      return await axios.get<T>(`${import.meta.env.VITE_API_URL}/get-all-users`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        try {
          token = await refreshToken();
          return await axios.get<T>(`${import.meta.env.VITE_API_URL}/get-all-users`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
        } catch (refreshError) {
          console.error(refreshError);
          clearTokens();
          throw new Error('Unauthorized');
        }
      }
      throw error;
    }
  },

  createUser: async <T>(data: T) => {
    let token = getAccessToken();
    try {
      return await axios.post(`${import.meta.env.VITE_API_URL}/create-user`, data, {
        headers: { Authorization: `Bearer ${token}` },
      });
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        try {
          token = await refreshToken();
          return await axios.post(`${import.meta.env.VITE_API_URL}/create-user`, data, {
            headers: { Authorization: `Bearer ${token}` },
          });
        } catch (refreshError) {
          clearTokens();
          console.error(refreshError);
          throw new Error('Unauthorized');
        }
      }
      throw error;
    }
  },

  updateUserData: async <T>(data: T) => {
    let token = getAccessToken();
    try {
      return await axios.post(`${import.meta.env.VITE_API_URL}/change-user-data`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        try {
          token = await refreshToken();
          return await axios.post(`${import.meta.env.VITE_API_URL}/change-user-data`, data, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
        } catch (refreshError) {
          console.error(refreshError);
          clearTokens();
          throw new Error('Unauthorized');
        }
      }
      throw error;
    }
  },

  deleteUserData: async <T>(data: T) => {
    let token = getAccessToken();
    try {
      return await axios.delete(`${import.meta.env.VITE_API_URL}/change-user-data`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: data,
      });
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        try {
          token = await refreshToken();
          return await axios.delete(`${import.meta.env.VITE_API_URL}/change-user-data`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            data: data,
          });
        } catch (refreshError) {
          console.error(refreshError);
          clearTokens();
          throw new Error('Unauthorized');
        }
      }
      throw error;
    }
  },
};

export { defaultQueryFn, usersApi };
