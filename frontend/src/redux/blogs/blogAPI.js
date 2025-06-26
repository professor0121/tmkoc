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

// ============================================================================
// ADMIN BLOG API FUNCTIONS
// ============================================================================

/**
 * Get all blogs (admin only) - includes drafts and archived
 */
export const getAllBlogs = async (params = {}) => {
  try {
    const queryParams = new URLSearchParams();

    // Add pagination params
    if (params.page) queryParams.append('page', params.page);
    if (params.limit) queryParams.append('limit', params.limit);

    // Add filter params
    if (params.status) queryParams.append('status', params.status);
    if (params.category) queryParams.append('category', params.category);
    if (params.author) queryParams.append('author', params.author);
    if (params.search) queryParams.append('search', params.search);
    if (params.sortBy) queryParams.append('sortBy', params.sortBy);
    if (params.sortOrder) queryParams.append('sortOrder', params.sortOrder);

    const response = await axiosInstance.get(`/blogs?${queryParams}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch blogs');
  }
};

/**
 * Get blog by ID (admin only) - any status
 */
export const getBlogById = async (blogId) => {
  try {
    const response = await axiosInstance.get(`/blogs/${blogId}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch blog');
  }
};

/**
 * Create a new blog post (admin only)
 */
export const createBlog = async (blogData) => {
  try {
    console.log("blogData in createBlog", blogData);
    const response = await axiosInstance.post('/blogs', blogData);
      console.log("response in createBlog",response)

    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to create blog');
  }
};

/**
 * Update a blog post (admin only)
 */
export const updateBlog = async (blogId, blogData) => {
  try {
    const response = await axiosInstance.put(`/blogs/${blogId}`, blogData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to update blog');
  }
};

/**
 * Delete a blog post (admin only)
 */
export const deleteBlog = async (blogId) => {
  try {
    const response = await axiosInstance.delete(`/blogs/${blogId}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to delete blog');
  }
};

/**
 * Upload blog image (admin only)
 */
export const uploadBlogImage = async (imageFile, blogId = null) => {
  try {
    const formData = new FormData();
    formData.append('image', imageFile);
    if (blogId) {
      formData.append('blogId', blogId);
    }

    const response = await axiosInstance.post('/blogs/upload-image', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to upload image');
  }
};

/**
 * Bulk delete blogs (admin only)
 */
export const bulkDeleteBlogs = async (blogIds) => {
  try {
    const response = await axiosInstance.delete('/blogs/bulk', {
      data: { blogIds }
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to delete blogs');
  }
};

/**
 * Update blog status (admin only)
 */
export const updateBlogStatus = async (blogId, status) => {
  try {
    const response = await axiosInstance.patch(`/blogs/${blogId}/status`, { status });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to update blog status');
  }
};

/**
 * Get blog statistics (admin only)
 */
export const getBlogStatistics = async () => {
  try {
    const response = await axiosInstance.get('/blogs/statistics');
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch blog statistics');
  }
};
