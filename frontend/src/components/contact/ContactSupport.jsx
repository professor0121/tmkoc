import { useState } from 'react';

const ContactSupport = () => {
  const [selectedCategory, setSelectedCategory] = useState('general');

  const supportCategories = [
    {
      id: 'general',
      title: 'General Support',
      icon: '🎧',
      description: 'General questions and assistance',
      methods: [
        { type: 'Live Chat', availability: '9 AM - 9 PM EST', response: 'Instant' },
        { type: 'Email', availability: '24/7', response: '2-4 hours' },
        { type: 'Phone', availability: '24/7', response: 'Immediate' }
      ]
    },
    {
      id: 'booking',
      title: 'Booking Support',
      icon: '📋',
      description: 'Help with reservations and bookings',
      methods: [
        { type: 'Priority Phone', availability: '24/7', response: 'Immediate' },
        { type: 'Live Chat', availability: '24/7', response: 'Instant' },
        { type: 'Email', availability: '24/7', response: '1-2 hours' }
      ]
    },
    {
      id: 'emergency',
      title: 'Emergency Support',
      icon: '🚨',
      description: 'Urgent assistance while traveling',
      methods: [
        { type: 'Emergency Hotline', availability: '24/7', response: 'Immediate' },
        { type: 'WhatsApp Emergency', availability: '24/7', response: 'Immediate' },
        { type: 'SMS Support', availability: '24/7', response: '5-10 minutes' }
      ]
    },
    {
      id: 'technical',
      title: 'Technical Support',
      icon: '💻',
      description: 'Website and app technical issues',
      methods: [
        { type: 'Live Chat', availability: '9 AM - 9 PM EST', response: 'Instant' },
        { type: 'Email', availability: '24/7', response: '2-6 hours' },
        { type: 'Phone', availability: '9 AM - 6 PM EST', response: 'Immediate' }
      ]
    }
  ];

  const quickActions = [
    {
      title: 'Track Your Booking',
      description: 'Check the status of your reservation',
      icon: '📍',
      action: 'Track Now',
      color: 'blue'
    },
    {
      title: 'Modify Booking',
      description: 'Change dates, travelers, or preferences',
      icon: '✏️',
      action: 'Modify',
      color: 'green'
    },
    {
      title: 'Cancel Booking',
      description: 'Cancel your reservation and get refund info',
      icon: '❌',
      action: 'Cancel',
      color: 'red'
    },
    {
      title: 'Travel Documents',
      description: 'Download tickets, vouchers, and itineraries',
      icon: '📄',
      action: 'Download',
      color: 'purple'
    }
  ];

  const supportStats = [
    { label: 'Average Response Time', value: '< 2 hours', icon: '⏱️' },
    { label: 'Customer Satisfaction', value: '98%', icon: '😊' },
    { label: 'Issues Resolved', value: '99.5%', icon: '✅' },
    { label: 'Languages Supported', value: '12+', icon: '🌍' }
  ];

  const currentCategory = supportCategories.find(cat => cat.id === selectedCategory);

  const getColorClasses = (color) => {
    const colors = {
      blue: 'bg-blue-100 text-blue-800 hover:bg-blue-200',
      green: 'bg-green-100 text-green-800 hover:bg-green-200',
      red: 'bg-red-100 text-red-800 hover:bg-red-200',
      purple: 'bg-purple-100 text-purple-800 hover:bg-purple-200'
    };
    return colors[color] || colors.blue;
  };

  return (
    <section id="support-section" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Support Options</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choose the support option that best fits your needs. Our team is available 
              around the clock to ensure your travel experience is seamless.
            </p>
          </div>

          {/* Support Categories */}
          <div className="mb-12">
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              {supportCategories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-6 py-3 rounded-full font-medium transition-all duration-200 ${
                    selectedCategory === category.id
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category.icon} {category.title}
                </button>
              ))}
            </div>

            {/* Selected Category Details */}
            <div className="bg-gray-50 rounded-xl p-8">
              <div className="text-center mb-8">
                <div className="text-4xl mb-4">{currentCategory.icon}</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{currentCategory.title}</h3>
                <p className="text-gray-600">{currentCategory.description}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {currentCategory.methods.map((method, index) => (
                  <div key={index} className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow duration-200">
                    <h4 className="font-semibold text-gray-900 mb-3">{method.type}</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-500">Availability:</span>
                        <span className="font-medium">{method.availability}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Response:</span>
                        <span className="font-medium text-green-600">{method.response}</span>
                      </div>
                    </div>
                    <button className="w-full mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200">
                      Contact Now
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mb-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Quick Actions</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {quickActions.map((action, index) => (
                <div key={index} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow duration-200">
                  <div className="text-3xl mb-4">{action.icon}</div>
                  <h4 className="font-semibold text-gray-900 mb-2">{action.title}</h4>
                  <p className="text-gray-600 text-sm mb-4">{action.description}</p>
                  <button className={`w-full px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${getColorClasses(action.color)}`}>
                    {action.action}
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Support Statistics */}
          <div className="mb-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Our Support Performance</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {supportStats.map((stat, index) => (
                <div key={index} className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg p-6 text-center">
                  <div className="text-3xl mb-3">{stat.icon}</div>
                  <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Self-Service Options */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-6 text-center">Self-Service Options</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="bg-white bg-opacity-20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">📚</span>
                </div>
                <h4 className="font-semibold mb-2">Help Center</h4>
                <p className="text-sm opacity-90 mb-4">
                  Browse our comprehensive knowledge base for instant answers
                </p>
                <button className="px-4 py-2 bg-white text-blue-600 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                  Visit Help Center
                </button>
              </div>
              
              <div className="text-center">
                <div className="bg-white bg-opacity-20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🎥</span>
                </div>
                <h4 className="font-semibold mb-2">Video Tutorials</h4>
                <p className="text-sm opacity-90 mb-4">
                  Watch step-by-step guides for common tasks and features
                </p>
                <button className="px-4 py-2 bg-white text-blue-600 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                  Watch Tutorials
                </button>
              </div>
              
              <div className="text-center">
                <div className="bg-white bg-opacity-20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">💬</span>
                </div>
                <h4 className="font-semibold mb-2">Community Forum</h4>
                <p className="text-sm opacity-90 mb-4">
                  Connect with other travelers and get tips from the community
                </p>
                <button className="px-4 py-2 bg-white text-blue-600 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                  Join Forum
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSupport;
