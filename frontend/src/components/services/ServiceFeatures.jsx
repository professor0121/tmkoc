const ServiceFeatures = ({ activeService }) => {
  const serviceDetails = {
    packages: {
      title: 'Travel Packages',
      subtitle: 'Everything you need for the perfect trip',
      features: [
        {
          icon: '🏨',
          title: 'Accommodation',
          description: 'Carefully selected hotels and resorts that match your budget and preferences'
        },
        {
          icon: '✈️',
          title: 'Transportation',
          description: 'Flights, transfers, and local transport included in your package'
        },
        {
          icon: '🎯',
          title: 'Activities',
          description: 'Curated experiences and activities at each destination'
        },
        {
          icon: '👨‍💼',
          title: 'Tour Guides',
          description: 'Expert local guides to enhance your travel experience'
        }
      ],
      benefits: [
        'All-inclusive pricing with no hidden fees',
        'Flexible payment options available',
        'Free cancellation up to 48 hours',
        '24/7 customer support during your trip'
      ]
    },
    custom: {
      title: 'Custom Itineraries',
      subtitle: 'Your dream trip, planned perfectly',
      features: [
        {
          icon: '🎨',
          title: 'Personalized Design',
          description: 'Every detail crafted according to your preferences and interests'
        },
        {
          icon: '📅',
          title: 'Flexible Scheduling',
          description: 'Travel at your own pace with customizable daily schedules'
        },
        {
          icon: '🏛️',
          title: 'Local Experiences',
          description: 'Authentic local experiences you won\'t find in guidebooks'
        },
        {
          icon: '📞',
          title: 'Dedicated Support',
          description: 'Personal travel consultant available throughout your journey'
        }
      ],
      benefits: [
        'Completely customized to your preferences',
        'Flexible dates and duration',
        'Local insider knowledge included',
        'Modify itinerary even during travel'
      ]
    },
    group: {
      title: 'Group Tours',
      subtitle: 'Travel with like-minded adventurers',
      features: [
        {
          icon: '👥',
          title: 'Small Groups',
          description: 'Intimate group sizes of 8-16 people for a personal experience'
        },
        {
          icon: '🗓️',
          title: 'Scheduled Departures',
          description: 'Regular departure dates throughout the year'
        },
        {
          icon: '💰',
          title: 'Cost Effective',
          description: 'Share costs with other travelers for better value'
        },
        {
          icon: '🤝',
          title: 'Social Experience',
          description: 'Meet new people and make lasting friendships'
        }
      ],
      benefits: [
        'Meet fellow travelers from around the world',
        'Shared experiences and memories',
        'Professional group leader included',
        'Single traveler friendly'
      ]
    },
    luxury: {
      title: 'Luxury Travel',
      subtitle: 'Experience the finest in travel',
      features: [
        {
          icon: '⭐',
          title: '5-Star Accommodations',
          description: 'Luxury hotels, resorts, and exclusive properties'
        },
        {
          icon: '🚗',
          title: 'Private Transfers',
          description: 'Luxury vehicles and private transportation'
        },
        {
          icon: '🍾',
          title: 'Exclusive Experiences',
          description: 'VIP access to attractions and unique experiences'
        },
        {
          icon: '🛎️',
          title: 'Concierge Service',
          description: '24/7 personal concierge for all your needs'
        }
      ],
      benefits: [
        'Uncompromising luxury and comfort',
        'Exclusive access to premium experiences',
        'Personal concierge service',
        'Flexible and personalized service'
      ]
    },
    adventure: {
      title: 'Adventure Tours',
      subtitle: 'Thrilling experiences for the adventurous',
      features: [
        {
          icon: '🏔️',
          title: 'Outdoor Activities',
          description: 'Hiking, climbing, rafting, and extreme sports'
        },
        {
          icon: '🧗‍♂️',
          title: 'Expert Guides',
          description: 'Certified adventure guides with local expertise'
        },
        {
          icon: '🛡️',
          title: 'Safety Equipment',
          description: 'Professional-grade safety equipment provided'
        },
        {
          icon: '📸',
          title: 'Photo Opportunities',
          description: 'Capture stunning moments in breathtaking locations'
        }
      ],
      benefits: [
        'Professional safety standards',
        'Small group adventures',
        'All equipment provided',
        'Suitable for various skill levels'
      ]
    },
    business: {
      title: 'Business Travel',
      subtitle: 'Efficient solutions for corporate travel',
      features: [
        {
          icon: '💼',
          title: 'Corporate Rates',
          description: 'Negotiated rates for hotels, flights, and services'
        },
        {
          icon: '📱',
          title: 'Easy Booking',
          description: 'Online platform for quick and easy bookings'
        },
        {
          icon: '📊',
          title: 'Expense Management',
          description: 'Detailed reporting and expense tracking'
        },
        {
          icon: '⏰',
          title: 'Flexible Changes',
          description: 'Easy modifications for changing business needs'
        }
      ],
      benefits: [
        'Dedicated corporate account manager',
        'Flexible booking and cancellation',
        'Detailed expense reporting',
        '24/7 business travel support'
      ]
    }
  };

  const currentService = serviceDetails[activeService] || serviceDetails.packages;

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">{currentService.title}</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {currentService.subtitle}
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {currentService.features.map((feature, index) => (
            <div key={index} className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Benefits Section */}
        <div className="bg-white rounded-xl p-8 shadow-lg">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Why Choose This Service?</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {currentService.benefits.map((benefit, index) => (
              <div key={index} className="flex items-start">
                <svg className="w-6 h-6 text-green-500 mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-700">{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceFeatures;
