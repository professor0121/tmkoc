// src/pages/DestinationsPage.jsx
import React from 'react';
import DestinationsList from '../components/destinations/DestinationsList';

const DestinationsPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <DestinationsList />
    </div>
  );
};

export default DestinationsPage;
