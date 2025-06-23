import { Request, Response } from 'express';
import {
  createBlog,
  findBlogById,
  findBlogBySlug,
  updateBlogById,
  deleteBlogById,
  getAllBlogs,
  getPublishedBlogs,
  incrementBlogViews,
  incrementBlogLikes,
  getBlogsByAuthor,
  getBlogsByCategory,
  getBlogsByTags,
  searchBlogs,
  getBlogCategories,
  getPopularTags,
  CreateBlogData,
  UpdateBlogData,
  BlogFilters,
  PaginationOptions
} from '../dao/blog.dao';
import { BlogService } from '../services/blog.service';

/**
 * Create a new blog post (Admin only)
 */
export const createBlogPost = async (req: Request, res: Response): Promise<void> => {
  try {
    const blogData: CreateBlogData = {
      ...req.body,
      author: req.user?._id
    };

    const blog = await createBlog(blogData);

    res.status(201).json({
      success: true,
      message: 'Blog post created successfully',
      data: blog
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: 'Failed to create blog post',
      error: error.message
    });
  }
};

/**
 * Get all blog posts with filters and pagination (Admin only)
 */
export const getAllBlogPosts = async (req: Request, res: Response): Promise<void> => {
  try {
    const filters: BlogFilters = {
      status: req.query.status as any,
      category: req.query.category as string,
      tags: req.query.tags ? (req.query.tags as string).split(',') : undefined,
      author: req.query.author as string,
      search: req.query.search as string
    };

    const pagination: PaginationOptions = {
      page: req.query.page ? parseInt(req.query.page as string) : 1,
      limit: req.query.limit ? parseInt(req.query.limit as string) : 10,
      sortBy: req.query.sortBy as string || 'createdAt',
      sortOrder: req.query.sortOrder as 'asc' | 'desc' || 'desc'
    };

    const result = await getAllBlogs(filters, pagination);

    res.status(200).json({
      success: true,
      message: 'Blog posts retrieved successfully',
      data: result
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve blog posts',
      error: error.message
    });
  }
};

/**
 * Get published blog posts for public view
 */
export const getPublishedBlogPosts = async (req: Request, res: Response): Promise<void> => {
  try {
    const filters = {
      category: req.query.category as string,
      tags: req.query.tags ? (req.query.tags as string).split(',') : undefined,
      search: req.query.search as string
    };

    const pagination: PaginationOptions = {
      page: req.query.page ? parseInt(req.query.page as string) : 1,
      limit: req.query.limit ? parseInt(req.query.limit as string) : 10,
      sortBy: req.query.sortBy as string || 'publishedAt',
      sortOrder: req.query.sortOrder as 'asc' | 'desc' || 'desc'
    };

    const result = await getPublishedBlogs(filters, pagination);

    res.status(200).json({
      success: true,
      message: 'Published blog posts retrieved successfully',
      data: result
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve published blog posts',
      error: error.message
    });
  }
};

/**
 * Get a single blog post by ID (Admin only)
 */
export const getBlogPostById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const blog = await findBlogById(id);

    if (!blog) {
      res.status(404).json({
        success: false,
        message: 'Blog post not found'
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: 'Blog post retrieved successfully',
      data: blog
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve blog post',
      error: error.message
    });
  }
};

/**
 * Get a single published blog post by slug (Public)
 */
export const getPublishedBlogBySlug = async (req: Request, res: Response): Promise<void> => {
  try {
    const { slug } = req.params;
    const blog = await findBlogBySlug(slug);

    if (!blog || blog.status !== 'published') {
      res.status(404).json({
        success: false,
        message: 'Blog post not found'
      });
      return;
    }

    // Increment views
    await incrementBlogViews(String(blog._id));

    res.status(200).json({
      success: true,
      message: 'Blog post retrieved successfully',
      data: blog
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve blog post',
      error: error.message
    });
  }
};

/**
 * Update a blog post (Admin only)
 */
