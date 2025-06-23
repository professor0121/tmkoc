import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Header from '../components/Header';
import HeroSection from '../components/home/HeroSection';
import StatsSection from '../components/home/StatsSection';
import WhyChooseUsSection from '../components/home/WhyChooseUsSection';
import CTASection from '../components/home/CTASection';
import Footer from '../components/home/Footer';
import FeaturedDestinations from '../components/destinations/FeaturedDestinations';
import SmartBookingButton from '../components/bookings/SmartBookingButton';
import { getAllPackages } from '../redux/packages/packageSlice';
import { formatCurrency } from '../utils/bookingUtils';

const HomePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { packages, loading: packagesLoading } = useSelector(state => state.packages);

  const [featuredPackages, setFeaturedPackages] = useState([]);

  useEffect(() => {
    dispatch(getAllPackages());
  }, [dispatch]);
  console.log(packages)

  useEffect(() => {
    if (packages.length > 0) {
      // Get featured packages (limit to 3 for homepage)
      const featured = packages.filter(pkg => pkg.featured).slice(0, 3);
      setFeaturedPackages(packages);
    }
  }, [packages]);



  const getPackagePrice = (pkg) => {
    if (pkg.pricing?.basePrice) return pkg.pricing.basePrice;
    if (pkg.price) {
      if (typeof pkg.price === 'object' && pkg.price.adult) return pkg.price.adult;
      if (typeof pkg.price === 'object' && pkg.price.min !== undefined) return pkg.price.min;
      if (typeof pkg.price === 'number') return pkg.price;
    }
    return 0;
  };
console.log("feateurefefdfde",featuredPackages)
  const formatDuration = (duration) => {
    if (typeof duration === 'object' && duration.days) {
      return `${duration.days} days${duration.nights ? ` / ${duration.nights} nights` : ''}`;
    }
    return `${duration || 0} days`;
  };
// console.log(featuredPackages)
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero Section */}
      <HeroSection />

      {/* Stats Section */}
      <StatsSection />

      {/* Featured Packages Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Featured Packages</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Handpicked travel experiences that offer the perfect blend of adventure, comfort, and value
            </p>
          </div>

          {packagesLoading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
          ) : featuredPackages.length > 0 ? (
            <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredPackages.map((pkg) => (
                <div key={pkg._id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                  {/* Package Image */}
                  <div className="relative h-64">
                    <img
                      src={pkg.images?.[0] || 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'}
                      alt={pkg.name || pkg.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 right-4">
                      <span className="bg-yellow-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                        Featured
                      </span>
                    </div>
                    <div className="absolute top-4 left-4">
                      <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                        {formatDuration(pkg.duration)}
                      </span>
                    </div>
                  </div>

                  {/* Package Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {pkg.name || pkg.title}
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-2">
                      {pkg.shortDescription || pkg.description}
                    </p>

                    {/* Package Features */}
                    {pkg.highlights && pkg.highlights.length > 0 && (
                      <div className="mb-4">
                        <div className="flex flex-wrap gap-2">
                          {pkg.highlights.slice(0, 2).map((highlight, index) => (
                            <span key={index} className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                              {highlight}
                            </span>
                          ))}
                          {pkg.highlights.length > 2 && (
                            <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                              +{pkg.highlights.length - 2} more
                            </span>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Pricing and Booking */}
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <div className="text-2xl font-bold text-green-600">
                          {formatCurrency(getPackagePrice(pkg))}
                          <span className="text-sm font-normal text-gray-600"> / person</span>
                        </div>
                        {pkg.pricing?.originalPrice && pkg.pricing.originalPrice > getPackagePrice(pkg) && (
                          <div className="text-sm text-green-600 font-medium">
                            Save {formatCurrency(pkg.pricing.originalPrice - getPackagePrice(pkg))}
                          </div>
                        )}
                      </div>
                      {pkg.rating && (
                        <div className="flex items-center">
                          <svg className="w-5 h-5 text-yellow-400 mr-1" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                          {/* <span className="text-sm font-medium text-gray-700">{pkg.rating}</span> */}
                          {pkg.rating.average}  ({pkg.rating.totalReviews} reviews)
                        </div>
                      )}
                    </div>

                    {/* Action Buttons */}
                    <div className="space-y-2">
                      <SmartBookingButton
                        package={pkg}
                        className="w-full"
                        size="md"
                      >
                        Book Now
                      </SmartBookingButton>

                      <button
                        onClick={() => navigate(`/packages/${pkg._id}`)}
                        className="w-full px-4 py-2 border border-blue-300 text-blue-700 rounded-md hover:bg-blue-50 transition-colors text-sm"
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* View All Packages Button */}
            <div className="text-center mt-12">
              <button
                onClick={() => navigate('/packages')}
                className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-200"
              >
                View All Packages
              </button>
            </div>
            </>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No featured packages available at the moment.</p>
              <button
                onClick={() => navigate('/packages')}
                className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Browse All Packages
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Featured Destinations Section */}
      <FeaturedDestinations />

      {/* Why Choose Us Section */}
      <WhyChooseUsSection />

      {/* CTA Section */}
      <CTASection />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default HomePage;