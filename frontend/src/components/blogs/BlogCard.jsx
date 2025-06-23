// src/components/blogs/BlogCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';

const BlogCard = ({ blog, showExcerpt = true, className = '' }) => {
  const formatDate = (date) => {
    try {
      return formatDistanceToNow(new Date(date), { addSuffix: true });
    } catch (error) {
      return 'Recently';
    }
  };

  const formatReadTime = (readTime) => {
    return readTime === 1 ? '1 min read' : `${readTime} mins read`;
  };

  return (
    <article className={`blog-card bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg ${className}`}>
      {/* Featured Image */}
      <div className="relative h-48 overflow-hidden">
        <Link to={`/blogs/${blog.slug}`}>
          <img
            // src={blog.featuredImage || 'https://via.placeholder.com/400x300?text=No+Image'}
            // src={blog.featuredImage || 'https://placehold.co/400/300'}
            // alt={blog.title}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            onError={(e) => {
              e.target.src = '/api/placeholder/400/300';
            }}
          />
        </Link>
        
        {/* Category Badge */}
        <div className="absolute top-4 left-4">
          <Link
            to={`/blogs?category=${encodeURIComponent(blog.category)}`}
            className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium hover:bg-blue-700 transition-colors"
          >
            {blog.category}
          </Link>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Title */}
        <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
          <Link
            to={`/blogs/${blog.slug}`}
            className="hover:text-blue-600 transition-colors"
          >
            {blog.title}
          </Link>
        </h3>

        {/* Excerpt */}
        {showExcerpt && (
          <p className="text-gray-600 mb-4 line-clamp-3">
            {blog.excerpt}
          </p>
        )}

        {/* Tags */}
        {blog.tags && blog.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {blog.tags.slice(0, 3).map((tag, index) => (
              <Link
                key={index}
                to={`/blogs?tags=${encodeURIComponent(tag)}`}
                className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full hover:bg-gray-200 transition-colors"
              >
                #{tag}
              </Link>
            ))}
            {blog.tags.length > 3 && (
              <span className="text-xs text-gray-500 px-2 py-1">
                +{blog.tags.length - 3} more
              </span>
            )}
          </div>
        )}

        {/* Meta Information */}
        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center space-x-4">
            {/* Author */}
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center">
                <span className="text-xs font-medium text-gray-600">
                  {blog.author?.name?.charAt(0) || 'A'}
                </span>
              </div>
              <span>{blog.author?.name || 'Anonymous'}</span>
            </div>

            {/* Read Time */}
            <span>{formatReadTime(blog.readTime)}</span>
          </div>

          {/* Date */}
          <time dateTime={blog.publishedAt}>
            {formatDate(blog.publishedAt)}
          </time>
        </div>

        {/* Stats */}
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
          <div className="flex items-center space-x-4 text-sm text-gray-500">
            {/* Views */}
            <div className="flex items-center space-x-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              <span>{blog.views || 0}</span>
            </div>

            {/* Likes */}
            <div className="flex items-center space-x-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              <span>{blog.likes || 0}</span>
            </div>
          </div>

          {/* Read More Link */}
          <Link
            to={`/blogs/${blog.slug}`}
            className="text-blue-600 hover:text-blue-800 font-medium text-sm transition-colors"
          >
            Read More →
          </Link>
        </div>
      </div>
    </article>
  );
};

export default BlogCard;
