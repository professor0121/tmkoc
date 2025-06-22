// src/redux/destinations/destinationApi.js
import axiosInstance from '../../axios/axiosInstance';

// Get all destinations with optional filters
export const getAllDestinationsAPI = async (params = {}) => {
  const res = await axiosInstance.get('/destinations', { params });
//   console.log("get all destination",res.data.data.destinations)
  return res.data.data;
};

// Get destination by ID
export const getDestinationByIdAPI = async (id) => {
  const res = await axiosInstance.get(`/destinations/${id}`);
  console.log("get destination by id",res.data)
  return res.data;
};

// Get destinations by category
export const getDestinationsByCategoryAPI = async (category) => {
  const res = await axiosInstance.get(`/destinations/category/${category}`);
  console.log("get destination by category",res.data)
  return res.data.destinations;
};

// Get featured destinations
export const getFeaturedDestinationsAPI = async () => {
  const res = await axiosInstance.get('/destinations/featured');
  console.log("get featured destinations",res.data.data)
  return res.data.data;
};

// Get popular destinations
export const getPopularDestinationsAPI = async () => {
  const res = await axiosInstance.get('/destinations/popular');
  console.log("get popular destinations",res.data)
  return res.data.destinations;
};

// Search destinations
export const searchDestinationsAPI = async (searchText) => {
  const res = await axiosInstance.get('/destinations/search', {
    params: { q: searchText }
  });
  console.log("search destinations",res.data)
  return res.data.destinations;
};

// Get destinations by location
export const getDestinationsByLocationAPI = async (locationParams) => {
  const res = await axiosInstance.get('/destinations/location', {
    params: locationParams
  });
  console.log("get destinations by location",res.data)
  return res.data.destinations;
};

// Get nearby destinations
export const getNearbyDestinationsAPI = async (destinationId, maxDistance = 100) => {
  const res = await axiosInstance.get(`/destinations/${destinationId}/nearby`, {
    params: { maxDistance }
  });
  return res.data.destinations;
};

// Get destination statistics
export const getDestinationStatisticsAPI = async () => {
  const res = await axiosInstance.get('/destinations/statistics');
  return res.data.statistics;
};

// Create new destination (Admin only)
export const createDestinationAPI = async (destinationData) => {
  const res = await axiosInstance.post('/destinations', destinationData);
  return res.data.destination;
};

// Update destination (Admin only)
export const updateDestinationAPI = async (id, destinationData) => {
  const res = await axiosInstance.put(`/destinations/${id}`, destinationData);
  return res.data.destination;
};

// Delete destination (Admin only)
export const deleteDestinationAPI = async (id) => {
  const res = await axiosInstance.delete(`/destinations/${id}`);
  return res.data.destination;
};

// Add review to destination
export const addDestinationReviewAPI = async (destinationId, reviewData) => {
  const res = await axiosInstance.post(`/destinations/${destinationId}/reviews`, reviewData);
  return res.data.destination;
};

// Toggle featured status (Admin only)
export const toggleFeaturedStatusAPI = async (id, featured) => {
  const res = await axiosInstance.patch(`/destinations/${id}/featured`, { featured });
  return res.data.destination;
};