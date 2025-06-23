const HelpHero = () => {
  return (
    <section className="bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 text-white py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Help
            <span className="block text-yellow-400">Center</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90 max-w-3xl mx-auto leading-relaxed">
            Find answers to your questions, learn how to use our platform, and get the support you need 
            for your travel planning journey.
          </p>
          
          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 text-black">
            <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-6">
              <div className="text-3xl font-bold mb-2">500+</div>
              <div className="text-lg font-semibold mb-1">Help Articles</div>
              <p className="text-sm opacity-90">Comprehensive guides and tutorials</p>
            </div>
            <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-6">
              <div className="text-3xl font-bold mb-2">24/7</div>
              <div className="text-lg font-semibold mb-1">Support Available</div>
              <p className="text-sm opacity-90">Always here when you need us</p>
            </div>
            <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-6">
              <div className="text-3xl font-bold mb-2">98%</div>
              <div className="text-lg font-semibold mb-1">Issues Resolved</div>
              <p className="text-sm opacity-90">Quick and effective solutions</p>
            </div>
          </div>

          {/* Popular Topics */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4">Popular Topics</h3>
            <div className="flex flex-wrap justify-center gap-3 text-black">
              <button className="px-4 py-2 bg-white bg-opacity-20 rounded-full text-sm hover:bg-opacity-30 transition-all duration-200">
                How to Book
              </button>
              <button className="px-4 py-2 bg-white bg-opacity-20 rounded-full text-sm hover:bg-opacity-30 transition-all duration-200">
                Payment Issues
              </button>
              <button className="px-4 py-2 bg-white bg-opacity-20 rounded-full text-sm hover:bg-opacity-30 transition-all duration-200">
                Cancellations
              </button>
              <button className="px-4 py-2 bg-white bg-opacity-20 rounded-full text-sm hover:bg-opacity-30 transition-all duration-200">
                Travel Documents
              </button>
              <button className="px-4 py-2 bg-white bg-opacity-20 rounded-full text-sm hover:bg-opacity-30 transition-all duration-200">
                Account Settings
              </button>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <button
              onClick={() => document.getElementById('help-search')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-3 bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold rounded-lg transition-colors duration-200"
            >
              Search Help Articles
            </button>
            <button
              onClick={() => document.getElementById('help-contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-blue-600 transition-colors duration-200"
            >
              Contact Support
            </button>
            <button
              onClick={() => document.getElementById('help-categories')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-3 bg-transparent border-2 border-yellow-400 text-yellow-400 font-semibold rounded-lg hover:bg-yellow-400 hover:text-gray-900 transition-colors duration-200"
            >
              Browse Categories
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HelpHero;
