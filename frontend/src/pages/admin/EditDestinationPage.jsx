// src/pages/admin/EditDestinationPage.jsx
import React from 'react';
import DestinationForm from '../../components/admin/destinations/DestinationForm';

const EditDestinationPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <DestinationForm isEdit={true} />
    </div>
  );
};

export default EditDestinationPage;
