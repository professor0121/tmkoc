// src/pages/DestinationsPage.jsx
import React from 'react';
import Header from '../components/Header';
import DestinationsList from '../components/destinations/DestinationsList';
import Footer from '../components/home/Footer';

const DestinationsPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Explore Destinations
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover breathtaking destinations around the world. From serene beaches to majestic mountains,
            find your perfect getaway and create unforgettable memories.
          </p>
        </div>

        {/* Destinations Content */}
        <DestinationsList />
      </main>
      <Footer />
    </div>
  );
};

export default DestinationsPage;
