import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ServicePricing = () => {
  const navigate = useNavigate();
  const [selectedPlan, setSelectedPlan] = useState('standard');

  const pricingPlans = [
    {
      id: 'basic',
      name: 'Basic Package',
      price: '$299',
      duration: 'per person',
      description: 'Perfect for budget-conscious travelers',
      features: [
        '3-star accommodation',
        'Group transportation',
        'Basic meal plan',
        'Standard activities',
        'Group tour guide',
        'Basic travel insurance'
      ],
      limitations: [
        'Limited customization',
        'Shared accommodations',
        'Fixed itinerary'
      ],
      popular: false,
      color: 'blue'
    },
    {
      id: 'standard',
      name: 'Standard Package',
      price: '$599',
      duration: 'per person',
      description: 'Our most popular choice with great value',
      features: [
        '4-star accommodation',
        'Private transportation',
        'Full meal plan',
        'Premium activities',
        'Professional tour guide',
        'Comprehensive travel insurance',
        'Some customization options',
        '24/7 support'
      ],
      limitations: [],
      popular: true,
      color: 'purple'
    },
    {
      id: 'premium',
      name: 'Premium Package',
      price: '$999',
      duration: 'per person',
      description: 'Luxury experience with premium services',
      features: [
        '5-star accommodation',
        'Luxury private transportation',
        'Gourmet dining experiences',
        'Exclusive activities & experiences',
        'Personal travel concierge',
        'Premium travel insurance',
        'Fully customizable itinerary',
        '24/7 VIP support',
        'Airport lounge access',
        'Welcome gifts & amenities'
      ],
      limitations: [],
      popular: false,
      color: 'gold'
    }
  ];

  const addOnServices = [
    { name: 'Travel Photography', price: '$150', description: 'Professional photographer for your trip' },
    { name: 'Spa & Wellness', price: '$200', description: 'Spa treatments and wellness activities' },
    { name: 'Cultural Experiences', price: '$100', description: 'Local cultural immersion activities' },
    { name: 'Adventure Activities', price: '$250', description: 'Extreme sports and adventure activities' },
    { name: 'Private Chef', price: '$300', description: 'Personal chef for special meals' },
    { name: 'Extended Support', price: '$50', description: 'Extended 24/7 support coverage' }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Service Pricing</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Choose the perfect package for your travel needs. All packages include our satisfaction guarantee.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {pricingPlans.map((plan) => (
            <div
              key={plan.id}
              className={`relative bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl ${
                plan.popular ? 'ring-2 ring-purple-500 transform scale-105' : ''
              } ${
                selectedPlan === plan.id ? 'ring-2 ring-blue-500' : ''
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 left-0 right-0 bg-purple-500 text-white text-center py-2 text-sm font-semibold">
                  Most Popular
                </div>
              )}

              <div className={`p-8 ${plan.popular ? 'pt-12' : ''}`}>
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                  <div className="text-4xl font-bold text-blue-600 mb-2">{plan.price}</div>
                  <div className="text-gray-500">{plan.duration}</div>
                  <p className="text-gray-600 mt-4">{plan.description}</p>
                </div>

                {/* Features */}
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center text-sm">
                      <svg className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                  {plan.limitations.map((limitation, index) => (
                    <li key={index} className="flex items-center text-sm">
                      <svg className="w-5 h-5 text-red-400 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                      <span className="text-gray-500">{limitation}</span>
                    </li>
                  ))}
                </ul>

                {/* Action Buttons */}
                <div className="space-y-3">
                  <button
                    onClick={() => {
                      setSelectedPlan(plan.id);
                      navigate('/packages');
                    }}
                    className={`w-full py-3 px-6 rounded-lg font-semibold transition-colors duration-200 ${
                      plan.popular
                        ? 'bg-purple-600 text-white hover:bg-purple-700'
                        : 'bg-blue-600 text-white hover:bg-blue-700'
                    }`}
                  >
                    Choose {plan.name}
                  </button>
                  
                  <button
                    onClick={() => navigate('/contact')}
                    className="w-full py-2 px-6 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                  >
                    Get Custom Quote
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Add-on Services */}
        <div className="bg-gray-50 rounded-xl p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Add-on Services</h3>
          <p className="text-center text-gray-600 mb-8">
            Enhance your travel experience with our optional add-on services
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {addOnServices.map((addon, index) => (
              <div key={index} className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow duration-300">
                <div className="flex justify-between items-start mb-3">
                  <h4 className="text-lg font-semibold text-gray-900">{addon.name}</h4>
                  <span className="text-lg font-bold text-blue-600">{addon.price}</span>
                </div>
                <p className="text-gray-600 text-sm mb-4">{addon.description}</p>
                <button className="w-full py-2 px-4 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors duration-200 text-sm font-medium">
                  Add to Package
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <p className="text-lg text-gray-600 mb-6">
            Need a custom package? Our travel experts can create a personalized solution for you.
          </p>
          <button
            onClick={() => navigate('/contact')}
            className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg"
          >
            Request Custom Package
          </button>
        </div>
      </div>
    </section>
  );
};

export default ServicePricing;
