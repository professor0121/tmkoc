import { useState } from 'react';

const HelpCategories = () => {
  const [selectedCategory, setSelectedCategory] = useState('booking');

  const categories = [
    {
      id: 'booking',
      title: 'Booking & Reservations',
      icon: '📋',
      description: 'Everything about making and managing your bookings',
      articleCount: 45,
      color: 'blue',
      articles: [
        { title: 'How to Book a Travel Package', views: '12.5k', difficulty: 'Easy' },
        { title: 'Modifying Your Reservation', views: '8.2k', difficulty: 'Easy' },
        { title: 'Group Booking Process', views: '5.1k', difficulty: 'Medium' },
        { title: 'Booking Confirmation Guide', views: '9.8k', difficulty: 'Easy' },
        { title: 'Last-Minute Booking Tips', views: '3.7k', difficulty: 'Medium' }
      ]
    },
    {
      id: 'payment',
      title: 'Payment & Billing',
      icon: '💳',
      description: 'Payment methods, billing, and financial questions',
      articleCount: 32,
      color: 'green',
      articles: [
        { title: 'Accepted Payment Methods', views: '15.2k', difficulty: 'Easy' },
        { title: 'Payment Security & Protection', views: '7.8k', difficulty: 'Easy' },
        { title: 'Installment Payment Plans', views: '4.5k', difficulty: 'Medium' },
        { title: 'Billing Statement Explained', views: '6.3k', difficulty: 'Easy' },
        { title: 'Currency Exchange & Fees', views: '3.9k', difficulty: 'Medium' }
      ]
    },
    {
      id: 'cancellation',
      title: 'Cancellation & Refunds',
      icon: '↩️',
      description: 'Cancellation policies, refund process, and terms',
      articleCount: 28,
      color: 'red',
      articles: [
        { title: 'Cancellation Policy Overview', views: '18.7k', difficulty: 'Easy' },
        { title: 'How to Cancel Your Booking', views: '14.3k', difficulty: 'Easy' },
        { title: 'Refund Processing Times', views: '11.2k', difficulty: 'Easy' },
        { title: 'Travel Insurance Claims', views: '5.8k', difficulty: 'Medium' },
        { title: 'Force Majeure Cancellations', views: '2.4k', difficulty: 'Hard' }
      ]
    },
    {
      id: 'travel',
      title: 'Travel Information',
      icon: '✈️',
      description: 'Travel documents, requirements, and destination info',
      articleCount: 67,
      color: 'purple',
      articles: [
        { title: 'Passport & Visa Requirements', views: '22.1k', difficulty: 'Medium' },
        { title: 'Travel Insurance Guide', views: '16.8k', difficulty: 'Medium' },
        { title: 'Health & Vaccination Info', views: '13.5k', difficulty: 'Medium' },
        { title: 'Customs & Immigration Tips', views: '9.7k', difficulty: 'Medium' },
        { title: 'Travel Safety Guidelines', views: '8.2k', difficulty: 'Easy' }
      ]
    },
    {
      id: 'account',
      title: 'Account Management',
      icon: '👤',
      description: 'Profile settings, preferences, and account security',
      articleCount: 23,
      color: 'indigo',
      articles: [
        { title: 'Creating Your Account', views: '19.4k', difficulty: 'Easy' },
        { title: 'Profile Settings Guide', views: '12.7k', difficulty: 'Easy' },
        { title: 'Password Reset Instructions', views: '8.9k', difficulty: 'Easy' },
        { title: 'Privacy Settings Control', views: '5.6k', difficulty: 'Medium' },
        { title: 'Account Deletion Process', views: '2.1k', difficulty: 'Medium' }
      ]
    },
    {
      id: 'technical',
      title: 'Technical Support',
      icon: '🔧',
      description: 'Website issues, app problems, and technical help',
      articleCount: 19,
      color: 'yellow',
      articles: [
        { title: 'Website Troubleshooting', views: '10.3k', difficulty: 'Medium' },
        { title: 'Mobile App Installation', views: '8.7k', difficulty: 'Easy' },
        { title: 'Browser Compatibility', views: '6.2k', difficulty: 'Medium' },
        { title: 'Clearing Cache & Cookies', views: '4.8k', difficulty: 'Easy' },
        { title: 'Reporting Technical Issues', views: '3.5k', difficulty: 'Easy' }
      ]
    }
  ];

  const currentCategory = categories.find(cat => cat.id === selectedCategory);

  const getColorClasses = (color) => {
    const colors = {
      blue: 'from-blue-500 to-blue-600 text-blue-600 bg-blue-50 border-blue-200',
      green: 'from-green-500 to-green-600 text-green-600 bg-green-50 border-green-200',
      red: 'from-red-500 to-red-600 text-red-600 bg-red-50 border-red-200',
      purple: 'from-purple-500 to-purple-600 text-purple-600 bg-purple-50 border-purple-200',
      indigo: 'from-indigo-500 to-indigo-600 text-indigo-600 bg-indigo-50 border-indigo-200',
      yellow: 'from-yellow-500 to-yellow-600 text-yellow-600 bg-yellow-50 border-yellow-200'
    };
    return colors[color] || colors.blue;
  };

  const getDifficultyColor = (difficulty) => {
    const colors = {
      Easy: 'bg-green-100 text-green-800',
      Medium: 'bg-yellow-100 text-yellow-800',
      Hard: 'bg-red-100 text-red-800'
    };
    return colors[difficulty] || colors.Easy;
  };

  return (
    <section id="help-categories" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Browse Help Categories</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Find help articles organized by topic. Click on any category to explore detailed guides and tutorials.
            </p>
          </div>

          {/* Category Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {categories.map((category) => (
              <div
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`cursor-pointer rounded-xl p-6 transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1 ${
                  selectedCategory === category.id
                    ? `bg-white shadow-xl ring-2 ring-${category.color}-500`
                    : 'bg-white shadow-md hover:shadow-lg'
                }`}
              >
                <div className="flex items-center mb-4">
                  <div className="text-4xl mr-4">{category.icon}</div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{category.title}</h3>
                    <p className="text-sm text-gray-500">{category.articleCount} articles</p>
                  </div>
                </div>
                <p className="text-gray-600 mb-4">{category.description}</p>
                <div className="flex items-center justify-between">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getColorClasses(category.color).split(' ')[2]} ${getColorClasses(category.color).split(' ')[3]}`}>
                    View Articles
                  </span>
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            ))}
          </div>

          {/* Selected Category Details */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="flex items-center mb-6">
              <div className="text-4xl mr-4">{currentCategory.icon}</div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">{currentCategory.title}</h3>
                <p className="text-gray-600">{currentCategory.description}</p>
              </div>
            </div>

            {/* Popular Articles */}
            <div className="mb-6">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">Popular Articles in this Category</h4>
              <div className="space-y-4">
                {currentCategory.articles.map((article, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200 cursor-pointer">
                    <div className="flex-1">
                      <h5 className="font-semibold text-gray-900 mb-1">{article.title}</h5>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <span>{article.views} views</span>
                        <span className={`px-2 py-1 rounded-full text-xs ${getDifficultyColor(article.difficulty)}`}>
                          {article.difficulty}
                        </span>
                      </div>
                    </div>
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                ))}
              </div>
            </div>

            {/* View All Button */}
            <div className="text-center">
              <button className={`px-6 py-3 bg-gradient-to-r ${getColorClasses(currentCategory.color).split(' ')[0]} ${getColorClasses(currentCategory.color).split(' ')[1]} text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-200`}>
                View All {currentCategory.articleCount} Articles
              </button>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white rounded-lg p-6 text-center shadow-md">
              <div className="text-2xl font-bold text-blue-600 mb-2">214</div>
              <div className="text-sm text-gray-600">Total Articles</div>
            </div>
            <div className="bg-white rounded-lg p-6 text-center shadow-md">
              <div className="text-2xl font-bold text-green-600 mb-2">50+</div>
              <div className="text-sm text-gray-600">Video Guides</div>
            </div>
            <div className="bg-white rounded-lg p-6 text-center shadow-md">
              <div className="text-2xl font-bold text-purple-600 mb-2">12</div>
              <div className="text-sm text-gray-600">Languages</div>
            </div>
            <div className="bg-white rounded-lg p-6 text-center shadow-md">
              <div className="text-2xl font-bold text-yellow-600 mb-2">24/7</div>
              <div className="text-sm text-gray-600">Support</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HelpCategories;
