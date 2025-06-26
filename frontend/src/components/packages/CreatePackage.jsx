import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createPackage } from '../../redux/packages/packageSlice';

const initialForm = {
  title: '',
  shortDescription: '',
  description: '',
  destination: '',
  category: 'adventure',
  difficulty: 'easy',
  price: { adult: 0, child: 0, infant: 0 },
  duration: { days: 1, nights: 0 },
  groupSize: { min: 1, max: 10 },
  tags: [],
  inclusions: [],
  exclusions: [],
  itinerary: [],
  images: [],
  location: {
    country: '',
    state: '',
    city: '',
    coordinates: {
      latitude: 0,
      longitude: 0
    }
  },
  availability: [],
  features: [],
  transportation: {
    included: false,
    type: [],
    details: ''
  },
  accommodation: {
    type: '',
    rating: 3,
    details: ''
  },
  meals: {
    breakfast: false,
    lunch: false,
    dinner: false,
    details: ''
  },
  guide: {
    included: false,
    language: [],
    type: 'local'
  },
  cancellationPolicy: {
    refundable: true,
    cancellationDeadline: 7,
    refundPercentage: 80,
    terms: ''
  },
  isActive: true,
  isFeatured: false
};

const CreatePackageForm = ({ onSuccess }) => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.packages);
  const [form, setForm] = useState(initialForm);
  const [submitError, setSubmitError] = useState(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [activeTab, setActiveTab] = useState('basic');
  const [newTag, setNewTag] = useState('');
  const [newInclusion, setNewInclusion] = useState('');
  const [newExclusion, setNewExclusion] = useState('');
  const [newFeature, setNewFeature] = useState('');

  // Categories and options
  const categories = [
    'adventure', 'cultural', 'religious', 'wildlife', 'beach',
    'hill-station', 'heritage', 'honeymoon', 'family', 'business'
  ];

  const difficulties = ['easy', 'moderate', 'challenging', 'extreme'];
  const guideTypes = ['local', 'professional', 'expert'];
  const accommodationTypes = ['hotel', 'resort', 'guesthouse', 'homestay', 'camping', 'luxury'];
  const transportationTypes = ['flight', 'train', 'bus', 'car', 'boat', 'walking'];

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     if (name.includes('.')) {
//       const keys = name.split('.');
//       setForm((prev) => {
//         const updated = { ...prev };
//         let current = updated;
//         for (let i = 0; i < keys.length - 1; i++) {
//           current = current[keys[i]];
//         }
//         current[keys[keys.length - 1]] = value;
//         return updated;
//       });
//     } else {
//       setForm({ ...form, [name]: value });
//     }
//   };

const handleChange = (e) => {
  const { name, value, type, checked } = e.target;
  let val = value;

  if (type === 'number') {
    val = Number(value);
  } else if (type === 'checkbox') {
    val = checked;
  }

  if (name.includes('.')) {
    const keys = name.split('.');
    setForm((prev) => {
      const updated = { ...prev };
      let current = updated;
      for (let i = 0; i < keys.length - 1; i++) {
        current = current[keys[i]];
      }
      current[keys[keys.length - 1]] = val;
      return updated;
    });
  } else {
    setForm((prev) => ({ ...prev, [name]: val }));
  }
};

// Helper functions for managing arrays
const addToArray = (arrayName, value) => {
  if (value.trim()) {
    setForm(prev => ({
      ...prev,
      [arrayName]: [...prev[arrayName], value.trim()]
    }));
  }
};

const removeFromArray = (arrayName, index) => {
  setForm(prev => ({
    ...prev,
    [arrayName]: prev[arrayName].filter((_, i) => i !== index)
  }));
};

const addItineraryDay = () => {
  const newDay = {
    day: form.itinerary.length + 1,
    title: '',
    description: '',
    activities: [],
    meals: [],
    accommodation: ''
  };
  setForm(prev => ({
    ...prev,
    itinerary: [...prev.itinerary, newDay]
  }));
};

const updateItinerary = (index, field, value) => {
  setForm(prev => ({
    ...prev,
    itinerary: prev.itinerary.map((item, i) =>
      i === index ? { ...item, [field]: value } : item
    )
  }));
};

const addImage = () => {
  const newImage = {
    url: '',
    alt: '',
    isPrimary: form.images.length === 0
  };
  setForm(prev => ({
    ...prev,
    images: [...prev.images, newImage]
  }));
};

const updateImage = (index, field, value) => {
  setForm(prev => ({
    ...prev,
    images: prev.images.map((img, i) =>
      i === index ? { ...img, [field]: value } : img
    )
  }));
};

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError(null);
    setSubmitSuccess(false);

    try {
      await dispatch(createPackage(form)).unwrap();
      setSubmitSuccess(true);
      setForm(initialForm);

      // Call onSuccess callback if provided
      if (onSuccess) {
        setTimeout(() => {
          onSuccess();
        }, 1500);
      }
    } catch (error) {
      setSubmitError(error.message || 'Failed to create package');
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Success Message */}
      {submitSuccess && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
          <div className="flex items-center">
            <svg className="w-5 h-5 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <p className="text-green-800 font-medium">Package created successfully!</p>
          </div>
        </div>
      )}

      {/* Error Messages */}
      {(error || submitError) && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <div className="flex items-center">
            <svg className="w-5 h-5 text-red-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-red-800 font-medium">{submitError || error}</p>
          </div>
        </div>
      )}

      {/* Tab Navigation */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="-mb-px flex space-x-8">
          {[
            { id: 'basic', name: 'Basic Info' },
            { id: 'details', name: 'Details' },
            { id: 'itinerary', name: 'Itinerary' },
            { id: 'images', name: 'Images' },
            { id: 'policies', name: 'Policies' }
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab.name}
            </button>
          ))}
        </nav>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information Tab */}
        {activeTab === 'basic' && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">Basic Information</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Package Title *</label>
                <input
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  placeholder="Enter package title"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Destination *</label>
                <input
                  name="destination"
                  value={form.destination}
                  onChange={handleChange}
                  placeholder="Primary destination"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Short Description *</label>
              <textarea
                name="shortDescription"
                value={form.shortDescription}
                onChange={handleChange}
                placeholder="Brief description for listings"
                rows={2}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Description *</label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Detailed package description"
                rows={4}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category *</label>
                <select
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat.charAt(0).toUpperCase() + cat.slice(1).replace('-', ' ')}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Difficulty *</label>
                <select
                  name="difficulty"
                  value={form.difficulty}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {difficulties.map((dif) => (
                    <option key={dif} value={dif}>
                      {dif.charAt(0).toUpperCase() + dif.slice(1)}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Pricing */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Pricing (₹) *</label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Adult Price</label>
                  <input
                    name="price.adult"
                    value={form.price.adult}
                    onChange={handleChange}
                    placeholder="Adult price"
                    type="number"
                    min="0"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Child Price</label>
                  <input
                    name="price.child"
                    value={form.price.child}
                    onChange={handleChange}
                    placeholder="Child price"
                    type="number"
                    min="0"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Infant Price</label>
                  <input
                    name="price.infant"
                    value={form.price.infant}
                    onChange={handleChange}
                    placeholder="Infant price"
                    type="number"
                    min="0"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            {/* Duration */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Duration *</label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Days</label>
                  <input
                    name="duration.days"
                    value={form.duration.days}
                    onChange={handleChange}
                    placeholder="Number of days"
                    type="number"
                    min="1"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Nights</label>
                  <input
                    name="duration.nights"
                    value={form.duration.nights}
                    onChange={handleChange}
                    placeholder="Number of nights"
                    type="number"
                    min="0"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            {/* Group Size */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Group Size *</label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Minimum</label>
                  <input
                    name="groupSize.min"
                    value={form.groupSize.min}
                    onChange={handleChange}
                    placeholder="Min group size"
                    type="number"
                    min="1"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Maximum</label>
                  <input
                    name="groupSize.max"
                    value={form.groupSize.max}
                    onChange={handleChange}
                    placeholder="Max group size"
                    type="number"
                    min="1"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            {/* Location */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Location *</label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Country</label>
                  <input
                    name="location.country"
                    value={form.location.country}
                    onChange={handleChange}
                    placeholder="Country"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">State</label>
                  <input
                    name="location.state"
                    value={form.location.state}
                    onChange={handleChange}
                    placeholder="State"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">City</label>
                  <input
                    name="location.city"
                    value={form.location.city}
                    onChange={handleChange}
                    placeholder="City"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Latitude</label>
                  <input
                    name="location.coordinates.latitude"
                    value={form.location.coordinates.latitude}
                    onChange={handleChange}
                    placeholder="Latitude"
                    type="number"
                    step="any"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Longitude</label>
                  <input
                    name="location.coordinates.longitude"
                    value={form.location.coordinates.longitude}
                    onChange={handleChange}
                    placeholder="Longitude"
                    type="number"
                    step="any"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Details Tab */}
        {activeTab === 'details' && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">Package Details</h3>

            {/* Tags */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Tags</label>
              <div className="flex gap-2 mb-2">
                <input
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  placeholder="Add a tag"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="button"
                  onClick={() => {
                    addToArray('tags', newTag);
                    setNewTag('');
                  }}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Add
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {form.tags.map((tag, index) => (
                  <span key={index} className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm flex items-center gap-1">
                    {tag}
                    <button
                      type="button"
                      onClick={() => removeFromArray('tags', index)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>

            {/* Inclusions */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Inclusions</label>
              <div className="flex gap-2 mb-2">
                <input
                  value={newInclusion}
                  onChange={(e) => setNewInclusion(e.target.value)}
                  placeholder="What's included in the package"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="button"
                  onClick={() => {
                    addToArray('inclusions', newInclusion);
                    setNewInclusion('');
                  }}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                >
                  Add
                </button>
              </div>
              <ul className="space-y-1">
                {form.inclusions.map((inclusion, index) => (
                  <li key={index} className="flex items-center justify-between bg-green-50 px-3 py-2 rounded">
                    <span className="text-green-800">✓ {inclusion}</span>
                    <button
                      type="button"
                      onClick={() => removeFromArray('inclusions', index)}
                      className="text-red-600 hover:text-red-800"
                    >
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Exclusions */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Exclusions</label>
              <div className="flex gap-2 mb-2">
                <input
                  value={newExclusion}
                  onChange={(e) => setNewExclusion(e.target.value)}
                  placeholder="What's not included"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="button"
                  onClick={() => {
                    addToArray('exclusions', newExclusion);
                    setNewExclusion('');
                  }}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                >
                  Add
                </button>
              </div>
              <ul className="space-y-1">
                {form.exclusions.map((exclusion, index) => (
                  <li key={index} className="flex items-center justify-between bg-red-50 px-3 py-2 rounded">
                    <span className="text-red-800">✗ {exclusion}</span>
                    <button
                      type="button"
                      onClick={() => removeFromArray('exclusions', index)}
                      className="text-red-600 hover:text-red-800"
                    >
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Accommodation */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Accommodation</label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Type</label>
                  <select
                    name="accommodation.type"
                    value={form.accommodation.type}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select accommodation type</option>
                    {accommodationTypes.map((type) => (
                      <option key={type} value={type}>
                        {type.charAt(0).toUpperCase() + type.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Rating (1-5)</label>
                  <input
                    name="accommodation.rating"
                    value={form.accommodation.rating}
                    onChange={handleChange}
                    type="number"
                    min="1"
                    max="5"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">Details</label>
                <textarea
                  name="accommodation.details"
                  value={form.accommodation.details}
                  onChange={handleChange}
                  placeholder="Accommodation details"
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>
        )}

        {/* Policies Tab */}
        {activeTab === 'policies' && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">Policies & Settings</h3>

            {/* Cancellation Policy */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Cancellation Policy</label>
              <div className="space-y-4">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="cancellationPolicy.refundable"
                    checked={form.cancellationPolicy.refundable}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  Refundable
                </label>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Cancellation Deadline (days)</label>
                    <input
                      name="cancellationPolicy.cancellationDeadline"
                      value={form.cancellationPolicy.cancellationDeadline}
                      onChange={handleChange}
                      type="number"
                      min="0"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Refund Percentage (%)</label>
                    <input
                      name="cancellationPolicy.refundPercentage"
                      value={form.cancellationPolicy.refundPercentage}
                      onChange={handleChange}
                      type="number"
                      min="0"
                      max="100"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-gray-500 mb-1">Terms & Conditions</label>
                  <textarea
                    name="cancellationPolicy.terms"
                    value={form.cancellationPolicy.terms}
                    onChange={handleChange}
                    placeholder="Detailed cancellation terms and conditions"
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>

            {/* Package Status */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Package Status</label>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="isActive"
                    checked={form.isActive}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  Active (visible to customers)
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="isFeatured"
                    checked={form.isFeatured}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  Featured (highlighted on homepage)
                </label>
              </div>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between pt-6 border-t">
          <button
            type="button"
            onClick={() => {
              const tabs = ['basic', 'details', 'itinerary', 'images', 'policies'];
              const currentIndex = tabs.indexOf(activeTab);
              if (currentIndex > 0) setActiveTab(tabs[currentIndex - 1]);
            }}
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
            disabled={activeTab === 'basic'}
          >
            Previous
          </button>

          <div className="flex gap-2">
            {activeTab === 'policies' ? (
              <button
                type="submit"
                disabled={loading || submitSuccess}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
              >
                {loading ? 'Creating...' : 'Create Package'}
              </button>
            ) : (
              <button
                type="button"
                onClick={() => {
                  const tabs = ['basic', 'details', 'itinerary', 'images', 'policies'];
                  const currentIndex = tabs.indexOf(activeTab);
                  if (currentIndex < tabs.length - 1) setActiveTab(tabs[currentIndex + 1]);
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Next
              </button>
            )}
          </div>
        </div>


      </form>
    </div>
  );
};

export default CreatePackageForm;
