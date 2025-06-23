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
  location: {
    country: '',
    state: '',
    city: '',
    coordinates: {
      latitude: '',
      longitude: ''
    }
  },
  accommodation: {
    type: '',
    rating: 3,
    details: ''
  },
  cancellationPolicy: {
    terms: '',
    refundPercentage: 0,
    cancellationDeadline: 0,
    refundable: true
  }
};

const CreatePackageForm = ({ onSuccess }) => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.packages);
  const [form, setForm] = useState(initialForm);
  const [submitError, setSubmitError] = useState(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

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
  const { name, value, type } = e.target;
  const val = type === 'number' ? Number(value) : value;

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

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">Basic Information</h3>

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

        <select name="category" value={form.category} onChange={handleChange} className="w-full border p-2 rounded">
          {['adventure', 'cultural', 'religious', 'wildlife', 'beach', 'hill-station', 'heritage', 'honeymoon', 'family', 'business'].map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>

        <select name="difficulty" value={form.difficulty} onChange={handleChange} className="w-full border p-2 rounded">
          {['easy', 'moderate', 'challenging', 'extreme'].map((dif) => (
            <option key={dif} value={dif}>{dif}</option>
          ))}
        </select>

        <div className="grid grid-cols-3 gap-4">
          <input name="price.adult" value={form.price.adult} onChange={handleChange} placeholder="Price (Adult)" type="number" className="border p-2 rounded" />
          <input name="price.child" value={form.price.child} onChange={handleChange} placeholder="Price (Child)" type="number" className="border p-2 rounded" />
          <input name="price.infant" value={form.price.infant} onChange={handleChange} placeholder="Price (Infant)" type="number" className="border p-2 rounded" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <input name="duration.days" value={form.duration.days} onChange={handleChange} placeholder="Days" type="number" className="border p-2 rounded" />
          <input name="duration.nights" value={form.duration.nights} onChange={handleChange} placeholder="Nights" type="number" className="border p-2 rounded" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <input name="location.country" value={form.location.country} onChange={handleChange} placeholder="Country" className="border p-2 rounded" />
          <input name="location.state" value={form.location.state} onChange={handleChange} placeholder="State" className="border p-2 rounded" />
          <input name="location.city" value={form.location.city} onChange={handleChange} placeholder="City" className="border p-2 rounded" />
          <input name="location.coordinates.latitude" value={form.location.coordinates.latitude} onChange={handleChange} placeholder="Latitude" className="border p-2 rounded" />
          <input name="location.coordinates.longitude" value={form.location.coordinates.longitude} onChange={handleChange} placeholder="Longitude" className="border p-2 rounded" />
        </div>

        <input name="accommodation.type" value={form.accommodation.type} onChange={handleChange} placeholder="Accommodation Type" className="w-full border p-2 rounded" />

        <div className="grid grid-cols-3 gap-4">
          <input name="cancellationPolicy.terms" value={form.cancellationPolicy.terms} onChange={handleChange} placeholder="Cancellation Terms" className="border p-2 rounded" />
          <input name="cancellationPolicy.refundPercentage" value={form.cancellationPolicy.refundPercentage} onChange={handleChange} placeholder="Refund (%)" type="number" className="border p-2 rounded" />
          <input name="cancellationPolicy.cancellationDeadline" value={form.cancellationPolicy.cancellationDeadline} onChange={handleChange} placeholder="Deadline (Days)" type="number" className="border p-2 rounded" />
        </div>

        {/* Submit Button */}
        <div className="pt-6 border-t border-gray-200">
          <button
            type="submit"
            className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={loading || submitSuccess}
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Creating Package...
              </span>
            ) : submitSuccess ? (
              <span className="flex items-center justify-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Package Created!
              </span>
            ) : (
              'Create Package'
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreatePackageForm;
