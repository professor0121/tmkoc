// src/redux/blogs/blogSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as blogAPI from './blogAPI';

// Async thunks
export const fetchPublishedBlogs = createAsyncThunk(
  'blogs/fetchPublishedBlogs',
  async (params, { rejectWithValue }) => {
    try {
      const response = await blogAPI.getPublishedBlogs(params);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchBlogBySlug = createAsyncThunk(
  'blogs/fetchBlogBySlug',
  async (slug, { rejectWithValue }) => {
    try {
      const response = await blogAPI.getBlogBySlug(slug);
      // console.log(response)
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchBlogCategories = createAsyncThunk(
  'blogs/fetchBlogCategories',
  async (_, { rejectWithValue }) => {
    try {
      const response = await blogAPI.getBlogCategories();
      // console.log("slide",response)
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchPopularTags = createAsyncThunk(
  'blogs/fetchPopularTags',
  async (limit, { rejectWithValue }) => {
    try {
      const response = await blogAPI.getPopularTags(limit);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const searchBlogsThunk = createAsyncThunk(
  'blogs/searchBlogs',
  async ({ query, params }, { rejectWithValue }) => {
    try {
      const response = await blogAPI.searchBlogs(query, params);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchRelatedBlogs = createAsyncThunk(
  'blogs/fetchRelatedBlogs',
  async ({ blogId, limit }, { rejectWithValue }) => {
    try {
      const response = await blogAPI.getRelatedBlogs(blogId, limit);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const likeBlogThunk = createAsyncThunk(
  'blogs/likeBlog',
  async (blogId, { rejectWithValue }) => {
    try {
      const response = await blogAPI.likeBlog(blogId);
      return { blogId, ...response };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// ============================================================================
// ADMIN ASYNC THUNKS
// ============================================================================

export const fetchAllBlogs = createAsyncThunk(
  'blogs/fetchAllBlogs',
  async (params, { rejectWithValue }) => {
    try {
      const response = await blogAPI.getAllBlogs(params);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchBlogById = createAsyncThunk(
  'blogs/fetchBlogById',
  async (blogId, { rejectWithValue }) => {
    try {
      const response = await blogAPI.getBlogById(blogId);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const createBlog = createAsyncThunk(
  'blogs/createBlog',
  async (blogData, { rejectWithValue }) => {
    try {
      const response = await blogAPI.createBlog(blogData);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateBlog = createAsyncThunk(
  'blogs/updateBlog',
  async ({ blogId, blogData }, { rejectWithValue }) => {
    try {
      const response = await blogAPI.updateBlog(blogId, blogData);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteBlog = createAsyncThunk(
  'blogs/deleteBlog',
  async (blogId, { rejectWithValue }) => {
    try {
      const response = await blogAPI.deleteBlog(blogId);
      return { blogId, ...response };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const uploadBlogImage = createAsyncThunk(
  'blogs/uploadBlogImage',
  async ({ imageFile, blogId }, { rejectWithValue }) => {
    try {
      const response = await blogAPI.uploadBlogImage(imageFile, blogId);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const bulkDeleteBlogs = createAsyncThunk(
  'blogs/bulkDeleteBlogs',
  async (blogIds, { rejectWithValue }) => {
    try {
      const response = await blogAPI.bulkDeleteBlogs(blogIds);
      return { blogIds, ...response };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateBlogStatus = createAsyncThunk(
  'blogs/updateBlogStatus',
  async ({ blogId, status }, { rejectWithValue }) => {
    try {
      const response = await blogAPI.updateBlogStatus(blogId, status);
      return { blogId, status, ...response };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchBlogStatistics = createAsyncThunk(
  'blogs/fetchBlogStatistics',
  async (_, { rejectWithValue }) => {
    try {
      const response = await blogAPI.getBlogStatistics();
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  // Blog list state
  blogs: [],
  totalBlogs: 0,
  currentPage: 1,
  totalPages: 0,

  // Current blog state
  currentBlog: null,
  relatedBlogs: [],

  // Admin blog management
  allBlogs: [], // All blogs including drafts (admin only)
  selectedBlogs: [], // For bulk operations
  blogStatistics: null,
  uploadedImages: [], // Uploaded image URLs

  // Categories and tags
  categories: [],
  popularTags: [],

  // Filters
  filters: {
    category: '',
    tags: [],
    search: '',
    sortBy: 'publishedAt',
    sortOrder: 'desc'
  },

  // Admin filters
  adminFilters: {
    status: '',
    author: '',
    category: '',
    search: '',
    sortBy: 'createdAt',
    sortOrder: 'desc'
  },

  // Loading states
  loading: {
    blogs: false,
    currentBlog: false,
    categories: false,
    tags: false,
    relatedBlogs: false,
    search: false,
    allBlogs: false,
    creating: false,
    updating: false,
    deleting: false,
    uploading: false,
    statistics: false
  },

  // Error states
  error: {
    blogs: null,
    currentBlog: null,
    categories: null,
    tags: null,
    relatedBlogs: null,
    search: null,
    allBlogs: null,
    creating: null,
    updating: null,
    deleting: null,
    uploading: null,
    statistics: null
  }
};

const blogSlice = createSlice({
  name: 'blogs',
  initialState,
  reducers: {
    // Clear current blog
    clearCurrentBlog: (state) => {
      state.currentBlog = null;
      state.relatedBlogs = [];
      state.error.currentBlog = null;
      state.error.relatedBlogs = null;
    },
    
    // Update filters
    updateFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    
    // Clear filters
    clearFilters: (state) => {
      state.filters = {
        category: '',
        tags: [],
        search: '',
        sortBy: 'publishedAt',
        sortOrder: 'desc'
      };
    },
    
    // Clear errors
    clearErrors: (state) => {
      state.error = {
        blogs: null,
        currentBlog: null,
        categories: null,
        tags: null,
        relatedBlogs: null,
        search: null
      };
    },
    
    // Update blog likes locally
    updateBlogLikes: (state, action) => {
      const { blogId, likes } = action.payload;

      // Update in blogs list
      const blogIndex = state.blogs.findIndex(blog => blog._id === blogId);
      if (blogIndex !== -1) {
        state.blogs[blogIndex].likes = likes;
      }

      // Update current blog
      if (state.currentBlog && state.currentBlog._id === blogId) {
        state.currentBlog.likes = likes;
      }

      // Update in related blogs
      const relatedIndex = state.relatedBlogs.findIndex(blog => blog._id === blogId);
      if (relatedIndex !== -1) {
        state.relatedBlogs[relatedIndex].likes = likes;
      }

      // Update in all blogs (admin)
      const allBlogIndex = state.allBlogs.findIndex(blog => blog._id === blogId);
      if (allBlogIndex !== -1) {
        state.allBlogs[allBlogIndex].likes = likes;
      }
    },

    // Admin-specific reducers
    updateAdminFilters: (state, action) => {
      state.adminFilters = { ...state.adminFilters, ...action.payload };
    },

    clearAdminFilters: (state) => {
      state.adminFilters = {
        status: '',
        author: '',
        category: '',
        search: '',
        sortBy: 'createdAt',
        sortOrder: 'desc'
      };
    },

    selectBlog: (state, action) => {
      const blogId = action.payload;
      if (!state.selectedBlogs.includes(blogId)) {
        state.selectedBlogs.push(blogId);
      }
    },

    deselectBlog: (state, action) => {
      const blogId = action.payload;
      state.selectedBlogs = state.selectedBlogs.filter(id => id !== blogId);
    },

    selectAllBlogs: (state) => {
      state.selectedBlogs = state.allBlogs.map(blog => blog._id);
    },

    clearSelectedBlogs: (state) => {
      state.selectedBlogs = [];
    },

    addUploadedImage: (state, action) => {
      state.uploadedImages.push(action.payload);
    },

    removeUploadedImage: (state, action) => {
      const imageUrl = action.payload;
      state.uploadedImages = state.uploadedImages.filter(url => url !== imageUrl);
    },

    clearUploadedImages: (state) => {
      state.uploadedImages = [];
    }
  },
  extraReducers: (builder) => {
    // Fetch published blogs
    builder
      .addCase(fetchPublishedBlogs.pending, (state) => {
        state.loading.blogs = true;
        state.error.blogs = null;
      })
      .addCase(fetchPublishedBlogs.fulfilled, (state, action) => {
        state.loading.blogs = false;
        state.blogs = action.payload.data.blogs;
        state.totalBlogs = action.payload.data.total;
        state.currentPage = action.payload.data.page;
        state.totalPages = action.payload.data.totalPages;
      })
      .addCase(fetchPublishedBlogs.rejected, (state, action) => {
        state.loading.blogs = false;
        state.error.blogs = action.payload;
      });

    // Fetch blog by slug
    builder
      .addCase(fetchBlogBySlug.pending, (state) => {
        state.loading.currentBlog = true;
        state.error.currentBlog = null;
      })
      .addCase(fetchBlogBySlug.fulfilled, (state, action) => {
        state.loading.currentBlog = false;
        state.currentBlog = action.payload.data;
      })
      .addCase(fetchBlogBySlug.rejected, (state, action) => {
        state.loading.currentBlog = false;
        state.error.currentBlog = action.payload;
      });

    // Fetch categories
    builder
      .addCase(fetchBlogCategories.pending, (state) => {
        state.loading.categories = true;
        state.error.categories = null;
      })
      .addCase(fetchBlogCategories.fulfilled, (state, action) => {
        state.loading.categories = false;
        state.categories = action.payload.data;
      })
      .addCase(fetchBlogCategories.rejected, (state, action) => {
        state.loading.categories = false;
        state.error.categories = action.payload;
      });

    // Fetch popular tags
    builder
      .addCase(fetchPopularTags.pending, (state) => {
        state.loading.tags = true;
        state.error.tags = null;
      })
      .addCase(fetchPopularTags.fulfilled, (state, action) => {
        state.loading.tags = false;
        state.popularTags = action.payload.data;
      })
      .addCase(fetchPopularTags.rejected, (state, action) => {
        state.loading.tags = false;
        state.error.tags = action.payload;
      });

    // Search blogs
    builder
      .addCase(searchBlogsThunk.pending, (state) => {
        state.loading.search = true;
        state.error.search = null;
      })
      .addCase(searchBlogsThunk.fulfilled, (state, action) => {
        state.loading.search = false;
        state.blogs = action.payload.data.blogs;
        state.totalBlogs = action.payload.data.total;
        state.currentPage = action.payload.data.page;
        state.totalPages = action.payload.data.totalPages;
      })
      .addCase(searchBlogsThunk.rejected, (state, action) => {
        state.loading.search = false;
        state.error.search = action.payload;
      });

    // Fetch related blogs
    builder
      .addCase(fetchRelatedBlogs.pending, (state) => {
        state.loading.relatedBlogs = true;
        state.error.relatedBlogs = null;
      })
      .addCase(fetchRelatedBlogs.fulfilled, (state, action) => {
        state.loading.relatedBlogs = false;
        state.relatedBlogs = action.payload.data;
      })
      .addCase(fetchRelatedBlogs.rejected, (state, action) => {
        state.loading.relatedBlogs = false;
        state.error.relatedBlogs = action.payload;
      });

    // Like blog
    builder
      .addCase(likeBlogThunk.fulfilled, (state, action) => {
        const { blogId, data } = action.payload;
        // Update likes count locally
        state.updateBlogLikes = { blogId, likes: data.likes };
      });

    // ========================================================================
    // ADMIN EXTRA REDUCERS
    // ========================================================================

    // Fetch all blogs (admin)
    builder
      .addCase(fetchAllBlogs.pending, (state) => {
        state.loading.allBlogs = true;
        state.error.allBlogs = null;
      })
      .addCase(fetchAllBlogs.fulfilled, (state, action) => {
        state.loading.allBlogs = false;
        state.allBlogs = action.payload.data.blogs;
        state.totalBlogs = action.payload.data.total;
        state.currentPage = action.payload.data.page;
        state.totalPages = action.payload.data.totalPages;
      })
      .addCase(fetchAllBlogs.rejected, (state, action) => {
        state.loading.allBlogs = false;
        state.error.allBlogs = action.payload;
      });

    // Fetch blog by ID (admin)
    builder
      .addCase(fetchBlogById.pending, (state) => {
        state.loading.currentBlog = true;
        state.error.currentBlog = null;
      })
      .addCase(fetchBlogById.fulfilled, (state, action) => {
        state.loading.currentBlog = false;
        state.currentBlog = action.payload.data;
      })
      .addCase(fetchBlogById.rejected, (state, action) => {
        state.loading.currentBlog = false;
        state.error.currentBlog = action.payload;
      });

    // Create blog
    builder
      .addCase(createBlog.pending, (state) => {
        state.loading.creating = true;
        state.error.creating = null;
      })
      .addCase(createBlog.fulfilled, (state, action) => {
        state.loading.creating = false;
        state.allBlogs.unshift(action.payload.data);
        state.totalBlogs += 1;
      })
      .addCase(createBlog.rejected, (state, action) => {
        state.loading.creating = false;
        state.error.creating = action.payload;
      });

    // Update blog
    builder
      .addCase(updateBlog.pending, (state) => {
        state.loading.updating = true;
        state.error.updating = null;
      })
      .addCase(updateBlog.fulfilled, (state, action) => {
        state.loading.updating = false;
        const updatedBlog = action.payload.data;

        // Update in all blogs list
        const allBlogIndex = state.allBlogs.findIndex(blog => blog._id === updatedBlog._id);
        if (allBlogIndex !== -1) {
          state.allBlogs[allBlogIndex] = updatedBlog;
        }

        // Update current blog if it's the same
        if (state.currentBlog && state.currentBlog._id === updatedBlog._id) {
          state.currentBlog = updatedBlog;
        }
      })
      .addCase(updateBlog.rejected, (state, action) => {
        state.loading.updating = false;
        state.error.updating = action.payload;
      });

    // Delete blog
    builder
      .addCase(deleteBlog.pending, (state) => {
        state.loading.deleting = true;
        state.error.deleting = null;
      })
      .addCase(deleteBlog.fulfilled, (state, action) => {
        state.loading.deleting = false;
        const { blogId } = action.payload;

        // Remove from all blogs list
        state.allBlogs = state.allBlogs.filter(blog => blog._id !== blogId);
        state.totalBlogs -= 1;

        // Remove from selected blogs
        state.selectedBlogs = state.selectedBlogs.filter(id => id !== blogId);

        // Clear current blog if it's the deleted one
        if (state.currentBlog && state.currentBlog._id === blogId) {
          state.currentBlog = null;
        }
      })
      .addCase(deleteBlog.rejected, (state, action) => {
        state.loading.deleting = false;
        state.error.deleting = action.payload;
      });

    // Upload blog image
    builder
      .addCase(uploadBlogImage.pending, (state) => {
        state.loading.uploading = true;
        state.error.uploading = null;
      })
      .addCase(uploadBlogImage.fulfilled, (state, action) => {
        state.loading.uploading = false;
        state.uploadedImages.push(action.payload.data.imageUrl);
      })
      .addCase(uploadBlogImage.rejected, (state, action) => {
        state.loading.uploading = false;
        state.error.uploading = action.payload;
      });

    // Bulk delete blogs
    builder
      .addCase(bulkDeleteBlogs.pending, (state) => {
        state.loading.deleting = true;
        state.error.deleting = null;
      })
      .addCase(bulkDeleteBlogs.fulfilled, (state, action) => {
        state.loading.deleting = false;
        const { blogIds } = action.payload;

        // Remove from all blogs list
        state.allBlogs = state.allBlogs.filter(blog => !blogIds.includes(blog._id));
        state.totalBlogs -= blogIds.length;

        // Clear selected blogs
        state.selectedBlogs = [];
      })
      .addCase(bulkDeleteBlogs.rejected, (state, action) => {
        state.loading.deleting = false;
        state.error.deleting = action.payload;
      });

    // Update blog status
    builder
      .addCase(updateBlogStatus.fulfilled, (state, action) => {
        const { blogId, status } = action.payload;

        // Update in all blogs list
        const allBlogIndex = state.allBlogs.findIndex(blog => blog._id === blogId);
        if (allBlogIndex !== -1) {
          state.allBlogs[allBlogIndex].status = status;
        }

        // Update current blog if it's the same
        if (state.currentBlog && state.currentBlog._id === blogId) {
          state.currentBlog.status = status;
        }
      });

    // Fetch blog statistics
    builder
      .addCase(fetchBlogStatistics.pending, (state) => {
        state.loading.statistics = true;
        state.error.statistics = null;
      })
      .addCase(fetchBlogStatistics.fulfilled, (state, action) => {
        state.loading.statistics = false;
        state.blogStatistics = action.payload.data;
      })
      .addCase(fetchBlogStatistics.rejected, (state, action) => {
        state.loading.statistics = false;
        state.error.statistics = action.payload;
      });
  }
});

export const {
  clearCurrentBlog,
  updateFilters,
  clearFilters,
  clearErrors,
  updateBlogLikes,
  updateAdminFilters,
  clearAdminFilters,
  selectBlog,
  deselectBlog,
  selectAllBlogs,
  clearSelectedBlogs,
  addUploadedImage,
  removeUploadedImage,
  clearUploadedImages
} = blogSlice.actions;

export default blogSlice.reducer;
