// src/components/blogs/TagFilter.jsx
import React from 'react';

const TagFilter = ({ 
  tags = [], 
  selectedTags = [], 
  onTagToggle,
  loading = false,
  className = '',
  maxTags = 20
}) => {
  const handleTagClick = (tag) => {
    onTagToggle(tag);
  };

  const isTagSelected = (tag) => {
    return selectedTags.includes(tag);
  };

  if (loading) {
    return (
      <div className={`space-y-2 ${className}`}>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Popular Tags</h3>
        <div className="flex flex-wrap gap-2">
          {[...Array(8)].map((_, index) => (
            <div key={index} className="animate-pulse">
              <div className="h-6 bg-gray-200 rounded-full w-16"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!tags || tags.length === 0) {
    return null;
  }

  const displayTags = tags.slice(0, maxTags);

  return (
    <div className={className}>
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Popular Tags</h3>
      
      {/* Clear Tags Button */}
      {selectedTags.length > 0 && (
        <div className="mb-3">
          <button
            onClick={() => onTagToggle(null)} // Pass null to clear all tags
            className="text-sm text-red-600 hover:text-red-800 font-medium"
          >
            Clear all tags ({selectedTags.length})
          </button>
        </div>
      )}

      {/* Tags */}
      <div className="flex flex-wrap gap-2">
        {displayTags.map((tag) => (
          <button
            key={tag.tag}
            onClick={() => handleTagClick(tag.tag)}
            className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium transition-colors ${
              isTagSelected(tag.tag)
                ? 'bg-blue-600 text-white hover:bg-blue-700'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <span>#{tag.tag}</span>
            <span className="ml-1 text-xs opacity-75">({tag.count})</span>
          </button>
        ))}
      </div>

      {/* Show More Tags */}
      {tags.length > maxTags && (
        <div className="mt-3">
          <span className="text-sm text-gray-500">
            +{tags.length - maxTags} more tags available
          </span>
        </div>
      )}
    </div>
  );
};

export default TagFilter;