export const updateBlogPost = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const updateData: UpdateBlogData = req.body;

    const blog = await updateBlogById(id, updateData);

    if (!blog) {
      res.status(404).json({
        success: false,
        message: 'Blog post not found'
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: 'Blog post updated successfully',
      data: blog
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: 'Failed to update blog post',
      error: error.message
    });
  }
};

/**
 * Delete a blog post (Admin only)
 */
export const deleteBlogPost = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const blog = await deleteBlogById(id);

    if (!blog) {
      res.status(404).json({
        success: false,
        message: 'Blog post not found'
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: 'Blog post deleted successfully',
      data: blog
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Failed to delete blog post',
      error: error.message
    });
  }
};

/**
 * Like a blog post
 */
export const likeBlogPost = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const blog = await incrementBlogLikes(id);

    if (!blog) {
      res.status(404).json({
        success: false,
        message: 'Blog post not found'
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: 'Blog post liked successfully',
      data: { likes: blog.likes }
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Failed to like blog post',
      error: error.message
    });
  }
};

/**
 * Get blogs by author
 */
export const getBlogsByAuthorId = async (req: Request, res: Response): Promise<void> => {
  try {
    const { authorId } = req.params;
    const pagination: PaginationOptions = {
      page: req.query.page ? parseInt(req.query.page as string) : 1,
      limit: req.query.limit ? parseInt(req.query.limit as string) : 10
    };

    const result = await getBlogsByAuthor(authorId, pagination);

    res.status(200).json({
      success: true,
      message: 'Author blog posts retrieved successfully',
      data: result
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve author blog posts',
      error: error.message
    });
  }
};

/**
 * Get blogs by category
 */
export const getBlogsByCategoryName = async (req: Request, res: Response): Promise<void> => {
  try {
    const { category } = req.params;
    const pagination: PaginationOptions = {
      page: req.query.page ? parseInt(req.query.page as string) : 1,
      limit: req.query.limit ? parseInt(req.query.limit as string) : 10
    };

    const result = await getBlogsByCategory(category, pagination);

    res.status(200).json({
      success: true,
      message: 'Category blog posts retrieved successfully',
      data: result
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve category blog posts',
      error: error.message
    });
  }
};

/**
 * Search blog posts
 */
export const searchBlogPosts = async (req: Request, res: Response): Promise<void> => {
  try {
    const { q } = req.query;
    
    if (!q || typeof q !== 'string') {
      res.status(400).json({
        success: false,
        message: 'Search query is required'
      });
      return;
    }

    const pagination: PaginationOptions = {
      page: req.query.page ? parseInt(req.query.page as string) : 1,
      limit: req.query.limit ? parseInt(req.query.limit as string) : 10
    };

    const result = await searchBlogs(q, pagination);

    res.status(200).json({
      success: true,
      message: 'Search results retrieved successfully',
      data: result
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Failed to search blog posts',
      error: error.message
    });
  }
};

/**
 * Get blog categories with post counts
 */
export const getBlogCategoriesWithCounts = async (req: Request, res: Response): Promise<void> => {
  try {
    const categories = await getBlogCategories();
    console.log("categories",categories)
    res.status(200).json({
      success: true,
      message: 'Blog categories retrieved successfully',
      data: categories
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve blog categories',
      error: error.message
    });
  }
};

/**
 * Get popular tags
 */
export const getPopularBlogTags = async (req: Request, res: Response): Promise<void> => {
  try {
    const limit = req.query.limit ? parseInt(req.query.limit as string) : 20;
    const tags = await getPopularTags(limit);

    res.status(200).json({
      success: true,
      message: 'Popular tags retrieved successfully',
      data: tags
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve popular tags',
      error: error.message
    });
  }
};

/**
 * Get related blogs for a specific blog
 */
export const getRelatedBlogPosts = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const limit = req.query.limit ? parseInt(req.query.limit as string) : 5;

    const relatedBlogs = await BlogService.getRelatedBlogs(id, limit);

    res.status(200).json({
      success: true,
      message: 'Related blogs retrieved successfully',
      data: relatedBlogs
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve related blogs',
      error: error.message
    });
  }
};
