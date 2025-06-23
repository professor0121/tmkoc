const HelpContact = () => {
  const contactMethods = [
    {
      title: 'Live Chat',
      description: 'Get instant help from our support team',
      icon: '💬',
      availability: '9 AM - 9 PM EST',
      response: 'Instant',
      action: 'Start Chat',
      color: 'blue'
    },
    {
      title: 'Phone Support',
      description: '24/7 phone support for urgent matters',
      icon: '📞',
      availability: '24/7',
      response: 'Immediate',
      action: 'Call Now',
      color: 'green'
    },
    {
      title: 'Email Support',
      description: 'Send us detailed questions and feedback',
      icon: '📧',
      availability: '24/7',
      response: '2-4 hours',
      action: 'Send Email',
      color: 'purple'
    },
    {
      title: 'Help Center',
      description: 'Browse our comprehensive knowledge base',
      icon: '📚',
      availability: 'Always',
      response: 'Instant',
      action: 'Browse Articles',
      color: 'yellow'
    }
  ];

  const supportStats = [
    { label: 'Average Response Time', value: '< 2 hours', icon: '⏱️' },
    { label: 'Customer Satisfaction', value: '98%', icon: '😊' },
    { label: 'Issues Resolved', value: '99.5%', icon: '✅' },
    { label: 'Support Languages', value: '12+', icon: '🌍' }
  ];

  const getColorClasses = (color) => {
    const colors = {
      blue: 'from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700',
      green: 'from-green-500 to-green-600 hover:from-green-600 hover:to-green-700',
      purple: 'from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700',
      yellow: 'from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700'
    };
    return colors[color] || colors.blue;
  };

  return (
    <section id="help-contact" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Need More Help?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our support team is here to help you with any questions or issues you might have. 
              Choose the contact method that works best for you.
            </p>
          </div>

          {/* Contact Methods Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {contactMethods.map((method, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-xl p-6 text-center hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2">
                <div className="text-4xl mb-4">{method.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{method.title}</h3>
                <p className="text-gray-600 mb-4">{method.description}</p>
                
                <div className="space-y-2 mb-6 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Availability:</span>
                    <span className="font-medium">{method.availability}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Response:</span>
                    <span className="font-medium text-green-600">{method.response}</span>
                  </div>
                </div>

                <button className={`w-full px-4 py-3 bg-gradient-to-r ${getColorClasses(method.color)} text-white font-semibold rounded-lg transition-all duration-200 transform hover:scale-105`}>
                  {method.action}
                </button>
              </div>
            ))}
          </div>

          {/* Support Statistics */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">Our Support Performance</h3>
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

          {/* Emergency Contact */}
          <div className="bg-red-50 border border-red-200 rounded-xl p-8 mb-16">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-red-800 mb-4 flex items-center justify-center">
                <span className="text-3xl mr-3">🚨</span>
                Emergency Support
              </h3>
              <p className="text-red-700 mb-6 max-w-2xl mx-auto">
                If you're currently traveling and experiencing an emergency, use our dedicated emergency support line 
                for immediate assistance with medical emergencies, travel disruptions, or urgent situations.
              </p>
              <div className="flex flex-col md:flex-row gap-4 justify-center">
                <a
                  href="tel:+15551234568"
                  className="px-8 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-colors duration-200 inline-flex items-center justify-center"
                >
                  <span className="mr-2">📞</span>
                  Emergency Hotline: +1 (555) 123-4568
                </a>
                <a
                  href="https://wa.me/15551234568"
                  className="px-8 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-colors duration-200 inline-flex items-center justify-center"
                >
                  <span className="mr-2">💬</span>
                  WhatsApp Emergency
                </a>
              </div>
              <p className="text-sm text-red-600 mt-4">
                Available 24/7 for travelers experiencing emergencies
              </p>
            </div>
          </div>

          {/* Self-Service Options */}
          <div className="bg-gray-50 rounded-xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Self-Service Options</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 shadow-md">
                  <span className="text-2xl">📖</span>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Knowledge Base</h4>
                <p className="text-gray-600 text-sm mb-4">
                  Browse our comprehensive collection of help articles and guides
                </p>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200">
                  Browse Articles
                </button>
              </div>
              
              <div className="text-center">
                <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 shadow-md">
                  <span className="text-2xl">🎥</span>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Video Tutorials</h4>
                <p className="text-gray-600 text-sm mb-4">
                  Watch step-by-step video guides for common tasks and features
                </p>
                <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-200">
                  Watch Videos
                </button>
              </div>
              
              <div className="text-center">
                <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 shadow-md">
                  <span className="text-2xl">👥</span>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Community Forum</h4>
                <p className="text-gray-600 text-sm mb-4">
                  Connect with other travelers and get tips from the community
                </p>
                <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200">
                  Join Forum
                </button>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="mt-16 text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-8">Contact Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <div className="text-2xl mb-2">📞</div>
                <h4 className="font-semibold text-gray-900 mb-1">Phone</h4>
                <p className="text-gray-600">+1 (555) 123-4567</p>
                <p className="text-sm text-gray-500">24/7 Support</p>
              </div>
              
              <div>
                <div className="text-2xl mb-2">📧</div>
                <h4 className="font-semibold text-gray-900 mb-1">Email</h4>
                <p className="text-gray-600">support@travel.com</p>
                <p className="text-sm text-gray-500">Response within 2 hours</p>
              </div>
              
              <div>
                <div className="text-2xl mb-2">📍</div>
                <h4 className="font-semibold text-gray-900 mb-1">Office</h4>
                <p className="text-gray-600">San Francisco, CA</p>
                <p className="text-sm text-gray-500">Visit by appointment</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HelpContact;
