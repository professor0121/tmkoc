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

const CreatePackageForm = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.packages);
  const [form, setForm] = useState(initialForm);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createPackage(form));
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow rounded">
      <h2 className="text-xl font-bold mb-4">Create New Package</h2>
      {error && <p className="text-red-500 mb-2">{error}</p>}

      <div className="space-y-4">
        <input name="title" value={form.title} onChange={handleChange} placeholder="Package Title" className="w-full border p-2 rounded" />
        <textarea name="shortDescription" value={form.shortDescription} onChange={handleChange} placeholder="Short Description" className="w-full border p-2 rounded" />
        <textarea name="description" value={form.description} onChange={handleChange} placeholder="Full Description" className="w-full border p-2 rounded" />
        <input name="destination" value={form.destination} onChange={handleChange} placeholder="Destination" className="w-full border p-2 rounded" />

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

        <button
          onClick={handleSubmit}
          className="w-full bg-blue-600 text-white p-2 rounded"
          disabled={loading}
        >
          {loading ? 'Creating...' : 'Create Package'}
        </button>
      </div>
    </div>
  );
};

export default CreatePackageForm;
