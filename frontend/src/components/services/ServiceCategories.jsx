import { useNavigate } from 'react-router-dom';
import SmartBookingButton from '../bookings/SmartBookingButton';

const ServiceCategories = ({ activeService, setActiveService }) => {
  const navigate = useNavigate();

  const services = [
    {
      id: 'packages',
      title: 'Travel Packages',
      icon: '🎒',
      description: 'Pre-designed travel packages with accommodation, transport, and activities',
      features: ['All-inclusive packages', 'Group discounts', 'Flexible dates', 'Expert guides'],
      price: 'From $299',
      popular: true
    },
    {
      id: 'custom',
      title: 'Custom Itineraries',
      icon: '🗺️',
      description: 'Personalized travel plans tailored to your preferences and budget',
      features: ['Personalized planning', 'Flexible itinerary', 'Local experiences', 'Private guides'],
      price: 'From $199',
      popular: false
    },
    {
      id: 'group',
      title: 'Group Tours',
      icon: '👥',
      description: 'Organized group tours with like-minded travelers',
      features: ['Small groups (8-16)', 'Social experience', 'Cost-effective', 'Scheduled departures'],
      price: 'From $399',
      popular: false
    },
    {
      id: 'luxury',
      title: 'Luxury Travel',
      icon: '✨',
      description: 'Premium travel experiences with luxury accommodations and services',
      features: ['5-star hotels', 'Private transfers', 'Exclusive experiences', 'Concierge service'],
      price: 'From $999',
      popular: false
    },
    {
      id: 'adventure',
      title: 'Adventure Tours',
      icon: '🏔️',
      description: 'Thrilling adventure activities and outdoor experiences',
      features: ['Outdoor activities', 'Expert guides', 'Safety equipment', 'Small groups'],
      price: 'From $499',
      popular: false
    },
    {
      id: 'business',
      title: 'Business Travel',
      icon: '💼',
      description: 'Corporate travel solutions for business trips and events',
      features: ['Corporate rates', 'Flexible booking', 'Expense management', '24/7 support'],
      price: 'Custom pricing',
      popular: false
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Travel Services</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Choose from our comprehensive range of travel services designed to meet every type of traveler's needs
          </p>
        </div>

        {/* Service Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {services.map((service) => (
            <button
              key={service.id}
              onClick={() => setActiveService(service.id)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-200 ${
                activeService === service.id
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {service.icon} {service.title}
            </button>
          ))}
        </div>

        {/* Service Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <div
              key={service.id}
              className={`relative bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl ${
                service.popular ? 'ring-2 ring-yellow-400' : ''
              } ${
                activeService === service.id ? 'transform scale-105 shadow-2xl' : ''
              }`}
            >
              {service.popular && (
                <div className="absolute top-4 right-4 bg-yellow-400 text-gray-900 px-3 py-1 rounded-full text-sm font-semibold">
                  Most Popular
                </div>
              )}

              <div className="p-8">
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">{service.title}</h3>
                <p className="text-gray-600 mb-6">{service.description}</p>

                {/* Features */}
                <ul className="space-y-2 mb-6">
                  {service.features.map((feature, index) => (
                    <li key={index} className="flex items-center text-sm text-gray-700">
                      <svg className="w-4 h-4 text-green-500 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* Pricing */}
                <div className="mb-6">
                  <div className="text-2xl font-bold text-blue-600">{service.price}</div>
                  <div className="text-sm text-gray-500">per person</div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                  {service.id === 'packages' ? (
                    <SmartBookingButton
                      className="w-full"
                      size="md"
                    >
                      Browse Packages
                    </SmartBookingButton>
                  ) : (
                    <button
                      onClick={() => navigate(`/services/${service.id}`)}
                      className="w-full px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-200"
                    >
                      Learn More
                    </button>
                  )}
                  
                  <button
                    onClick={() => navigate('/contact')}
                    className="w-full px-6 py-2 border border-blue-300 text-blue-700 rounded-lg hover:bg-blue-50 transition-colors duration-200"
                  >
                    Get Quote
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <p className="text-lg text-gray-600 mb-6">
            Not sure which service is right for you? Let our travel experts help you choose.
          </p>
          <button
            onClick={() => navigate('/contact')}
            className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg"
          >
            Speak with a Travel Expert
          </button>
        </div>
      </div>
    </section>
  );
};

export default ServiceCategories;
