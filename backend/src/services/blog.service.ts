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
import { IBlog } from '../models/Blog';

/**
 * Service class for blog operations
 */
export class BlogService {
  /**
   * Create a new blog post with slug generation
   */
  static async createBlogPost(blogData: CreateBlogData): Promise<IBlog> {
    try {
      // Generate slug from title if not provided
      if (!blogData.slug) {
        blogData.slug = this.generateSlug(blogData.title);
      }

      // Ensure slug is unique
      blogData.slug = await this.ensureUniqueSlug(blogData.slug);

      // Generate SEO data if not provided
      if (!blogData.seo) {
        blogData.seo = this.generateSEOData(blogData);
      }

      return await createBlog(blogData);
    } catch (error: any) {
      throw new Error(`Failed to create blog post: ${error.message}`);
    }
  }

  /**
   * Update a blog post with slug validation
   */
  static async updateBlogPost(id: string, updateData: UpdateBlogData): Promise<IBlog | null> {
    try {
      // If slug is being updated, ensure it's unique
      if (updateData.slug) {
        updateData.slug = await this.ensureUniqueSlug(updateData.slug, id);
      }

      // Update SEO data if content is being updated
      if (updateData.title || updateData.excerpt || updateData.content) {
        const existingBlog = await findBlogById(id);
        if (existingBlog) {
          updateData.seo = {
            ...existingBlog.seo,
            ...this.generateSEOData({
              title: updateData.title || existingBlog.title,
              excerpt: updateData.excerpt || existingBlog.excerpt,
              content: updateData.content || existingBlog.content,
              tags: updateData.tags || existingBlog.tags
            } as any)
          };
        }
      }

      return await updateBlogById(id, updateData);
    } catch (error: any) {
      throw new Error(`Failed to update blog post: ${error.message}`);
    }
  }

  /**
   * Get blog post with view increment
   */
  static async getBlogPostBySlug(slug: string, incrementViews: boolean = true): Promise<IBlog | null> {
    try {
      const blog = await findBlogBySlug(slug);
      
      if (blog && blog.status === 'published' && incrementViews) {
        await incrementBlogViews(String(blog._id as any));
        blog.views += 1; // Update the local object
      }

      return blog;
    } catch (error: any) {
      throw new Error(`Failed to get blog post: ${error.message}`);
    }
  }

  /**
   * Get related blog posts
   */
  static async getRelatedBlogs(blogId: string, limit: number = 5): Promise<IBlog[]> {
    try {
      const blog = await findBlogById(blogId);
      if (!blog) {
        return [];
      }

      // Find blogs with similar tags or same category
      const filters: BlogFilters = {
        status: 'published'
      };

      // First try to find blogs with similar tags
      if (blog.tags && blog.tags.length > 0) {
        const result = await getAllBlogs(
          { ...filters, tags: blog.tags },
          { limit: limit + 1, sortBy: 'publishedAt', sortOrder: 'desc' }
        );
        
        // Remove the current blog from results
        const relatedBlogs = result.blogs.filter(b => (b._id as any).toString() !== blogId);
        
        if (relatedBlogs.length >= limit) {
          return relatedBlogs.slice(0, limit);
        }
      }

      // If not enough blogs with similar tags, get from same category
      const result = await getAllBlogs(
        { ...filters, category: blog.category },
        { limit: limit + 1, sortBy: 'publishedAt', sortOrder: 'desc' }
      );

      // Remove the current blog from results
      const relatedBlogs = result.blogs.filter(b => (b._id as any).toString() !== blogId);
      return relatedBlogs.slice(0, limit);
    } catch (error: any) {
      throw new Error(`Failed to get related blogs: ${error.message}`);
    }
  }

