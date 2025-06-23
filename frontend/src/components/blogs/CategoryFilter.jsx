// src/components/blogs/CategoryFilter.jsx
import React from 'react';

const CategoryFilter = ({ 
  categories = [], 
  selectedCategory = '', 
  onCategoryChange,
  loading = false,
  className = ''
}) => {
  const handleCategoryClick = (category) => {
    // If clicking the same category, clear the filter
    if (selectedCategory === category) {
      onCategoryChange('');
    } else {
      onCategoryChange(category);
    }
  };

  if (loading) {
    return (
      <div className={`space-y-2 ${className}`}>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Categories</h3>
        <div className="space-y-2">
          {[...Array(6)].map((_, index) => (
            <div key={index} className="animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!categories || categories.length === 0) {
    return null;
  }

  return (
    <div className={className}>
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Categories</h3>
      
      <div className="space-y-2">
        {/* All Categories Option */}
        <button
          onClick={() => onCategoryChange('')}
          className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
            selectedCategory === ''
              ? 'bg-blue-100 text-blue-800 font-medium'
              : 'text-gray-700 hover:bg-gray-100'
          }`}
        >
          <div className="flex items-center justify-between">
            <span>All Categories</span>
            <span className="text-xs text-gray-500">
              {categories.reduce((total, cat) => total + cat.count, 0)}
            </span>
          </div>
        </button>

        {/* Individual Categories */}
        {categories.map((category) => (
          <button
            key={category.category}
            onClick={() => handleCategoryClick(category.category)}
            className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
              selectedCategory === category.category
                ? 'bg-blue-100 text-blue-800 font-medium'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <div className="flex items-center justify-between">
              <span>{category.category}</span>
              <span className="text-xs text-gray-500">{category.count}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;
