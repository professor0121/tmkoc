// src/redux/axios/axiosInstance.js
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000/api', // ✅ Set your backend base URL
  withCredentials: true,                // 🔐 For cookies (e.g., JWT in cookies)
  headers: {
    'Content-Type': 'application/json',
  },
});

// ✅ Optional: Add interceptor to include token from localStorage
axiosInstance.interceptors.request.use((config) => {
  const user = JSON.parse(localStorage.getItem('user'));
  if (user?.token) {
    config.headers.Authorization = `Bearer ${user.token}`;
  }
  return config;
});

export default axiosInstance;
