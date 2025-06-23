# Blog API Documentation

## Overview
The Blog API provides comprehensive CRUD operations for blog management with role-based access control. Admins can create, read, update, and delete blog posts, while regular users can view published content.

## Base URL
```
/api/blogs
```

## Authentication
- **Admin routes**: Require admin authentication (`checkRole('admin')`)
- **Public routes**: No authentication required
- **Optional auth routes**: Authentication is optional for enhanced features

## Blog Model Schema

```typescript
interface IBlog {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featuredImage: string;
  author: ObjectId; // Reference to User
  category: string;
  tags: string[];
  status: 'draft' | 'published' | 'archived';
  publishedAt?: Date;
  readTime: number;
  views: number;
  likes: number;
  seo: {
    metaTitle?: string;
    metaDescription?: string;
    keywords?: string[];
  };
  createdAt: Date;
  updatedAt: Date;
}
```

## Categories
- Travel Tips
- Destinations
- Food & Culture
- Adventure
- Budget Travel
- Luxury Travel
- Solo Travel
- Family Travel
- Business Travel
- Travel News
- Travel Guides
- Photography

## Public Endpoints

### Get Published Blog Posts
```http
GET /api/blogs/public
```

**Query Parameters:**
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 10, max: 100)
- `category` (optional): Filter by category
- `tags` (optional): Comma-separated tags
- `search` (optional): Search in title, excerpt, content
- `sortBy` (optional): Sort field (default: publishedAt)
- `sortOrder` (optional): asc | desc (default: desc)

**Response:**
```json
{
  "success": true,
  "message": "Published blog posts retrieved successfully",
  "data": {
    "blogs": [
      {
        "_id": "blog_id",
        "title": "Amazing Travel Tips",
        "slug": "amazing-travel-tips",
        "excerpt": "Discover the best travel tips...",
        "content": "Full blog content...",
        "featuredImage": "https://example.com/image.jpg",
        "author": {
          "_id": "author_id",
          "name": "John Doe",
          "email": "john@example.com"
        },
        "category": "Travel Tips",
        "tags": ["travel", "tips", "adventure"],
        "status": "published",
        "publishedAt": "2024-01-15T10:00:00Z",
        "readTime": 5,
        "views": 150,
        "likes": 25,
        "seo": {
          "metaTitle": "Amazing Travel Tips",
          "metaDescription": "Discover the best travel tips...",
          "keywords": ["travel", "tips", "adventure"]
        },
        "createdAt": "2024-01-15T09:00:00Z",
        "updatedAt": "2024-01-15T10:00:00Z"
      }
    ],
    "total": 50,
    "page": 1,
    "totalPages": 5
  }
}
```

### Get Blog Post by Slug
```http
GET /api/blogs/public/:slug
```

**Parameters:**
- `slug`: Blog post slug

**Response:**
```json
{
  "success": true,
  "message": "Blog post retrieved successfully",
  "data": {
    // Blog object (same structure as above)
  }
}
```

### Get Blog Categories
```http
GET /api/blogs/categories
```

**Response:**
```json
{
  "success": true,
  "message": "Blog categories retrieved successfully",
  "data": [
    {
      "category": "Travel Tips",
      "count": 15
    },
    {
      "category": "Destinations",
      "count": 12
    }
  ]
}
```

### Get Popular Tags
```http
GET /api/blogs/tags
```

**Query Parameters:**
- `limit` (optional): Number of tags to return (default: 20)

**Response:**
```json
{
  "success": true,
  "message": "Popular tags retrieved successfully",
  "data": [
    {
      "tag": "travel",
      "count": 25
    },
    {
      "tag": "adventure",
      "count": 18
    }
  ]
}
```

### Get Blogs by Category
```http
GET /api/blogs/category/:category
```

**Parameters:**
- `category`: Category name

**Query Parameters:**
- `page`, `limit`, `sortBy`, `sortOrder` (same as public endpoint)

### Search Blog Posts
```http
GET /api/blogs/search
```

**Query Parameters:**
- `q`: Search query (required)
- `page`, `limit`, `sortBy`, `sortOrder` (same as public endpoint)

### Get Blogs by Author
```http
GET /api/blogs/author/:authorId
```

**Parameters:**
- `authorId`: Author's user ID

**Query Parameters:**
- `page`, `limit` (same as public endpoint)

### Like Blog Post
```http
POST /api/blogs/:id/like
```

