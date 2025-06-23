// src/redux/auth/authAPI.js
import axiosInstance from '../../axios/axiosInstance';

export const loginAPI = async (userData) => {
  const res = await axiosInstance.post('/auth/login', userData);
  console.log(res)
  return res.data.user;
};

export const registerAPI = async (userData) => {
  const res = await axiosInstance.post('/auth/register', userData);
  return res.data.user;
};

export const meAPI =async () => {
  const res = await axiosInstance.get('/auth/me');
  return res.data.user;
}

export const getAllUsersAPI =async () => {
  const res = await axiosInstance.get('/auth/allusers');
  return res.data.data;
}
