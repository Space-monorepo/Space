import axios from 'axios';

const API_URL = 'http://localhost:8000';


export const loginUser = async (formData: FormData) => {
  try {
    const response = await axios.post(`${API_URL}/users/login`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    console.log('Resposta completa do servidor:', response); // Debug
    return response.data; // Certifique-se de que o token está em `response.data`
  } catch (error) {
    throw new Error(
      error.response?.data?.detail || 'Login failed. Please check your credentials.'
    );
  }
};


export const registerUser = async (data: {
  name: string;
  email: string;
  password: string;
  profile_image_url?: string;
}) => {
  try {
    const response = await axios.post(`${API_URL}/users/signup`, {
      name: data.name,
      email: data.email,
      hashed_password: data.password,
      profile_image_url: data.profile_image_url || null, 
      reputation_level: 0, 
      badges: [], 
      communities: [], 
      saved_posts: [], 
      connections: [], 
      is_active: true, 
      created_at: new Date().toISOString(), 
      updated_at: new Date().toISOString(), 
    });
    return response.data; 
  } catch (error) {
    throw new Error(
      error.response?.data?.detail || 'Falha no cadastro. Tente novamente.'
    );
  }
};