  /**
   * Get blog statistics
   */
  static async getBlogStats(): Promise<{
    totalBlogs: number;
    publishedBlogs: number;
    draftBlogs: number;
    totalViews: number;
    totalLikes: number;
    categoryCounts: Array<{ category: string; count: number }>;
    popularTags: Array<{ tag: string; count: number }>;
  }> {
    try {
      const [
        allBlogs,
        publishedBlogs,
        draftBlogs,
        categories,
        tags
      ] = await Promise.all([
        getAllBlogs({}, { limit: 1 }),
        getAllBlogs({ status: 'published' }, { limit: 1 }),
        getAllBlogs({ status: 'draft' }, { limit: 1 }),
        getBlogCategories(),
        getPopularTags(10)
      ]);

      // Calculate total views and likes
      const publishedBlogsData = await getAllBlogs(
        { status: 'published' },
        { limit: 1000 } // Get all published blogs for stats
      );

      const totalViews = publishedBlogsData.blogs.reduce((sum, blog) => sum + blog.views, 0);
      const totalLikes = publishedBlogsData.blogs.reduce((sum, blog) => sum + blog.likes, 0);

      return {
        totalBlogs: allBlogs.total,
        publishedBlogs: publishedBlogs.total,
        draftBlogs: draftBlogs.total,
        totalViews,
        totalLikes,
        categoryCounts: categories,
        popularTags: tags
      };
    } catch (error: any) {
      throw new Error(`Failed to get blog statistics: ${error.message}`);
    }
  }

  /**
   * Generate a URL-friendly slug from title
   */
  private static generateSlug(title: string): string {
    return title
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '') // Remove special characters
      .replace(/[\s_-]+/g, '-') // Replace spaces and underscores with hyphens
      .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
  }

  /**
   * Ensure slug is unique by appending number if necessary
   */
  private static async ensureUniqueSlug(slug: string, excludeId?: string): Promise<string> {
    let uniqueSlug = slug;
    let counter = 1;

    while (true) {
      const existingBlog = await findBlogBySlug(uniqueSlug);
      
      if (!existingBlog || (excludeId && (existingBlog._id as any).toString() === excludeId)) {
        break;
      }

      uniqueSlug = `${slug}-${counter}`;
      counter++;
    }

    return uniqueSlug;
  }

  /**
   * Generate SEO metadata from blog content
   */
  private static generateSEOData(blogData: {
    title: string;
    excerpt: string;
    content?: string;
    tags?: string[];
  }): {
    metaTitle: string;
    metaDescription: string;
    keywords: string[];
  } {
    // Generate meta title (max 60 characters)
    let metaTitle = blogData.title;
    if (metaTitle.length > 60) {
      metaTitle = metaTitle.substring(0, 57) + '...';
    }

    // Generate meta description (max 160 characters)
    let metaDescription = blogData.excerpt;
    if (metaDescription.length > 160) {
      metaDescription = metaDescription.substring(0, 157) + '...';
    }

    // Generate keywords from tags and content
    const keywords: string[] = [];
    
    // Add tags as keywords
    if (blogData.tags) {
      keywords.push(...blogData.tags);
    }

    // Extract keywords from title and content
    const titleWords = blogData.title.toLowerCase().split(/\s+/).filter(word => word.length > 3);
    const contentWords = blogData.content 
      ? blogData.content.toLowerCase().split(/\s+/).filter(word => word.length > 4)
      : [];

    // Add significant words as keywords
    keywords.push(...titleWords.slice(0, 3));
    keywords.push(...contentWords.slice(0, 5));

    // Remove duplicates and limit to 10 keywords
    const uniqueKeywords = [...new Set(keywords)].slice(0, 10);

    return {
      metaTitle,
      metaDescription,
      keywords: uniqueKeywords
    };
  }

  /**
   * Validate blog data before creation/update
   */
  static validateBlogData(blogData: CreateBlogData | UpdateBlogData): {
    isValid: boolean;
    errors: string[];
  } {
    const errors: string[] = [];

    // Check required fields for creation
    if ('title' in blogData && blogData.title) {
      if (blogData.title.length < 3 || blogData.title.length > 200) {
        errors.push('Title must be between 3 and 200 characters');
      }
    }

    if ('excerpt' in blogData && blogData.excerpt) {
      if (blogData.excerpt.length < 10 || blogData.excerpt.length > 500) {
        errors.push('Excerpt must be between 10 and 500 characters');
      }
    }

    if ('content' in blogData && blogData.content) {
      if (blogData.content.length < 100) {
        errors.push('Content must be at least 100 characters long');
      }
    }

    if ('tags' in blogData && blogData.tags) {
      if (blogData.tags.length > 10) {
        errors.push('Maximum 10 tags allowed');
      }
      
      const invalidTags = blogData.tags.filter(tag => tag.length > 50);
      if (invalidTags.length > 0) {
        errors.push('Each tag must be maximum 50 characters');
      }
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }
}
