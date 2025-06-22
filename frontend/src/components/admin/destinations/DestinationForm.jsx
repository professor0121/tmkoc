// src/components/admin/destinations/DestinationForm.jsx
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import {
  createDestination,
  updateDestination,
  getDestinationById,
  clearCurrentDestination,
  clearError
} from '../../../redux/destinations/destinationSlice';

const DestinationForm = ({ isEdit = false }) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentDestination, loading, error } = useSelector((state) => state.destinations);
  const { user } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    shortDescription: '',
    country: '',
    state: '',
    city: '',
    region: '',
    coordinates: {
      latitude: '',
      longitude: ''
    },
    category: 'cultural',
    climate: {
      type: 'temperate',
      bestVisitMonths: [],
      averageTemperature: {
        min: '',
        max: ''
      },
      rainfallPattern: ''
    },
    attractions: [],
    accommodation: {
      budget: {
        available: false,
        priceRange: { min: '', max: '' },
        options: []
      },
      midRange: {
        available: false,
        priceRange: { min: '', max: '' },
        options: []
      },
      luxury: {
        available: false,
        priceRange: { min: '', max: '' },
        options: []
      }
    },
    transportation: {
      nearestAirport: {
        name: '',
        code: '',
        distance: ''
      },
      nearestRailway: {
        name: '',
        distance: ''
      },
      roadConnectivity: {
        highways: [],
        accessibility: 'good'
      },
      localTransport: []
    },
    images: [],
    languages: [],
    currency: 'INR',
    timeZone: 'Asia/Kolkata',
    tags: [],
    seoData: {
      metaTitle: '',
      metaDescription: '',
      keywords: [],
      slug: ''
    },
    isActive: true,
    isFeatured: false,
    isPopular: false
  });

  const [newAttraction, setNewAttraction] = useState({
    name: '',
    type: '',
    description: '',
    entryFee: '',
    timings: '',
    rating: ''
  });

  const [newImage, setNewImage] = useState({
    url: '',
    alt: '',
    category: 'landscape',
    isPrimary: false
  });

  const categories = [
    'adventure', 'cultural', 'religious', 'wildlife', 'beach',
    'hill-station', 'heritage', 'urban', 'rural'
  ];

  const climateTypes = [
    'tropical', 'temperate', 'arid', 'cold', 'mediterranean', 'continental'
  ];

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const imageCategories = ['landscape', 'attraction', 'culture', 'food', 'accommodation'];

  useEffect(() => {
    if (isEdit && id) {
      dispatch(getDestinationById(id));
    }

    return () => {
      dispatch(clearCurrentDestination());
    };
  }, [dispatch, isEdit, id]);

  useEffect(() => {
    if (isEdit && currentDestination) {
      setFormData({
        ...currentDestination,
        coordinates: currentDestination.coordinates || { latitude: '', longitude: '' },
        climate: {
          ...currentDestination.climate,
          bestVisitMonths: currentDestination.climate?.bestVisitMonths || [],
          averageTemperature: currentDestination.climate?.averageTemperature || { min: '', max: '' }
        },
        attractions: currentDestination.attractions || [],
        images: currentDestination.images || [],
        languages: currentDestination.languages || [],
        tags: currentDestination.tags || [],
        seoData: {
          ...currentDestination.seoData,
          keywords: currentDestination.seoData?.keywords || []
        }
      });
    }
  }, [isEdit, currentDestination]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (name.includes('.')) {
      const [parent, child, grandchild] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: grandchild ? {
            ...prev[parent][child],
            [grandchild]: type === 'checkbox' ? checked : value
          } : (type === 'checkbox' ? checked : value)
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    }
  };

  const handleArrayChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value.split(',').map(item => item.trim()).filter(item => item)
    }));
  };

  const handleMonthsChange = (month) => {
    setFormData(prev => ({
      ...prev,
      climate: {
        ...prev.climate,
        bestVisitMonths: prev.climate.bestVisitMonths.includes(month)
          ? prev.climate.bestVisitMonths.filter(m => m !== month)
          : [...prev.climate.bestVisitMonths, month]
      }
    }));
  };

  const addAttraction = () => {
    if (newAttraction.name && newAttraction.type) {
      setFormData(prev => ({
        ...prev,
        attractions: [...prev.attractions, { ...newAttraction, entryFee: Number(newAttraction.entryFee), rating: Number(newAttraction.rating) }]
      }));
      setNewAttraction({
        name: '',
        type: '',
        description: '',
        entryFee: '',
        timings: '',
        rating: ''
      });
    }
  };

  const removeAttraction = (index) => {
    setFormData(prev => ({
      ...prev,
      attractions: prev.attractions.filter((_, i) => i !== index)
    }));
  };

  const addImage = () => {
    if (newImage.url && newImage.alt) {
      setFormData(prev => ({
        ...prev,
        images: [...prev.images, newImage]
      }));
      setNewImage({
        url: '',
        alt: '',
        category: 'landscape',
        isPrimary: false
      });
    }
  };

  const removeImage = (index) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Generate slug if not provided
    if (!formData.seoData.slug) {
      formData.seoData.slug = formData.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
    }

    try {
      if (isEdit) {
        await dispatch(updateDestination({ id, destinationData: formData }));
      } else {
        await dispatch(createDestination(formData));
      }
      navigate('/admin/destinations');
    } catch (error) {
      console.error('Error saving destination:', error);
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

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          {isEdit ? 'Edit Destination' : 'Create New Destination'}
        </h1>
        <button
          onClick={() => navigate('/admin/destinations')}
          className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
        >
          Back to List
        </button>
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

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Basic Information */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Basic Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Destination Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category *
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Short Description *
              </label>
              <input
                type="text"
                name="shortDescription"
                value={formData.shortDescription}
                onChange={handleInputChange}
                required
                maxLength={300}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description *
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                required
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Location Information */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Location Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Country *
              </label>
              <input
                type="text"
                name="country"
                value={formData.country}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                State *
              </label>
              <input
                type="text"
                name="state"
                value={formData.state}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                City *
              </label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Region
              </label>
              <input
                type="text"
                name="region"
                value={formData.region}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Latitude
              </label>
              <input
                type="number"
                step="any"
                name="coordinates.latitude"
                value={formData.coordinates.latitude}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Longitude
              </label>
              <input
                type="number"
                step="any"
                name="coordinates.longitude"
                value={formData.coordinates.longitude}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Climate Information */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Climate Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Climate Type
              </label>
              <select
                name="climate.type"
                value={formData.climate.type}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {climateTypes.map(type => (
                  <option key={type} value={type}>
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Rainfall Pattern
              </label>
              <input
                type="text"
                name="climate.rainfallPattern"
                value={formData.climate.rainfallPattern}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Min Temperature (°C)
              </label>
              <input
                type="number"
                name="climate.averageTemperature.min"
                value={formData.climate.averageTemperature.min}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Max Temperature (°C)
              </label>
              <input
                type="number"
                name="climate.averageTemperature.max"
                value={formData.climate.averageTemperature.max}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Best Visit Months
              </label>
              <div className="grid grid-cols-3 md:grid-cols-4 gap-2">
                {months.map(month => (
                  <label key={month} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.climate.bestVisitMonths.includes(month)}
                      onChange={() => handleMonthsChange(month)}
                      className="mr-2"
                    />
                    <span className="text-sm">{month}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Additional Information */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Additional Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Languages (comma-separated)
              </label>
              <input
                type="text"
                value={formData.languages.join(', ')}
                onChange={(e) => handleArrayChange('languages', e.target.value)}
                placeholder="English, Hindi, Local Language"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Currency
              </label>
              <input
                type="text"
                name="currency"
                value={formData.currency}
                onChange={handleInputChange}
                placeholder="INR"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Time Zone
              </label>
              <input
                type="text"
                name="timeZone"
                value={formData.timeZone}
                onChange={handleInputChange}
                placeholder="Asia/Kolkata"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tags (comma-separated)
              </label>
              <input
                type="text"
                value={formData.tags.join(', ')}
                onChange={(e) => handleArrayChange('tags', e.target.value)}
                placeholder="beach, adventure, culture"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* SEO Information */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">SEO Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Meta Title
              </label>
              <input
                type="text"
                name="seoData.metaTitle"
                value={formData.seoData.metaTitle}
                onChange={handleInputChange}
                maxLength={60}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                URL Slug
              </label>
              <input
                type="text"
                name="seoData.slug"
                value={formData.seoData.slug}
                onChange={handleInputChange}
                placeholder="auto-generated from name"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Meta Description
              </label>
              <textarea
                name="seoData.metaDescription"
                value={formData.seoData.metaDescription}
                onChange={handleInputChange}
                maxLength={160}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Keywords (comma-separated)
              </label>
              <input
                type="text"
                value={formData.seoData.keywords.join(', ')}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  seoData: {
                    ...prev.seoData,
                    keywords: e.target.value.split(',').map(k => k.trim()).filter(k => k)
                  }
                }))}
                placeholder="travel, destination, tourism"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Status Settings */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Status Settings</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                name="isActive"
                checked={formData.isActive}
                onChange={handleInputChange}
                className="mr-2"
              />
              <span className="text-sm font-medium">Active</span>
            </label>

            <label className="flex items-center">
              <input
                type="checkbox"
                name="isFeatured"
                checked={formData.isFeatured}
                onChange={handleInputChange}
                className="mr-2"
              />
              <span className="text-sm font-medium">Featured</span>
            </label>

            <label className="flex items-center">
              <input
                type="checkbox"
                name="isPopular"
                checked={formData.isPopular}
                onChange={handleInputChange}
                className="mr-2"
              />
              <span className="text-sm font-medium">Popular</span>
            </label>
          </div>
        </div>

        {/* Submit Buttons */}
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => navigate('/admin/destinations')}
            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50"
          >
            {loading ? 'Saving...' : (isEdit ? 'Update Destination' : 'Create Destination')}
          </button>
        </div>
      </form>
    </div>
  );
};

export default DestinationForm;
