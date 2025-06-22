// src/pages/admin/AdminDestinationsPage.jsx
import React from 'react';
import AdminDestinationsList from '../../components/admin/destinations/AdminDestinationsList';

const AdminDestinationsPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <AdminDestinationsList />
    </div>
  );
};

export default AdminDestinationsPage;
