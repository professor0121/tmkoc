// src/redux/packages/packagesApi.js
import axiosInstance from '../../axios/axiosInstance'

// 🆕 Add a package
export const createPackageAPI = async (data) => {
    console.log(data)
  const res = await axiosInstance.post('/packages', data);
  console.log("respon sof opackage",res.data)
  return res.data;
};

// 📦 Get all packages
export const fetchPackagesAPI = async () => {
  const res = await axiosInstance.get('/packages');
  console.log(res.data)
  return res.data;
};

// 🧾 Get a single package
export const fetchPackageByIdAPI = async (id) => {
  const res = await axiosInstance.get(`/packages/${id}`);
  return res.data;
};

// ✏️ Update a package
export const updatePackageAPI = async ({ id, data }) => {
  const res = await axiosInstance.put(`/packages/${id}`, data);
  return res.data;
};

// ❌ Delete a package
export const deletePackageAPI = async (id) => {
  const res = await axiosInstance.delete(`/packages/${id}`);
  return res.data;
};
