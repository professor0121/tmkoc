// src/pages/admin/CreateBlogPage.jsx
import React from 'react';
import BlogForm from '../../components/admin/blogs/BlogForm';

const CreateBlogPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="py-6">
        <BlogForm isEdit={false} />
      </div>
    </div>
  );
};

export default CreateBlogPage;
