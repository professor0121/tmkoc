// src/pages/BlogDetailPage.jsx
import React, { useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../components/Header';
import BlogDetail from '../components/blogs/BlogDetail';
import LoadingSpinner from '../components/common/LoadingSpinner';
import {
  fetchBlogBySlug,
  fetchRelatedBlogs,
  clearCurrentBlog
} from '../redux/blogs/blogSlice';

const BlogDetailPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    currentBlog,
    relatedBlogs,
    loading,
    error
  } = useSelector((state) => state.blogs);

  // Fetch blog data
  useEffect(() => {
    if (slug) {
      dispatch(fetchBlogBySlug(slug));
    }

    // Cleanup on unmount
    return () => {
      dispatch(clearCurrentBlog());
    };
  }, [slug, dispatch]);

  // Fetch related blogs when current blog is loaded
  useEffect(() => {
    if (currentBlog?._id) {
      dispatch(fetchRelatedBlogs({ blogId: currentBlog._id, limit: 6 }));
    }
  }, [currentBlog?._id, dispatch]);

  // Update document title
  useEffect(() => {
    if (currentBlog) {
      document.title = `${currentBlog.seo?.metaTitle || currentBlog.title} | Travel Blog`;
    }

    return () => {
      document.title = 'Travel Blog';
    };
  }, [currentBlog]);

  // Handle like callback
  const handleLike = () => {
    // The like action is handled in BlogDetail component
    // This callback can be used for additional actions if needed
  };

  // Loading state
  if (loading.currentBlog) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="flex justify-center items-center py-20">
            <LoadingSpinner size="xl" />
          </div>
        </main>
      </div>
    );
  }

  // Error state
  if (error.currentBlog) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="text-center py-20">
            <div className="bg-red-50 border border-red-200 rounded-lg p-8 max-w-md mx-auto">
              <svg className="w-16 h-16 text-red-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h2 className="text-2xl font-bold text-red-800 mb-4">Blog Not Found</h2>
              <p className="text-red-600 mb-6">{error.currentBlog}</p>
              <div className="space-y-3">
                <button
                  onClick={() => navigate('/blogs')}
                  className="w-full bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors"
                >
                  Browse All Blogs
                </button>
                <button
                  onClick={() => navigate(-1)}
                  className="w-full bg-gray-100 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Go Back
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  // No blog found
  if (!currentBlog) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="text-center py-20">
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 max-w-md mx-auto">
              <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
              </svg>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Blog Not Found</h2>
              <p className="text-gray-600 mb-6">The blog post you're looking for doesn't exist or has been removed.</p>
              <div className="space-y-3">
                <Link
                  to="/blogs"
                  className="inline-block w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Browse All Blogs
                </Link>
                <button
                  onClick={() => navigate(-1)}
                  className="w-full bg-gray-100 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Go Back
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">

      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="mb-8" aria-label="Breadcrumb">
          <ol className="flex items-center space-x-2 text-sm text-gray-600">
            <li>
              <Link to="/" className="hover:text-blue-600 transition-colors">
                Home
              </Link>
            </li>
            <li>
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </li>
            <li>
              <Link to="/blogs" className="hover:text-blue-600 transition-colors">
                Blog
              </Link>
            </li>
            <li>
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </li>
            <li className="text-gray-900 font-medium truncate">
              {currentBlog.title}
            </li>
          </ol>
        </nav>

        {/* Blog Content */}
        <div className="bg-white rounded-lg shadow-sm p-8">
          <BlogDetail
            blog={currentBlog}
            relatedBlogs={relatedBlogs}
            onLike={handleLike}
          />
        </div>

        {/* Back to Blogs */}
        <div className="mt-12 text-center">
          <Link
            to="/blogs"
            className="inline-flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span>Back to All Blogs</span>
          </Link>
        </div>
      </main>
    </div>
  );
};

export default BlogDetailPage;
