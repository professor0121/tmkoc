// src/components/packages/PackagesList.jsx
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPackages } from '../../redux/packages/packageSlice';

const PackagesList = () => {
  const dispatch = useDispatch();
  const { packages, loading, error } = useSelector((state) => state.packages);

  useEffect(() => {
    dispatch(fetchPackages());
  }, [dispatch]);

  if (loading) return <p className="text-center text-blue-600">Loading packages...</p>;
  if (error) return <p className="text-center text-red-600">Error: {error}</p>;
console.log(packages.data.packages)
  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Available Packages</h2>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {packages.data.packages.map((pkg) => (
          <div
            key={pkg._id}
            className="bg-white shadow-md p-4 rounded-lg border border-gray-100 hover:shadow-lg transition"
          >
            <h3 className="text-lg font-semibold text-blue-700">{pkg.title}</h3>
            <p className="text-gray-600 text-sm">{pkg.shortDescription}</p>
            <div className="mt-3 text-sm text-gray-500">
              <span className="block">Duration: {pkg.duration?.days}D / {pkg.duration?.nights}N</span>
              <span className="block">Destination: {pkg.destination}</span>
              <span className="block font-medium text-green-700 mt-1">₹{pkg.price?.adult} / Adult</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PackagesList;
