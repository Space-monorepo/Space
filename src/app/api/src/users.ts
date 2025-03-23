import axios from 'axios';

const API_URL = 'http://localhost:8000/users';

export const getUsers = async (token: string) => {
  try {
    const response = await axios.get(`${API_URL}/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(
      (axios.isAxiosError(error) && error.response?.data?.detail) || 'Failed to fetch user data. Please try again.'
    );
  }
};

export const getUserByEmail = async (email: string, token: string) => {
  try {
    const response = await axios.get(`${API_URL}/${email}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(
      (axios.isAxiosError(error) && error.response?.data?.detail) || 'Failed to fetch user data. Please try again.'
    );
  }
};