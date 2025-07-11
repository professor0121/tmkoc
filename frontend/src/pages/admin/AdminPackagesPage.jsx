// src/pages/admin/AdminPackagesPage.jsx
import React from 'react';
import AdminPackages from './Packages';

const AdminPackagesPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <AdminPackages />
      </div>
    </div>
  );
};

export default AdminPackagesPage;
