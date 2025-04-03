import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const authService = {
  register: (email, password) => 
    axios.post(`${API_URL}/auth/register`, { email, password }),
  
  login: (email, password) => 
    axios.post(`${API_URL}/auth/login`, { email, password })
    .then(res => {
      console.log('Login response:', res.data); // Debug
      return res;
    })
    .catch(err => {
      console.error('Login error:', err.response); // Debug
      throw err;
    }),

  logout: () => localStorage.removeItem('user')
  };