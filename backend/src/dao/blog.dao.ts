import Blog, { IBlog } from '../models/Blog';
import { Types } from 'mongoose';

// Interface for blog creation
export interface CreateBlogData {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featuredImage: string;
  author: string;
  category: string;
  tags?: string[];
  status?: 'draft' | 'published' | 'archived';
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    keywords?: string[];
  };
}

// Interface for blog update
export interface UpdateBlogData {
  title?: string;
  slug?: string;
  excerpt?: string;
  content?: string;
  featuredImage?: string;
  category?: string;
  tags?: string[];
  status?: 'draft' | 'published' | 'archived';
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    keywords?: string[];
  };
}

// Interface for blog query filters
export interface BlogFilters {
  status?: 'draft' | 'published' | 'archived';
  category?: string;
  tags?: string[];
  author?: string;
  search?: string;
}

// Interface for pagination
export interface PaginationOptions {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

/**
 * Create a new blog post
 */
export const createBlog = async (blogData: CreateBlogData): Promise<IBlog> => {
  try {
    const blog = new Blog(blogData);
    
    // Calculate read time based on content
    if (blog.content) {
      const wordCount = blog.content.split(/\s+/).length;
      blog.readTime = Math.ceil(wordCount / 200); // 200 words per minute
    }
    
    return await blog.save();
  } catch (error: any) {
    throw new Error(`Error creating blog: ${error.message}`);
  }
};

/**
 * Find blog by ID
 */
export const findBlogById = async (id: string): Promise<IBlog | null> => {
  try {
    if (!Types.ObjectId.isValid(id)) {
      return null;
    }
    return await Blog.findById(id).populate('author', 'name email').exec();
  } catch (error: any) {
    throw new Error(`Error finding blog by ID: ${error.message}`);
  }
};

/**
 * Find blog by slug
 */
export const findBlogBySlug = async (slug: string): Promise<IBlog | null> => {
  try {
    return await Blog.findOne({ slug }).populate('author', 'name email').exec();
  } catch (error: any) {
    throw new Error(`Error finding blog by slug: ${error.message}`);
  }
};

/**
 * Update blog by ID
 */
export const updateBlogById = async (id: string, updateData: UpdateBlogData): Promise<IBlog | null> => {
  try {
    if (!Types.ObjectId.isValid(id)) {
      return null;
    }
    
    // Recalculate read time if content is updated
    if (updateData.content) {
      const wordCount = updateData.content.split(/\s+/).length;
      (updateData as any).readTime = Math.ceil(wordCount / 200);
    }
    
    return await Blog.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    ).populate('author', 'name email').exec();
  } catch (error: any) {
    throw new Error(`Error updating blog: ${error.message}`);
  }
};

/**
 * Delete blog by ID
 */
export const deleteBlogById = async (id: string): Promise<IBlog | null> => {
  try {
    if (!Types.ObjectId.isValid(id)) {
      return null;
    }
    return await Blog.findByIdAndDelete(id).exec();
  } catch (error: any) {
    throw new Error(`Error deleting blog: ${error.message}`);
  }
};

/**
 * Get all blogs with filters and pagination
 */
export const getAllBlogs = async (
  filters: BlogFilters = {},
  pagination: PaginationOptions = {}
): Promise<{ blogs: IBlog[]; total: number; page: number; totalPages: number }> => {
  try {
    const {
      page = 1,
      limit = 10,
      sortBy = 'createdAt',
      sortOrder = 'desc'
    } = pagination;

    // Build query
    const query: any = {};

    if (filters.status) {
      query.status = filters.status;
    }

    if (filters.category) {
      query.category = filters.category;
    }

    if (filters.tags && filters.tags.length > 0) {
      query.tags = { $in: filters.tags };
    }

    if (filters.author) {
      query.author = filters.author;
    }

    if (filters.search) {
      query.$or = [
        { title: { $regex: filters.search, $options: 'i' } },
        { excerpt: { $regex: filters.search, $options: 'i' } },
        { content: { $regex: filters.search, $options: 'i' } },
        { tags: { $in: [new RegExp(filters.search, 'i')] } }
      ];
    }

    // Calculate pagination
    const skip = (page - 1) * limit;
    const sortOptions: any = {};
    sortOptions[sortBy] = sortOrder === 'asc' ? 1 : -1;

    // Execute query
    const [blogs, total] = await Promise.all([
      Blog.find(query)
        .populate('author', 'name email')
        .sort(sortOptions)
        .skip(skip)
        .limit(limit)
        .exec(),
      Blog.countDocuments(query)
    ]);

    const totalPages = Math.ceil(total / limit);

    return {
      blogs,
      total,
      page,
      totalPages
    };
  } catch (error: any) {
    throw new Error(`Error getting blogs: ${error.message}`);
  }
};

