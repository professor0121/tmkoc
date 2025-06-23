// src/pages/BlogsPage.jsx
import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import Header from '../components/Header';
import BlogList from '../components/blogs/BlogList';
import CategoryFilter from '../components/blogs/CategoryFilter';
import TagFilter from '../components/blogs/TagFilter';
import SearchBar from '../components/blogs/SearchBar';
import {
  fetchPublishedBlogs,
  fetchBlogCategories,
  fetchPopularTags,
  searchBlogsThunk,
  updateFilters,
  clearFilters
} from '../redux/blogs/blogSlice';

const BlogsPage = () => {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  
  const {
    blogs,
    totalBlogs,
    currentPage,
    totalPages,
    categories,
    popularTags,
    filters,
    loading,
    error
  } = useSelector((state) => state.blogs);

  const [localFilters, setLocalFilters] = useState({
    category: searchParams.get('category') || '',
    tags: searchParams.get('tags') ? searchParams.get('tags').split(',') : [],
    search: searchParams.get('search') || '',
    sortBy: searchParams.get('sortBy') || 'publishedAt',
    sortOrder: searchParams.get('sortOrder') || 'desc'
  });

  // Load initial data
  useEffect(() => {
    dispatch(fetchBlogCategories());
    dispatch(fetchPopularTags(20));
  }, [dispatch]);

  // Update Redux filters when local filters change
  useEffect(() => {
    dispatch(updateFilters(localFilters));
  }, [localFilters, dispatch]);

  // Fetch blogs when filters change
  useEffect(() => {
    const params = {
      page: parseInt(searchParams.get('page')) || 1,
      limit: 12,
      ...localFilters,
      tags: localFilters.tags.length > 0 ? localFilters.tags.join(',') : undefined
    };

    if (localFilters.search) {
      dispatch(searchBlogsThunk({ query: localFilters.search, params }));
    } else {
      dispatch(fetchPublishedBlogs(params));
    }
  }, [localFilters, searchParams, dispatch]);

  // Update URL when filters change
  useEffect(() => {
    const params = new URLSearchParams();
    
    if (localFilters.category) params.set('category', localFilters.category);
    if (localFilters.tags.length > 0) params.set('tags', localFilters.tags.join(','));
    if (localFilters.search) params.set('search', localFilters.search);
    if (localFilters.sortBy !== 'publishedAt') params.set('sortBy', localFilters.sortBy);
    if (localFilters.sortOrder !== 'desc') params.set('sortOrder', localFilters.sortOrder);
    
    const currentPage = parseInt(searchParams.get('page')) || 1;
    if (currentPage > 1) params.set('page', currentPage.toString());

    setSearchParams(params);
  }, [localFilters, searchParams, setSearchParams]);

  // Handle search
  const handleSearch = useCallback((searchTerm) => {
    setLocalFilters(prev => ({ ...prev, search: searchTerm }));
    // Reset page when searching
    const params = new URLSearchParams(searchParams);
    params.delete('page');
    setSearchParams(params);
  }, [searchParams, setSearchParams]);

  // Handle category change
  const handleCategoryChange = useCallback((category) => {
    setLocalFilters(prev => ({ ...prev, category }));
    // Reset page when filtering
    const params = new URLSearchParams(searchParams);
    params.delete('page');
    setSearchParams(params);
  }, [searchParams, setSearchParams]);

  // Handle tag toggle
  const handleTagToggle = useCallback((tag) => {
    if (tag === null) {
      // Clear all tags
      setLocalFilters(prev => ({ ...prev, tags: [] }));
    } else {
      setLocalFilters(prev => ({
        ...prev,
        tags: prev.tags.includes(tag)
          ? prev.tags.filter(t => t !== tag)
          : [...prev.tags, tag]
      }));
    }
    // Reset page when filtering
    const params = new URLSearchParams(searchParams);
    params.delete('page');
    setSearchParams(params);
  }, [searchParams, setSearchParams]);

  // Handle sort change
  const handleSortChange = useCallback((sortBy, sortOrder = 'desc') => {
    setLocalFilters(prev => ({ ...prev, sortBy, sortOrder }));
  }, []);

  // Handle page change
  const handlePageChange = useCallback((page) => {
    const params = new URLSearchParams(searchParams);
    if (page > 1) {
      params.set('page', page.toString());
    } else {
      params.delete('page');
    }
    setSearchParams(params);
  }, [searchParams, setSearchParams]);

  // Clear all filters
  const handleClearFilters = useCallback(() => {
    setLocalFilters({
      category: '',
      tags: [],
      search: '',
      sortBy: 'publishedAt',
      sortOrder: 'desc'
    });
    setSearchParams({});
    dispatch(clearFilters());
  }, [dispatch, setSearchParams]);

  // Check if any filters are active
  const hasActiveFilters = localFilters.category || localFilters.tags.length > 0 || localFilters.search;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Travel Blog
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover amazing travel stories, tips, and guides from around the world
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-8">
          <SearchBar
            onSearch={handleSearch}
            initialValue={localFilters.search}
            placeholder="Search for travel stories, destinations, tips..."
          />
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <aside className="lg:w-1/4">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-8">
              {/* Active Filters */}
              {hasActiveFilters && (
                <div className="mb-6 pb-6 border-b border-gray-200">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-lg font-semibold text-gray-900">Active Filters</h3>
                    <button
                      onClick={handleClearFilters}
                      className="text-sm text-red-600 hover:text-red-800 font-medium"
                    >
                      Clear All
                    </button>
                  </div>
                  
                  {/* Active filter tags */}
                  <div className="space-y-2">
                    {localFilters.category && (
                      <div className="flex items-center justify-between bg-blue-50 px-3 py-1 rounded-full">
                        <span className="text-sm text-blue-800">Category: {localFilters.category}</span>
                        <button
                          onClick={() => handleCategoryChange('')}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          ×
                        </button>
                      </div>
                    )}
                    
                    {localFilters.search && (
                      <div className="flex items-center justify-between bg-green-50 px-3 py-1 rounded-full">
                        <span className="text-sm text-green-800">Search: "{localFilters.search}"</span>
                        <button
                          onClick={() => handleSearch('')}
                          className="text-green-600 hover:text-green-800"
                        >
                          ×
                        </button>
                      </div>
                    )}
                    
                    {localFilters.tags.map(tag => (
                      <div key={tag} className="flex items-center justify-between bg-purple-50 px-3 py-1 rounded-full">
                        <span className="text-sm text-purple-800">#{tag}</span>
                        <button
                          onClick={() => handleTagToggle(tag)}
                          className="text-purple-600 hover:text-purple-800"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Sort Options */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Sort By</h3>
                <select
                  value={`${localFilters.sortBy}-${localFilters.sortOrder}`}
                  onChange={(e) => {
                    const [sortBy, sortOrder] = e.target.value.split('-');
                    handleSortChange(sortBy, sortOrder);
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="publishedAt-desc">Latest First</option>
                  <option value="publishedAt-asc">Oldest First</option>
                  <option value="views-desc">Most Viewed</option>
                  <option value="likes-desc">Most Liked</option>
                  <option value="title-asc">Title A-Z</option>
                  <option value="title-desc">Title Z-A</option>
                </select>
              </div>

              {/* Category Filter */}
              <CategoryFilter
                categories={categories}
                selectedCategory={localFilters.category}
                onCategoryChange={handleCategoryChange}
                loading={loading.categories}
                className="mb-6"
              />

              {/* Tag Filter */}
              <TagFilter
                tags={popularTags}
                selectedTags={localFilters.tags}
                onTagToggle={handleTagToggle}
                loading={loading.tags}
                maxTags={15}
              />
            </div>
          </aside>

          {/* Main Content */}
          <div className="lg:w-3/4">
            {/* Results Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {localFilters.search ? `Search Results` : 'Latest Articles'}
                </h2>
                <p className="text-gray-600 mt-1">
                  {loading.blogs ? 'Loading...' : `${totalBlogs} article${totalBlogs !== 1 ? 's' : ''} found`}
                </p>
              </div>
            </div>

            {/* Blog List */}
            <BlogList
              blogs={blogs}
              loading={loading.blogs || loading.search}
              error={error.blogs || error.search}
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
              emptyMessage={
                hasActiveFilters 
                  ? "No blogs match your current filters. Try adjusting your search criteria."
                  : "No blogs available at the moment."
              }
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default BlogsPage;
