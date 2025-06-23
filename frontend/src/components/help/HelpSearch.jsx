import { useState } from 'react';

const HelpSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  // Mock search data - in real app, this would come from API
  const helpArticles = [
    {
      id: 1,
      title: 'How to Book a Travel Package',
      category: 'Booking',
      excerpt: 'Step-by-step guide to booking your perfect travel package...',
      url: '/help/how-to-book',
      tags: ['booking', 'packages', 'payment']
    },
    {
      id: 2,
      title: 'Cancellation and Refund Policy',
      category: 'Policies',
      excerpt: 'Understanding our cancellation terms and refund process...',
      url: '/help/cancellation-policy',
      tags: ['cancellation', 'refund', 'policy']
    },
    {
      id: 3,
      title: 'Payment Methods and Security',
      category: 'Payment',
      excerpt: 'Learn about accepted payment methods and security measures...',
      url: '/help/payment-methods',
      tags: ['payment', 'security', 'credit card']
    },
    {
      id: 4,
      title: 'Travel Document Requirements',
      category: 'Travel',
      excerpt: 'Essential documents needed for international travel...',
      url: '/help/travel-documents',
      tags: ['documents', 'passport', 'visa']
    },
    {
      id: 5,
      title: 'Managing Your Account',
      category: 'Account',
      excerpt: 'How to update your profile, preferences, and settings...',
      url: '/help/account-management',
      tags: ['account', 'profile', 'settings']
    }
  ];

  const popularSearches = [
    'How to cancel booking',
    'Payment failed',
    'Change travel dates',
    'Passport requirements',
    'Travel insurance',
    'Group bookings',
    'Loyalty program',
    'Mobile app'
  ];

  const handleSearch = (term) => {
    setSearchTerm(term);
    if (term.length > 2) {
      setIsSearching(true);
      // Simulate API call
      setTimeout(() => {
        const results = helpArticles.filter(article =>
          article.title.toLowerCase().includes(term.toLowerCase()) ||
          article.excerpt.toLowerCase().includes(term.toLowerCase()) ||
          article.tags.some(tag => tag.toLowerCase().includes(term.toLowerCase()))
        );
        setSearchResults(results);
        setIsSearching(false);
      }, 500);
    } else {
      setSearchResults([]);
    }
  };

  const handlePopularSearch = (term) => {
    setSearchTerm(term);
    handleSearch(term);
  };

  return (
    <section id="help-search" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Search Header */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Search Help Articles</h2>
            <p className="text-xl text-gray-600">
              Find quick answers to your questions with our comprehensive help database
            </p>
          </div>

          {/* Search Bar */}
          <div className="relative mb-8">
            <div className="relative">
              <input
                type="text"
                placeholder="Search for help articles, guides, or FAQs..."
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
                className="w-full px-6 py-4 pl-14 text-lg border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
              />
              <svg
                className="absolute left-5 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              {isSearching && (
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                  <svg className="animate-spin h-5 w-5 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                </div>
              )}
            </div>
          </div>

          {/* Search Results */}
          {searchResults.length > 0 && (
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Search Results ({searchResults.length})
              </h3>
              <div className="space-y-4">
                {searchResults.map((article) => (
                  <div key={article.id} className="bg-gray-50 rounded-lg p-6 hover:bg-gray-100 transition-colors duration-200 cursor-pointer">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center mb-2">
                          <h4 className="text-lg font-semibold text-gray-900 mr-3">{article.title}</h4>
                          <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                            {article.category}
                          </span>
                        </div>
                        <p className="text-gray-600 mb-3">{article.excerpt}</p>
                        <div className="flex flex-wrap gap-2">
                          {article.tags.map((tag, index) => (
                            <span key={index} className="px-2 py-1 bg-gray-200 text-gray-700 text-xs rounded">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                      <svg className="w-5 h-5 text-gray-400 ml-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* No Results */}
          {searchTerm.length > 2 && searchResults.length === 0 && !isSearching && (
            <div className="text-center py-8">
              <div className="text-4xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No results found</h3>
              <p className="text-gray-600 mb-6">
                We couldn't find any articles matching "{searchTerm}". Try different keywords or browse our categories below.
              </p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSearchResults([]);
                }}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
              >
                Clear Search
              </button>
            </div>
          )}

          {/* Popular Searches */}
          {searchTerm.length === 0 && (
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Popular Searches</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {popularSearches.map((search, index) => (
                  <button
                    key={index}
                    onClick={() => handlePopularSearch(search)}
                    className="p-3 text-left bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200 text-sm"
                  >
                    <div className="flex items-center">
                      <svg className="w-4 h-4 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                      {search}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quick Actions */}
          <div className="mt-12 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-6 text-center">Quick Actions</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <button className="flex items-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
                <div className="bg-blue-100 rounded-full p-3 mr-4">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                <div className="text-left">
                  <h4 className="font-semibold text-gray-900">Live Chat</h4>
                  <p className="text-sm text-gray-600">Get instant help</p>
                </div>
              </button>

              <button className="flex items-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
                <div className="bg-green-100 rounded-full p-3 mr-4">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div className="text-left">
                  <h4 className="font-semibold text-gray-900">Call Support</h4>
                  <p className="text-sm text-gray-600">24/7 phone support</p>
                </div>
              </button>

              <button className="flex items-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
                <div className="bg-purple-100 rounded-full p-3 mr-4">
                  <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="text-left">
                  <h4 className="font-semibold text-gray-900">Email Support</h4>
                  <p className="text-sm text-gray-600">Send us a message</p>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HelpSearch;