**Parameters:**
- `id`: Blog post ID

**Response:**
```json
{
  "success": true,
  "message": "Blog post liked successfully",
  "data": {
    "likes": 26
  }
}
```

## Admin Endpoints

### Create Blog Post
```http
POST /api/blogs
```

**Headers:**
```
Authorization: Bearer <admin_token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "title": "Amazing Travel Tips",
  "slug": "amazing-travel-tips", // Optional, auto-generated from title
  "excerpt": "Discover the best travel tips for your next adventure...",
  "content": "Full blog content with detailed information...",
  "featuredImage": "https://example.com/image.jpg",
  "category": "Travel Tips",
  "tags": ["travel", "tips", "adventure"],
  "status": "draft", // Optional, default: draft
  "seo": { // Optional, auto-generated if not provided
    "metaTitle": "Amazing Travel Tips",
    "metaDescription": "Discover the best travel tips...",
    "keywords": ["travel", "tips", "adventure"]
  }
}
```

### Get All Blog Posts (Admin)
```http
GET /api/blogs
```

**Headers:**
```
Authorization: Bearer <admin_token>
```

**Query Parameters:**
- `page`, `limit`, `sortBy`, `sortOrder` (same as public)
- `status`: Filter by status (draft, published, archived)
- `category`: Filter by category
- `author`: Filter by author ID
- `search`: Search in title, excerpt, content

### Get Blog Post by ID (Admin)
```http
GET /api/blogs/:id
```

**Headers:**
```
Authorization: Bearer <admin_token>
```

**Parameters:**
- `id`: Blog post ID

### Update Blog Post
```http
PUT /api/blogs/:id
```

**Headers:**
```
Authorization: Bearer <admin_token>
Content-Type: application/json
```

**Parameters:**
- `id`: Blog post ID

**Request Body:**
```json
{
  "title": "Updated Amazing Travel Tips",
  "status": "published",
  // Any other fields to update
}
```

### Delete Blog Post
```http
DELETE /api/blogs/:id
```

**Headers:**
```
Authorization: Bearer <admin_token>
```

**Parameters:**
- `id`: Blog post ID

**Response:**
```json
{
  "success": true,
  "message": "Blog post deleted successfully",
  "data": {
    // Deleted blog object
  }
}
```

## Error Responses

### Validation Error (400)
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "title",
      "message": "Title is required"
    }
  ]
}
```

### Unauthorized (401)
```json
{
  "success": false,
  "message": "Access denied. No token provided."
}
```

### Forbidden (403)
```json
{
  "success": false,
  "message": "Access denied. Admin role required."
}
```

### Not Found (404)
```json
{
  "success": false,
  "message": "Blog post not found"
}
```

### Server Error (500)
```json
{
  "success": false,
  "message": "Failed to retrieve blog posts",
  "error": "Detailed error message"
}
```

## Usage Examples

### Frontend Integration

```javascript
// Get published blogs
const getBlogs = async (page = 1, category = '') => {
  const params = new URLSearchParams({
    page: page.toString(),
    limit: '10'
  });
  
  if (category) params.append('category', category);
  
  const response = await fetch(`/api/blogs/public?${params}`);
  return response.json();
};

// Get single blog post
const getBlogBySlug = async (slug) => {
  const response = await fetch(`/api/blogs/public/${slug}`);
  return response.json();
};

// Admin: Create blog post
const createBlog = async (blogData, token) => {
  const response = await fetch('/api/blogs', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(blogData)
  });
  return response.json();
};
```

## Features

### Automatic Features
- **Slug Generation**: Auto-generated from title if not provided
- **SEO Optimization**: Auto-generated meta tags and keywords
- **Read Time Calculation**: Estimated reading time based on content
- **View Tracking**: Automatic view increment on blog access
- **Unique Slugs**: Ensures slug uniqueness with automatic numbering

### Search & Filtering
- **Full-text Search**: Search across title, excerpt, and content
- **Category Filtering**: Filter by blog categories
- **Tag Filtering**: Filter by multiple tags
- **Status Filtering**: Admin can filter by draft/published/archived
- **Author Filtering**: Filter by specific authors

### Performance Features
- **Pagination**: Efficient pagination for large datasets
- **Indexing**: Database indexes for optimal query performance
- **Caching**: Ready for Redis caching implementation
- **Validation**: Comprehensive input validation and sanitization
