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

const initialState = {
  // Blog list state
  blogs: [],
  totalBlogs: 0,
  currentPage: 1,
  totalPages: 0,
  
  // Current blog state
  currentBlog: null,
  relatedBlogs: [],
  
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
  
  // Loading states
  loading: {
    blogs: false,
    currentBlog: false,
    categories: false,
    tags: false,
    relatedBlogs: false,
    search: false
  },
  
  // Error states
  error: {
    blogs: null,
    currentBlog: null,
    categories: null,
    tags: null,
    relatedBlogs: null,
    search: null
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
  }
});

export const {
  clearCurrentBlog,
  updateFilters,
  clearFilters,
  clearErrors,
  updateBlogLikes
} = blogSlice.actions;

export default blogSlice.reducer;
