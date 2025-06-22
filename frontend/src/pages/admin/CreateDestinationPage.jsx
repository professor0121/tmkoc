// src/pages/admin/CreateDestinationPage.jsx
import React from 'react';
import DestinationForm from '../../components/admin/destinations/DestinationForm';

const CreateDestinationPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <DestinationForm isEdit={false} />
    </div>
  );
};

export default CreateDestinationPage;
