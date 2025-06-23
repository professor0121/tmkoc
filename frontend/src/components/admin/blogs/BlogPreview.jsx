// src/components/admin/blogs/BlogPreview.jsx
import React from 'react';
import { formatDistanceToNow, format } from 'date-fns';

const BlogPreview = ({ blogData, onClose }) => {
  const formatDate = (date) => {
    try {
      return format(new Date(date), 'MMMM dd, yyyy');
    } catch (error) {
      return format(new Date(), 'MMMM dd, yyyy');
    }
  };

  const formatReadTime = (content) => {
    const wordCount = content.split(/\s+/).length;
    const readTime = Math.ceil(wordCount / 200); // 200 words per minute
    return readTime === 1 ? '1 min read' : `${readTime} mins read`;
  };

  const renderContent = (content) => {
    // Simple markdown-like rendering
    let html = content
      .replace(/### (.*$)/gim, '<h3 class="text-lg font-semibold mt-6 mb-3 text-gray-900">$1</h3>')
      .replace(/## (.*$)/gim, '<h2 class="text-xl font-bold mt-8 mb-4 text-gray-900">$1</h2>')
      .replace(/# (.*$)/gim, '<h1 class="text-2xl font-bold mt-10 mb-5 text-gray-900">$1</h1>')
      .replace(/\*\*(.*?)\*\*/gim, '<strong class="font-semibold">$1</strong>')
      .replace(/\*(.*?)\*/gim, '<em class="italic">$1</em>')
      .replace(/`(.*?)`/gim, '<code class="bg-gray-100 px-2 py-1 rounded text-sm font-mono text-gray-800">$1</code>')
      .replace(/```\n([\s\S]*?)\n```/gim, '<pre class="bg-gray-900 text-white p-4 rounded-lg my-6 overflow-x-auto"><code class="text-sm">$1</code></pre>')
      .replace(/\[([^\]]+)\]\(([^)]+)\)/gim, '<a href="$2" class="text-blue-600 hover:text-blue-800 underline">$1</a>')
      .replace(/!\[([^\]]*)\]\(([^)]+)\)/gim, '<img src="$2" alt="$1" class="max-w-full h-auto rounded-lg my-6 shadow-md" />')
      .replace(/^> (.*$)/gim, '<blockquote class="border-l-4 border-blue-500 pl-4 py-2 my-6 italic text-gray-700 bg-blue-50 rounded-r">$1</blockquote>')
      .replace(/^- (.*$)/gim, '<li class="mb-1">$1</li>')
      .replace(/^(\d+)\. (.*$)/gim, '<li class="mb-1">$2</li>')
      .replace(/\n\n/gim, '</p><p class="mb-4 text-gray-800 leading-relaxed">')
      .replace(/\n/gim, '<br />');

    // Wrap in paragraph tags
    html = '<p class="mb-4 text-gray-800 leading-relaxed">' + html + '</p>';

    // Wrap consecutive list items
    html = html.replace(/(<li.*?<\/li>)/gim, (match, p1) => {
      if (!match.includes('<ul>') && !match.includes('<ol>')) {
        return `<ul class="list-disc list-inside my-4 space-y-1 text-gray-800">${p1}</ul>`;
      }
      return p1;
    });

    return html;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Blog Preview</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto max-h-[calc(90vh-80px)]">
          <article className="max-w-3xl mx-auto p-8">
            {/* Category */}
            {blogData.category && (
              <div className="mb-4">
                <span className="inline-block bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-medium">
                  {blogData.category}
                </span>
              </div>
            )}

            {/* Title */}
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              {blogData.title || 'Untitled Blog Post'}
            </h1>

            {/* Excerpt */}
            {blogData.excerpt && (
              <p className="text-xl text-gray-600 mb-6 leading-relaxed">
                {blogData.excerpt}
              </p>
            )}

            {/* Meta Information */}
            <div className="flex flex-wrap items-center gap-6 text-gray-600 mb-6">
              {/* Author */}
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                  <span className="text-sm font-medium text-gray-600">
                    A
                  </span>
                </div>
                <div>
                  <p className="font-medium text-gray-900">Admin Author</p>
                  <p className="text-sm text-gray-500">Author</p>
                </div>
              </div>

              {/* Date and Read Time */}
              <div className="flex items-center space-x-4 text-sm">
                <time>
                  {formatDate(new Date())}
                </time>
                <span>•</span>
                <span>{formatReadTime(blogData.content || '')}</span>
              </div>
            </div>

            {/* Stats */}
            <div className="flex items-center justify-between py-4 border-t border-b border-gray-200 mb-8">
              <div className="flex items-center space-x-6 text-sm text-gray-600">
                <div className="flex items-center space-x-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  <span>0 views</span>
                </div>

                <div className="flex items-center space-x-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                  <span>0 likes</span>
                </div>
              </div>

              <div className="text-sm text-gray-500">
                Status: <span className={`font-medium ${
                  blogData.status === 'published' ? 'text-green-600' : 
                  blogData.status === 'draft' ? 'text-yellow-600' : 'text-gray-600'
                }`}>
                  {blogData.status || 'draft'}
                </span>
              </div>
            </div>

            {/* Featured Image */}
            {blogData.featuredImage && (
              <div className="mb-8">
                <img
                  src={blogData.featuredImage}
                  alt={blogData.title}
                  className="w-full h-64 md:h-96 object-cover rounded-lg shadow-md"
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
              </div>
            )}

            {/* Content */}
            {blogData.content && (
              <div className="prose prose-lg max-w-none mb-8">
                <div 
                  className="blog-content"
                  dangerouslySetInnerHTML={{ __html: renderContent(blogData.content) }} 
                />
              </div>
            )}

            {/* Tags */}
            {blogData.tags && blogData.tags.length > 0 && (
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {blogData.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* SEO Preview */}
            {(blogData.seo?.metaTitle || blogData.seo?.metaDescription) && (
              <div className="mt-12 pt-8 border-t border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">SEO Preview</h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="text-blue-600 text-lg font-medium mb-1">
                    {blogData.seo?.metaTitle || blogData.title}
                  </h4>
                  <p className="text-green-700 text-sm mb-2">
                    example.com/blogs/{blogData.slug || 'blog-slug'}
                  </p>
                  <p className="text-gray-700 text-sm">
                    {blogData.seo?.metaDescription || blogData.excerpt}
                  </p>
                </div>
              </div>
            )}
          </article>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200 bg-gray-50">
          <div className="flex justify-end">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
            >
              Close Preview
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPreview;
