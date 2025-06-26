// src/components/admin/destinations/AdminDestinationsList.jsx
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  getAllDestinations,
  deleteDestination,
  toggleFeaturedStatus,
  clearError
} from '../../../redux/destinations/destinationSlice';

const AdminDestinationsList = () => {
  const dispatch = useDispatch();
  const { destinations, loading, error } = useSelector((state) => state.destinations);
  const { user } = useSelector((state) => state.auth);

  // Debug log to check destinations data
  console.log('Destinations data:', destinations, 'Type:', typeof destinations, 'Is Array:', Array.isArray(destinations));

  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const categories = [
    'adventure', 'cultural', 'religious', 'wildlife', 'beach', 
    'hill-station', 'heritage', 'urban', 'rural'
  ];

  useEffect(() => {
    if (user?.role === 'admin') {
      dispatch(getAllDestinations());
    }
  }, [dispatch, user]);

  // Filter destinations based on search and filters
  const filteredDestinations = (destinations || []).filter(destination => {
    // Check if destination exists and has required properties
    if (!destination || !destination.name || !destination.city || !destination.country) {
      return false;
    }

    const matchesSearch = destination.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         destination.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         destination.country.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory = !categoryFilter || destination.category === categoryFilter;

    const matchesStatus = statusFilter === 'all' ||
                         (statusFilter === 'active' && destination.isActive) ||
                         (statusFilter === 'inactive' && !destination.isActive) ||
                         (statusFilter === 'featured' && destination.isFeatured) ||
                         (statusFilter === 'popular' && destination.isPopular);

    return matchesSearch && matchesCategory && matchesStatus;
  });

  const handleDelete = async (id) => {
    if (deleteConfirm === id) {
      try {
        await dispatch(deleteDestination(id)).unwrap();
        setDeleteConfirm(null);
      } catch (error) {
        console.error('Failed to delete destination:', error);
      }
    } else {
      setDeleteConfirm(id);
    }
  };

  const handleToggleFeatured = async (id, currentStatus) => {
    try {
      await dispatch(toggleFeaturedStatus({ id, featured: !currentStatus })).unwrap();
    } catch (error) {
      console.error('Failed to toggle featured status:', error);
    }
  };

  if (!user || user.role !== 'admin') {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          Access denied. Admin privileges required.
        </div>
      </div>
    );
  }

  // Loading state
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading destinations...</p>
        </div>
      </div>
    );
  }

  // Check if destinations array is valid
  if (!destinations || !Array.isArray(destinations)) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-8">
          <p className="text-gray-600">No destinations data available.</p>
          <button
            onClick={() => dispatch(getAllDestinations())}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Load Destinations
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Manage Destinations</h1>
        <Link
          to="/admin/destinations/create"
          className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
        >
          Add New Destination
        </Link>
      </div>

      {/* Error Display */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          <span className="block sm:inline">{error}</span>
          <button
            onClick={() => dispatch(clearError())}
            className="float-right text-red-500 hover:text-red-700"
          >
            ×
          </button>
        </div>
      )}

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Search */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Search
            </label>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search destinations..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Category Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category
            </label>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </option>
              ))}
            </select>
          </div>

          {/* Status Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Status
            </label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="featured">Featured</option>
              <option value="popular">Popular</option>
            </select>
          </div>

          {/* Results Count */}
          <div className="flex items-end">
            <div className="text-sm text-gray-600">
              Showing {filteredDestinations.length} of {destinations.length} destinations
            </div>
          </div>
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex justify-center items-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        </div>
      )}

      {/* Destinations Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Destination
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Location
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Rating
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredDestinations.map((destination) => (
                <tr key={destination._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {destination.images && destination.images[0] && (
                        <img
                          src={destination.images[0].url}
                          alt={destination.name}
                          className="h-10 w-10 rounded-lg object-cover mr-3"
                        />
                      )}
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {destination.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          {destination.shortDescription?.substring(0, 50)}...
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                      {destination.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {destination.city}, {destination.state}
                    <br />
                    <span className="text-gray-500">{destination.country}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {destination.rating ? (
                      <div>
                        <span className="text-yellow-500">★</span>
                        {destination.rating.average} ({destination.rating.totalReviews})
                      </div>
                    ) : (
                      <span className="text-gray-400">No ratings</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex flex-col space-y-1">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        destination.isActive 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {destination.isActive ? 'Active' : 'Inactive'}
                      </span>
                      {destination.isFeatured && (
                        <span className="px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full">
                          Featured
                        </span>
                      )}
                      {destination.isPopular && (
                        <span className="px-2 py-1 text-xs font-medium bg-purple-100 text-purple-800 rounded-full">
                          Popular
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <Link
                        to={`/admin/destinations/edit/${destination._id}`}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleToggleFeatured(destination._id, destination.isFeatured)}
                        className="text-yellow-600 hover:text-yellow-900"
                      >
                        {destination.isFeatured ? 'Unfeature' : 'Feature'}
                      </button>
                      <button
                        onClick={() => handleDelete(destination._id)}
                        className={`${
                          deleteConfirm === destination._id
                            ? 'text-red-800 bg-red-100 px-2 py-1 rounded'
                            : 'text-red-600 hover:text-red-900'
                        }`}
                      >
                        {deleteConfirm === destination._id ? 'Confirm?' : 'Delete'}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Empty State */}
        {filteredDestinations.length === 0 && !loading && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No destinations found.</p>
            <Link
              to="/admin/destinations/create"
              className="mt-4 inline-block bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
            >
              Create First Destination
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDestinationsList;
