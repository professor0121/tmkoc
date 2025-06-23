import { Request, Response, NextFunction } from 'express';
import { body, param, query, validationResult } from 'express-validator';

// Helper function to handle validation errors
const handleValidationErrors = (req: Request, res: Response, next: NextFunction): void => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errors.array()
    });
    return;
  }
  next();
};

// Blog categories enum for validation
const BLOG_CATEGORIES = [
  'Travel Tips',
  'Destinations',
  'Food & Culture',
  'Adventure',
  'Budget Travel',
  'Luxury Travel',
  'Solo Travel',
  'Family Travel',
  'Business Travel',
  'Travel News',
  'Travel Guides',
  'Photography'
];

// Blog status enum for validation
const BLOG_STATUSES = ['draft', 'published', 'archived'];

/**
 * Validation for creating a blog post
 */
export const validateCreateBlog = [
  body('title')
    .notEmpty()
    .withMessage('Title is required')
    .isLength({ min: 3, max: 200 })
    .withMessage('Title must be between 3 and 200 characters')
    .trim(),
  
  body('slug')
    .notEmpty()
    .withMessage('Slug is required')
    .matches(/^[a-z0-9-]+$/)
    .withMessage('Slug can only contain lowercase letters, numbers, and hyphens')
    .isLength({ min: 3, max: 200 })
    .withMessage('Slug must be between 3 and 200 characters')
    .trim(),
  
  body('excerpt')
    .notEmpty()
    .withMessage('Excerpt is required')
    .isLength({ min: 10, max: 500 })
    .withMessage('Excerpt must be between 10 and 500 characters')
    .trim(),
  
  body('content')
    .notEmpty()
    .withMessage('Content is required')
    .isLength({ min: 100 })
    .withMessage('Content must be at least 100 characters long'),
  
  body('featuredImage')
    .notEmpty()
    .withMessage('Featured image is required')
    .isURL()
    .withMessage('Featured image must be a valid URL'),
  
  body('category')
    .notEmpty()
    .withMessage('Category is required')
    .isIn(BLOG_CATEGORIES)
    .withMessage(`Category must be one of: ${BLOG_CATEGORIES.join(', ')}`),
  
  body('tags')
    .optional()
    .isArray()
    .withMessage('Tags must be an array')
    .custom((tags) => {
      if (tags && tags.length > 10) {
        throw new Error('Maximum 10 tags allowed');
      }
      if (tags && tags.some((tag: string) => typeof tag !== 'string' || tag.length > 50)) {
        throw new Error('Each tag must be a string with maximum 50 characters');
      }
      return true;
    }),
  
  body('status')
    .optional()
    .isIn(BLOG_STATUSES)
    .withMessage(`Status must be one of: ${BLOG_STATUSES.join(', ')}`),
  
  body('seo.metaTitle')
    .optional()
    .isLength({ max: 60 })
    .withMessage('Meta title cannot exceed 60 characters')
    .trim(),
  
  body('seo.metaDescription')
    .optional()
    .isLength({ max: 160 })
    .withMessage('Meta description cannot exceed 160 characters')
    .trim(),
  
  body('seo.keywords')
    .optional()
    .isArray()
    .withMessage('SEO keywords must be an array')
    .custom((keywords) => {
      if (keywords && keywords.length > 20) {
        throw new Error('Maximum 20 SEO keywords allowed');
      }
      if (keywords && keywords.some((keyword: string) => typeof keyword !== 'string' || keyword.length > 50)) {
        throw new Error('Each SEO keyword must be a string with maximum 50 characters');
      }
      return true;
    }),
  
  handleValidationErrors
];

/**
 * Validation for updating a blog post
 */
