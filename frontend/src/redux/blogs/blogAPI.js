// src/redux/blogs/blogAPI.js
import axiosInstance from '../../axios/axiosInstance';

/**
 * Get all published blogs with filters and pagination
 */
export const getPublishedBlogs = async (params = {}) => {
  try {
    const queryParams = new URLSearchParams();
    
    // Add pagination params
    if (params.page) queryParams.append('page', params.page);
    if (params.limit) queryParams.append('limit', params.limit);
    
    // Add filter params
    if (params.category) queryParams.append('category', params.category);
    if (params.tags) queryParams.append('tags', params.tags);
    if (params.search) queryParams.append('search', params.search);
    if (params.sortBy) queryParams.append('sortBy', params.sortBy);
    if (params.sortOrder) queryParams.append('sortOrder', params.sortOrder);

    const response = await axiosInstance.get(`/blogs/public?${queryParams}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch blogs');
  }
};

/**
 * Get a published blog by slug
 */
export const getBlogBySlug = async (slug) => {
  try {
    const response = await axiosInstance.get(`/blogs/public/${slug}`);
    // console.log(response)
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch blog');
  }
};

/**
 * Get blog categories with counts
 */
export const getBlogCategories = async () => {
  try {
    const response = await axiosInstance.get('/blogs/categories');
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch categories');
  }
};

/**
 * Get popular blog tags
 */
export const getPopularTags = async (limit = 20) => {
  try {
    const response = await axiosInstance.get(`/blogs/tags?limit=${limit}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch tags');
  }
};

/**
 * Search blogs
 */
export const searchBlogs = async (query, params = {}) => {
  try {
    const queryParams = new URLSearchParams();
    queryParams.append('search', query);
    
    if (params.page) queryParams.append('page', params.page);
    if (params.limit) queryParams.append('limit', params.limit);
    if (params.category) queryParams.append('category', params.category);
    if (params.tags) queryParams.append('tags', params.tags);

    const response = await axiosInstance.get(`/blogs/public?${queryParams}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to search blogs');
  }
};

/**
 * Get related blogs for a specific blog
 */
export const getRelatedBlogs = async (blogId, limit = 5) => {
  try {
    const response = await axiosInstance.get(`/blogs/public/${blogId}/related?limit=${limit}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch related blogs');
  }
};

/**
 * Like a blog post
 */
export const likeBlog = async (blogId) => {
  try {
    const response = await axiosInstance.post(`/blogs/public/${blogId}/like`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to like blog');
  }
};
