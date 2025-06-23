import { useNavigate } from 'react-router-dom';

const AboutHero = () => {
  const navigate = useNavigate();

  return (
    <section className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 text-white">
      <div 
        className="relative min-h-[80vh] flex items-center justify-center bg-cover bg-center"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')"
        }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative text-center px-4 max-w-5xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            About
            <span className="block text-yellow-400">Travel Booking</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90 max-w-3xl mx-auto leading-relaxed">
            We're passionate about creating unforgettable travel experiences that connect people 
            with the world's most amazing destinations and cultures.
          </p>
          
          {/* Key Highlights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-6">
              <div className="text-3xl font-bold mb-2">10+</div>
              <div className="text-lg font-semibold mb-1">Years Experience</div>
              <p className="text-sm opacity-90">Serving travelers worldwide</p>
            </div>
            <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-6">
              <div className="text-3xl font-bold mb-2">50+</div>
              <div className="text-lg font-semibold mb-1">Destinations</div>
              <p className="text-sm opacity-90">Across 6 continents</p>
            </div>
            <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-6">
              <div className="text-3xl font-bold mb-2">10K+</div>
              <div className="text-lg font-semibold mb-1">Happy Travelers</div>
              <p className="text-sm opacity-90">And counting</p>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate('/services')}
              className="px-8 py-3 bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold rounded-lg transition-colors duration-200"
            >
              Our Services
            </button>
            <button
              onClick={() => navigate('/contact')}
              className="px-8 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-blue-600 transition-colors duration-200"
            >
              Contact Us
            </button>
            <button
              onClick={() => document.getElementById('team-section')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-3 bg-transparent border-2 border-yellow-400 text-yellow-400 font-semibold rounded-lg hover:bg-yellow-400 hover:text-gray-900 transition-colors duration-200"
            >
              Meet Our Team
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutHero;
