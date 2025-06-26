// src/components/admin/blogs/BlogForm.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchBlogCategories,
  fetchPopularTags,
  createBlog,
  updateBlog,
  uploadBlogImage
} from '../../../redux/blogs/blogSlice';
import RichTextEditor from './RichTextEditor';
import BlogPreview from './BlogPreview';

const BlogForm = ({ isEdit = false, blogData = null }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const blogCategories = [
    { value: 'Travel Tips', label: 'Travel Tips' },
    { value: 'Destinations', label: 'Destinations' },
    { value: 'Food & Culture', label: 'Food & Culture' },
    { value: 'Adventure', label: 'Adventure' },
    { value: 'Budget Travel', label: 'Budget Travel' },
    { value: 'Luxury Travel', label: 'Luxury Travel' },
    { value: 'Solo Travel', label: 'Solo Travel' },
    { value: 'Family Travel', label: 'Family Travel' },
    { value: 'Business Travel', label: 'Business Travel' },
    { value: 'Travel News', label: 'Travel News' },
    { value: 'Travel Guides', label: 'Travel Guides' },
    { value: 'Photography', label: 'Photography' }
  ];

  const { popularTags, loading: blogLoading, error: blogError } = useSelector((state) => state.blogs);

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    excerpt: '', // Keep excerpt as per your data structure
    content: '',
    featuredImage: '', // Keep as string URL as per your data structure
    category: '',
    tags: [],
    status: 'draft',
    readTime: 0, // Add readTime field
    seo: {
      metaTitle: '',
      metaDescription: '',
      keywords: []
    }
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [newTag, setNewTag] = useState('');
  const [showPreview, setShowPreview] = useState(false);

  // Load initial data
  useEffect(() => {
    dispatch(fetchBlogCategories());
    dispatch(fetchPopularTags(50));
  }, [dispatch]);
// console.log(categories)
  // Populate form if editing
  useEffect(() => {
    if (isEdit && blogData) {
      setFormData({
        title: blogData.title || '',
        slug: blogData.slug || '',
        excerpt: blogData.excerpt || '',
        content: blogData.content || '',
        featuredImage: blogData.featuredImage || '',
        category: blogData.category || '',
        tags: blogData.tags || [],
        status: blogData.status || 'draft',
        readTime: blogData.readTime || 0,
        seo: {
          metaTitle: blogData.seo?.metaTitle || '',
          metaDescription: blogData.seo?.metaDescription || '',
          keywords: blogData.seo?.keywords || []
        }
      });
    }
  }, [isEdit, blogData]);

  // Auto-generate slug from title
  const generateSlug = (title) => {
    return title
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'title') {
      setFormData(prev => ({
        ...prev,
        [name]: value,
        slug: generateSlug(value),
        seo: {
          ...prev.seo,
          metaTitle: value.length <= 60 ? value : value.substring(0, 57) + '...'
        }
      }));
    } else if (name === 'excerpt') {
      setFormData(prev => ({
        ...prev,
        [name]: value,
        seo: {
          ...prev.seo,
          metaDescription: value.length <= 160 ? value : value.substring(0, 157) + '...'
        }
      }));
    } else if (name.startsWith('seo.')) {
      const seoField = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        seo: {
          ...prev.seo,
          [seoField]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleTagAdd = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()]
      }));
      setNewTag('');
    }
  };

  const handleTagRemove = (tagToRemove) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handlePopularTagAdd = (tag) => {
    if (!formData.tags.includes(tag)) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, tag]
      }));
    }
  };

  // Calculate read time based on content
  const calculateReadTime = (content) => {
    const wordsPerMinute = 200;
    const words = content.trim().split(/\s+/).length;
    return Math.ceil(words / wordsPerMinute);
  };

  const validateForm = () => {
    const newErrors = {};

    // if (!formData.title.trim()) newErrors.title = 'Title is required';
    // if (!formData.excerpt.trim()) newErrors.excerpt = 'Excerpt is required';
    // if (!formData.content.trim()) newErrors.content = 'Content is required';
    // if (!formData.category) newErrors.category = 'Category is required';
    // if (!formData.featuredImage.trim()) newErrors.featuredImage = 'Featured image is required';

    // if (formData.title.length > 200) newErrors.title = 'Title must be less than 200 characters';
    // if (formData.excerpt.length > 500) newErrors.excerpt = 'Excerpt must be less than 500 characters';
    // if (formData.content.length < 100) newErrors.content = 'Content must be at least 100 characters';

    // setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);
    try {
      const submitData = {
        ...formData,
        // Calculate read time automatically
        readTime: calculateReadTime(formData.content),
        // Convert tags array to ensure it's properly formatted
        tags: formData.tags.filter(tag => tag.trim()),
        // Ensure SEO keywords is an array
        seo: {
          ...formData.seo,
          keywords: Array.isArray(formData.seo.keywords)
            ? formData.seo.keywords
            : formData.seo.keywords.split(',').map(k => k.trim()).filter(k => k)
        }
      };

      // Log the data structure for debugging
      console.log('Blog data being submitted:', JSON.stringify(submitData, null, 2));

      if (isEdit) {
        await dispatch(updateBlog({ blogId: blogData._id, blogData: submitData })).unwrap();
      } else {
        await dispatch(createBlog(submitData)).unwrap();
      }

      navigate('/admin/blogs');
    } catch (error) {
      console.error('Error saving blog:', error);
      setErrors({ submit: error || 'Failed to save blog' });
    } finally {
      setLoading(false);
    }
  };

  const handleSaveAsDraft = () => {
    setFormData(prev => ({ ...prev, status: 'draft' }));
    setTimeout(() => handleSubmit({ preventDefault: () => {} }), 100);
  };

  const handlePublish = () => {
    setFormData(prev => ({ ...prev, status: 'published' }));
    setTimeout(() => handleSubmit({ preventDefault: () => {} }), 100);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-sm">
        <div className="px-6 py-4 border-b border-gray-200">
          <h1 className="text-2xl font-bold text-gray-900">
            {isEdit ? 'Edit Blog Post' : 'Create New Blog Post'}
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Title *
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter blog title..."
            />
            {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title}</p>}
          </div>

          {/* Slug */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Slug
            </label>
            <input
              type="text"
              name="slug"
              value={formData.slug}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              placeholder="url-friendly-slug"
            />
            <p className="mt-1 text-sm text-gray-500">
              URL: /blogs/{formData.slug || 'your-blog-slug'}
            </p>
          </div>

          {/* Featured Image */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Featured Image URL *
            </label>
            <input
              type="url"
              name="featuredImage"
              value={formData.featuredImage}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              placeholder="https://example.com/image.jpg"
            />
            {errors.featuredImage && <p className="mt-1 text-sm text-red-600">{errors.featuredImage}</p>}
            {formData.featuredImage && (
              <div className="mt-2">
                <img
                  src={formData.featuredImage}
                  alt="Preview"
                  className="w-32 h-20 object-cover rounded border"
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
              </div>
            )}
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category *
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select a category</option>
              {blogCategories.map((cat) => (
                <option key={cat.value} value={cat.value}>
                  {cat.label}
                </option>
              ))}
            </select>
            {errors.category && <p className="mt-1 text-sm text-red-600">{errors.category}</p>}
          </div>

          {/* Excerpt */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Excerpt *
            </label>
            <textarea
              name="excerpt"
              value={formData.excerpt}
              onChange={handleInputChange}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Brief description of the blog post..."
            />
            <p className="mt-1 text-sm text-gray-500">
              {formData.excerpt.length}/500 characters
            </p>
            {errors.excerpt && <p className="mt-1 text-sm text-red-600">{errors.excerpt}</p>}
          </div>

          {/* Content */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Content *
            </label>
            <RichTextEditor
              value={formData.content}
              onChange={handleInputChange}
              placeholder="Write your blog content here... You can use markdown formatting."
            />
            <p className="mt-1 text-sm text-gray-500">
              {formData.content.length} characters (minimum 100) • Estimated read time: {calculateReadTime(formData.content)} min
            </p>
            {errors.content && <p className="mt-1 text-sm text-red-600">{errors.content}</p>}
          </div>

          {/* Tags */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tags
            </label>
            
            {/* Add new tag */}
            <div className="flex gap-2 mb-3">
              <input
                type="text"
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleTagAdd())}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Add a tag..."
              />
              <button
                type="button"
                onClick={handleTagAdd}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Add
              </button>
            </div>

            {/* Current tags */}
            {formData.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-3">
                {formData.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800"
                  >
                    #{tag}
                    <button
                      type="button"
                      onClick={() => handleTagRemove(tag)}
                      className="ml-2 text-blue-600 hover:text-blue-800"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            )}

            {/* Popular tags */}
            {popularTags.length > 0 && (
              <div>
                <p className="text-sm text-gray-600 mb-2">Popular tags:</p>
                <div className="flex flex-wrap gap-2">
                  {popularTags.slice(0, 10).map((tag) => (
                    <button
                      key={tag.tag}
                      type="button"
                      onClick={() => handlePopularTagAdd(tag.tag)}
                      disabled={formData.tags.includes(tag.tag)}
                      className={`px-2 py-1 text-xs rounded-full transition-colors ${
                        formData.tags.includes(tag.tag)
                          ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      #{tag.tag} ({tag.count})
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* SEO Section */}
          <div className="border-t pt-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">SEO Settings</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Meta Title
                </label>
                <input
                  type="text"
                  name="seo.metaTitle"
                  value={formData.seo.metaTitle}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="SEO title (auto-generated from title)"
                />
                <p className="mt-1 text-sm text-gray-500">
                  {formData.seo.metaTitle.length}/60 characters
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Meta Description
                </label>
                <textarea
                  name="seo.metaDescription"
                  value={formData.seo.metaDescription}
                  onChange={handleInputChange}
                  rows={2}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="SEO description (auto-generated from excerpt)"
                />
                <p className="mt-1 text-sm text-gray-500">
                  {formData.seo.metaDescription.length}/160 characters
                </p>
              </div>
            </div>
          </div>

          {/* Error Message */}
          {errors.submit && (
            <div className="bg-red-50 border border-red-200 rounded-md p-4">
              <p className="text-red-600">{errors.submit}</p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex items-center justify-between pt-6 border-t">
            <button
              type="button"
              onClick={() => navigate('/admin/blogs')}
              className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
            >
              Cancel
            </button>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setShowPreview(true)}
                className="px-6 py-2 text-blue-700 bg-blue-50 border border-blue-200 rounded-md hover:bg-blue-100 transition-colors"
              >
                Preview
              </button>

              <button
                type="button"
                onClick={handleSaveAsDraft}
                disabled={loading}
                className="px-6 py-2 text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50"
              >
                {loading ? 'Saving...' : 'Save as Draft'}
              </button>

              <button
                type="button"
                onClick={handlePublish}
                disabled={loading}
                className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
              >
                {loading ? 'Publishing...' : isEdit ? 'Update & Publish' : 'Publish'}
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* Blog Preview Modal */}
      {showPreview && (
        <BlogPreview
          blogData={formData}
          onClose={() => setShowPreview(false)}
        />
      )}
    </div>
  );
};

export default BlogForm;
