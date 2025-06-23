const HelpGuides = () => {
  const guides = [
    {
      id: 1,
      title: 'Complete Booking Guide',
      description: 'Step-by-step walkthrough of the entire booking process from search to confirmation',
      duration: '10 min read',
      difficulty: 'Beginner',
      type: 'Guide',
      image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      steps: 5,
      views: '25.3k'
    },
    {
      id: 2,
      title: 'Travel Document Checklist',
      description: 'Essential documents and requirements for international travel',
      duration: '8 min read',
      difficulty: 'Intermediate',
      type: 'Checklist',
      image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      steps: 7,
      views: '18.7k'
    },
    {
      id: 3,
      title: 'Payment & Security Guide',
      description: 'Understanding payment methods, security measures, and protecting your information',
      duration: '6 min read',
      difficulty: 'Beginner',
      type: 'Guide',
      image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      steps: 4,
      views: '15.2k'
    },
    {
      id: 4,
      title: 'Mobile App Tutorial',
      description: 'How to use our mobile app for booking and managing your trips',
      duration: '12 min read',
      difficulty: 'Beginner',
      type: 'Tutorial',
      image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      steps: 8,
      views: '12.8k'
    },
    {
      id: 5,
      title: 'Group Booking Masterclass',
      description: 'Advanced guide for organizing and booking group travel experiences',
      duration: '15 min read',
      difficulty: 'Advanced',
      type: 'Masterclass',
      image: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      steps: 10,
      views: '8.9k'
    },
    {
      id: 6,
      title: 'Cancellation & Refunds',
      description: 'Understanding policies and how to cancel or modify your bookings',
      duration: '7 min read',
      difficulty: 'Intermediate',
      type: 'Guide',
      image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      steps: 6,
      views: '14.5k'
    }
  ];

  const getDifficultyColor = (difficulty) => {
    const colors = {
      Beginner: 'bg-green-100 text-green-800',
      Intermediate: 'bg-yellow-100 text-yellow-800',
      Advanced: 'bg-red-100 text-red-800'
    };
    return colors[difficulty] || colors.Beginner;
  };

  const getTypeColor = (type) => {
    const colors = {
      Guide: 'bg-blue-100 text-blue-800',
      Tutorial: 'bg-purple-100 text-purple-800',
      Checklist: 'bg-green-100 text-green-800',
      Masterclass: 'bg-orange-100 text-orange-800'
    };
    return colors[type] || colors.Guide;
  };

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Step-by-Step Guides</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive guides and tutorials to help you make the most of our platform and services
            </p>
          </div>

          {/* Featured Guide */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8 text-white mb-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <div className="flex items-center mb-4">
                  <span className="px-3 py-1 bg-white bg-opacity-20 rounded-full text-sm font-medium mr-3 text-black">
                    Featured Guide
                  </span>
                  <span className="px-3 py-1 bg-yellow-400 text-gray-900 rounded-full text-sm font-medium">
                    Most Popular
                  </span>
                </div>
                <h3 className="text-3xl font-bold mb-4">Complete Booking Guide</h3>
                <p className="text-lg opacity-90 mb-6">
                  Master the art of booking with our comprehensive step-by-step guide. 
                  From searching for destinations to completing your payment.
                </p>
                <div className="flex items-center space-x-6 mb-6">
                  <div className="flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    10 min read
                  </div>
                  <div className="flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    5 steps
                  </div>
                  <div className="flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    25.3k views
                  </div>
                </div>
                <button className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors duration-200">
                  Start Guide
                </button>
              </div>
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
                  alt="Booking Guide"
                  className="rounded-lg shadow-lg"
                />
                <div className="absolute inset-0 bg-black bg-opacity-20 rounded-lg flex items-center justify-center">
                  <button className="bg-white bg-opacity-90 rounded-full p-4 hover:bg-opacity-100 transition-all duration-200">
                    <svg className="w-8 h-8 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Guides Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {guides.map((guide) => (
              <div key={guide.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <div className="relative">
                  <img
                    src={guide.image}
                    alt={guide.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(guide.type)}`}>
                      {guide.type}
                    </span>
                  </div>
                  <div className="absolute top-4 right-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(guide.difficulty)}`}>
                      {guide.difficulty}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{guide.title}</h3>
                  <p className="text-gray-600 mb-4">{guide.description}</p>

                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <div className="flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {guide.duration}
                    </div>
                    <div className="flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {guide.steps} steps
                    </div>
                    <div className="flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      {guide.views}
                    </div>
                  </div>

                  <button className="w-full px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-200">
                    Start Guide
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Video Tutorials Section */}
          <div className="mt-16 bg-gray-50 rounded-xl p-8">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Video Tutorials</h3>
              <p className="text-gray-600">
                Prefer visual learning? Check out our video tutorials for step-by-step demonstrations.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-lg p-6 text-center shadow-md hover:shadow-lg transition-shadow duration-200">
                <div className="bg-red-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-red-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">How to Book</h4>
                <p className="text-sm text-gray-600 mb-3">5:30 min</p>
                <button className="text-blue-600 hover:text-blue-800 font-medium text-sm">
                  Watch Now
                </button>
              </div>

              <div className="bg-white rounded-lg p-6 text-center shadow-md hover:shadow-lg transition-shadow duration-200">
                <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Payment Setup</h4>
                <p className="text-sm text-gray-600 mb-3">3:45 min</p>
                <button className="text-blue-600 hover:text-blue-800 font-medium text-sm">
                  Watch Now
                </button>
              </div>

              <div className="bg-white rounded-lg p-6 text-center shadow-md hover:shadow-lg transition-shadow duration-200">
                <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-purple-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Mobile App</h4>
                <p className="text-sm text-gray-600 mb-3">7:20 min</p>
                <button className="text-blue-600 hover:text-blue-800 font-medium text-sm">
                  Watch Now
                </button>
              </div>

              <div className="bg-white rounded-lg p-6 text-center shadow-md hover:shadow-lg transition-shadow duration-200">
                <div className="bg-yellow-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-yellow-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Account Setup</h4>
                <p className="text-sm text-gray-600 mb-3">4:15 min</p>
                <button className="text-blue-600 hover:text-blue-800 font-medium text-sm">
                  Watch Now
                </button>
              </div>
            </div>

            <div className="text-center mt-8">
              <button className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-200">
                View All Video Tutorials
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HelpGuides;
