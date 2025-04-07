import axiosInstance from './axiosInstance';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const authService = {
  register: (email, password) => 
    axiosInstance.post(`${API_URL}/auth/register`, { email, password }),
  
  login: (email, password) => 
    axiosInstance.post(`${API_URL}/auth/login`, { email, password })
    .then(res => {
      const { token, user } = res.data;

        // ✅ Stocker le token et l'utilisateur
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));

      console.log('Login response:', res.data); // Debug
      return user;
    })
    .catch(err => {
      console.error('Login error:', err.response); // Debug
      throw err;
    }),

    logout: () => {
      localStorage.removeItem('user');
      localStorage.removeItem('token');

    }
  
  };