export const validateUpdateBlog = [
  body('title')
    .optional()
    .isLength({ min: 3, max: 200 })
    .withMessage('Title must be between 3 and 200 characters')
    .trim(),
  
  body('slug')
    .optional()
    .matches(/^[a-z0-9-]+$/)
    .withMessage('Slug can only contain lowercase letters, numbers, and hyphens')
    .isLength({ min: 3, max: 200 })
    .withMessage('Slug must be between 3 and 200 characters')
    .trim(),
  
  body('excerpt')
    .optional()
    .isLength({ min: 10, max: 500 })
    .withMessage('Excerpt must be between 10 and 500 characters')
    .trim(),
  
  body('content')
    .optional()
    .isLength({ min: 100 })
    .withMessage('Content must be at least 100 characters long'),
  
  body('featuredImage')
    .optional()
    .isURL()
    .withMessage('Featured image must be a valid URL'),
  
  body('category')
    .optional()
    .isIn(BLOG_CATEGORIES)
    .withMessage(`Category must be one of: ${BLOG_CATEGORIES.join(', ')}`),
  
  body('tags')
    .optional()
    .isArray()
    .withMessage('Tags must be an array')
    .custom((tags) => {
      if (tags && tags.length > 10) {
        throw new Error('Maximum 10 tags allowed');
      }
      if (tags && tags.some((tag: string) => typeof tag !== 'string' || tag.length > 50)) {
        throw new Error('Each tag must be a string with maximum 50 characters');
      }
      return true;
    }),
  
  body('status')
    .optional()
    .isIn(BLOG_STATUSES)
    .withMessage(`Status must be one of: ${BLOG_STATUSES.join(', ')}`),
  
  body('seo.metaTitle')
    .optional()
    .isLength({ max: 60 })
    .withMessage('Meta title cannot exceed 60 characters')
    .trim(),
  
  body('seo.metaDescription')
    .optional()
    .isLength({ max: 160 })
    .withMessage('Meta description cannot exceed 160 characters')
    .trim(),
  
  body('seo.keywords')
    .optional()
    .isArray()
    .withMessage('SEO keywords must be an array')
    .custom((keywords) => {
      if (keywords && keywords.length > 20) {
        throw new Error('Maximum 20 SEO keywords allowed');
      }
      if (keywords && keywords.some((keyword: string) => typeof keyword !== 'string' || keyword.length > 50)) {
        throw new Error('Each SEO keyword must be a string with maximum 50 characters');
      }
      return true;
    }),
  
  handleValidationErrors
];

/**
 * Validation for blog ID parameter
 */
export const validateBlogId = [
  param('id')
    .isMongoId()
    .withMessage('Invalid blog ID format'),
  
  handleValidationErrors
];

/**
 * Validation for blog slug parameter
 */
export const validateBlogSlug = [
  param('slug')
    .matches(/^[a-z0-9-]+$/)
    .withMessage('Invalid slug format')
    .isLength({ min: 3, max: 200 })
    .withMessage('Slug must be between 3 and 200 characters'),
  
  handleValidationErrors
];

/**
 * Validation for pagination query parameters
 */
export const validatePagination = [
  query('page')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Page must be a positive integer'),
  
  query('limit')
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage('Limit must be between 1 and 100'),
  
  query('sortBy')
    .optional()
    .isIn(['title', 'createdAt', 'updatedAt', 'publishedAt', 'views', 'likes'])
    .withMessage('Invalid sort field'),
  
  query('sortOrder')
    .optional()
    .isIn(['asc', 'desc'])
    .withMessage('Sort order must be asc or desc'),
  
  handleValidationErrors
];

/**
 * Validation for blog filters
 */
export const validateBlogFilters = [
  query('status')
    .optional()
    .isIn(BLOG_STATUSES)
    .withMessage(`Status must be one of: ${BLOG_STATUSES.join(', ')}`),
  
  query('category')
    .optional()
    .isIn(BLOG_CATEGORIES)
    .withMessage(`Category must be one of: ${BLOG_CATEGORIES.join(', ')}`),
  
  query('author')
    .optional()
    .isMongoId()
    .withMessage('Author must be a valid user ID'),
  
  query('search')
    .optional()
    .isLength({ min: 2, max: 100 })
    .withMessage('Search term must be between 2 and 100 characters')
    .trim(),
  
  handleValidationErrors
];

/**
 * Validation for search query
 */
export const validateSearchQuery = [
  query('q')
    .notEmpty()
    .withMessage('Search query is required')
    .isLength({ min: 2, max: 100 })
    .withMessage('Search query must be between 2 and 100 characters')
    .trim(),
  
  handleValidationErrors
];

/**
 * Combined validation for getting all blogs (admin)
 */
export const validateGetAllBlogs = [
  ...validatePagination,
  ...validateBlogFilters
];

/**
 * Combined validation for getting published blogs (public)
 */
export const validateGetPublishedBlogs = [
  ...validatePagination,
  query('category')
    .optional()
    .isIn(BLOG_CATEGORIES)
    .withMessage(`Category must be one of: ${BLOG_CATEGORIES.join(', ')}`),
  
  query('search')
    .optional()
    .isLength({ min: 2, max: 100 })
    .withMessage('Search term must be between 2 and 100 characters')
    .trim(),
  
  handleValidationErrors
];
