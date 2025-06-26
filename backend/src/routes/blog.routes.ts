import { Router } from 'express';
import {
  createBlogPost,
  getAllBlogPosts,
  getPublishedBlogPosts,
  getBlogPostById,
  getPublishedBlogBySlug,
  updateBlogPost,
  deleteBlogPost,
  likeBlogPost,
  getBlogsByAuthorId,
  getBlogsByCategoryName,
  searchBlogPosts,
  getBlogCategoriesWithCounts,
  getPopularBlogTags,
  getRelatedBlogPosts,
  uploadBlogImage,
  bulkDeleteBlogs,
  updateBlogStatus,
  getBlogStatistics
} from '../controllers/blog.controller';
import { authMiddleware, checkRole, optionalAuth } from '../middleware/auth.middleware';
import {
  validateCreateBlog,
  validateUpdateBlog,
  validateBlogId,
  validateBlogSlug,
  validateGetAllBlogs,
  validateGetPublishedBlogs,
  validateSearchQuery,
  validatePagination
} from '../middleware/blog.validation';

const router = Router();

// Public routes (no authentication required)
/**
 * @route GET /api/blogs/public
 * @desc Get all published blog posts
 * @access Public
 */
router.get('/public', ...validateGetPublishedBlogs, getPublishedBlogPosts);

/**
 * @route GET /api/blogs/public/:slug
 * @desc Get a published blog post by slug
 * @access Public
 */
router.get('/public/:slug', ...validateBlogSlug, getPublishedBlogBySlug);

/**
 * @route GET /api/blogs/public/:id/related
 * @desc Get related blogs for a specific blog
 * @access Public
 */
router.get('/public/:id/related', ...validateBlogId, getRelatedBlogPosts);

/**
 * @route GET /api/blogs/categories
 * @desc Get blog categories with post counts
 * @access Public
 */
router.get('/categories', getBlogCategoriesWithCounts);

/**
 * @route GET /api/blogs/tags
 * @desc Get popular blog tags
 * @access Public
 */
router.get('/tags', getPopularBlogTags);

/**
 * @route GET /api/blogs/category/:category
 * @desc Get published blogs by category
 * @access Public
 */
router.get('/category/:category', ...validatePagination, getBlogsByCategoryName);

/**
 * @route GET /api/blogs/search
 * @desc Search published blog posts
 * @access Public
 */
router.get('/search', ...validateSearchQuery, ...validatePagination, searchBlogPosts);

/**
 * @route GET /api/blogs/author/:authorId
 * @desc Get published blogs by author
 * @access Public
 */
router.get('/author/:authorId', ...validatePagination, getBlogsByAuthorId);

// Routes with optional authentication (user can be logged in or not)
/**
 * @route POST /api/blogs/public/:id/like
 * @desc Like a blog post
 * @access Public (optional auth for tracking)
 */
router.post('/public/:id/like', ...validateBlogId, optionalAuth, likeBlogPost);

// Admin-only routes (require admin authentication)
/**
 * @route POST /api/blogs
 * @desc Create a new blog post
 * @access Admin only
 */
router.post('/', ...validateCreateBlog, checkRole('admin'), createBlogPost);

/**
 * @route GET /api/blogs
 * @desc Get all blog posts (including drafts and archived)
 * @access Admin only
 */
router.get('/', ...validateGetAllBlogs, checkRole('admin'), getAllBlogPosts);

/**
 * @route GET /api/blogs/:id
 * @desc Get a blog post by ID (any status)
 * @access Admin only
 */
router.get('/:id', ...validateBlogId, checkRole('admin'), getBlogPostById);

/**
 * @route PUT /api/blogs/:id
 * @desc Update a blog post
 * @access Admin only
 */
router.put('/:id', ...validateBlogId, ...validateUpdateBlog, checkRole('admin'), updateBlogPost);

/**
 * @route DELETE /api/blogs/:id
 * @desc Delete a blog post
 * @access Admin only
 */
router.delete('/:id', ...validateBlogId, checkRole('admin'), deleteBlogPost);

/**
 * @route POST /api/blogs/upload-image
 * @desc Upload blog image
 * @access Admin only
 */
router.post('/upload-image', checkRole('admin'), uploadBlogImage);

/**
 * @route DELETE /api/blogs/bulk
 * @desc Bulk delete blog posts
 * @access Admin only
 */
router.delete('/bulk', checkRole('admin'), bulkDeleteBlogs);

/**
 * @route PATCH /api/blogs/:id/status
 * @desc Update blog status
 * @access Admin only
 */
router.patch('/:id/status', ...validateBlogId, checkRole('admin'), updateBlogStatus);

/**
 * @route GET /api/blogs/statistics
 * @desc Get blog statistics
 * @access Admin only
 */
router.get('/statistics', checkRole('admin'), getBlogStatistics);

export default router;