/**
 * Get published blogs for public view
 */
export const getPublishedBlogs = async (
  filters: Omit<BlogFilters, 'status'> = {},
  pagination: PaginationOptions = {}
): Promise<{ blogs: IBlog[]; total: number; page: number; totalPages: number }> => {
  return getAllBlogs({ ...filters, status: 'published' }, pagination);
};

/**
 * Increment blog views
 */
export const incrementBlogViews = async (id: string): Promise<IBlog | null> => {
  try {
    if (!Types.ObjectId.isValid(id)) {
      return null;
    }
    return await Blog.findByIdAndUpdate(
      id,
      { $inc: { views: 1 } },
      { new: true }
    ).populate('author', 'name email').exec();
  } catch (error: any) {
    throw new Error(`Error incrementing blog views: ${error.message}`);
  }
};

/**
 * Increment blog likes
 */
export const incrementBlogLikes = async (id: string): Promise<IBlog | null> => {
  try {
    if (!Types.ObjectId.isValid(id)) {
      return null;
    }
    return await Blog.findByIdAndUpdate(
      id,
      { $inc: { likes: 1 } },
      { new: true }
    ).populate('author', 'name email').exec();
  } catch (error: any) {
    throw new Error(`Error incrementing blog likes: ${error.message}`);
  }
};

/**
 * Get blogs by author
 */
export const getBlogsByAuthor = async (
  authorId: string,
  pagination: PaginationOptions = {}
): Promise<{ blogs: IBlog[]; total: number; page: number; totalPages: number }> => {
  return getAllBlogs({ author: authorId }, pagination);
};

/**
 * Get blogs by category
 */
export const getBlogsByCategory = async (
  category: string,
  pagination: PaginationOptions = {}
): Promise<{ blogs: IBlog[]; total: number; page: number; totalPages: number }> => {
  return getPublishedBlogs({ category }, pagination);
};

/**
 * Get blogs by tags
 */
export const getBlogsByTags = async (
  tags: string[],
  pagination: PaginationOptions = {}
): Promise<{ blogs: IBlog[]; total: number; page: number; totalPages: number }> => {
  return getPublishedBlogs({ tags }, pagination);
};

/**
 * Search blogs
 */
export const searchBlogs = async (
  searchTerm: string,
  pagination: PaginationOptions = {}
): Promise<{ blogs: IBlog[]; total: number; page: number; totalPages: number }> => {
  return getPublishedBlogs({ search: searchTerm }, pagination);
};

/**
 * Get blog categories with counts
 */
export const getBlogCategories = async (): Promise<Array<{ category: string; count: number }>> => {
  try {
    return await Blog.aggregate([
      { $match: { status: 'published' } },
      { $group: { _id: '$category', count: { $sum: 1 } } },
      { $project: { category: '$_id', count: 1, _id: 0 } },
      { $sort: { count: -1 } }
    ]);
  } catch (error: any) {
    throw new Error(`Error getting blog categories: ${error.message}`);
  }
};

/**
 * Get popular tags
 */
export const getPopularTags = async (limit: number = 20): Promise<Array<{ tag: string; count: number }>> => {
  try {
    return await Blog.aggregate([
      { $match: { status: 'published' } },
      { $unwind: '$tags' },
      { $group: { _id: '$tags', count: { $sum: 1 } } },
      { $project: { tag: '$_id', count: 1, _id: 0 } },
      { $sort: { count: -1 } },
      { $limit: limit }
    ]);
  } catch (error: any) {
    throw new Error(`Error getting popular tags: ${error.message}`);
  }
};
