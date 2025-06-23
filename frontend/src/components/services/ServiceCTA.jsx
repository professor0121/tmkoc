import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ServiceCTA = () => {
  const navigate = useNavigate();
  const { user } = useSelector(state => state.auth);
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleNewsletterSignup = (e) => {
    e.preventDefault();
    if (email) {
      // Here you would typically send the email to your backend
      setIsSubscribed(true);
      setEmail('');
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  };

  return (
    <section id="contact-section" className="py-16 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 text-white">
      <div className="container mx-auto px-4">
        {/* Main CTA */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Start Your
            <span className="block text-yellow-400">Dream Journey?</span>
          </h2>
          <p className="text-xl md:text-2xl mb-8 opacity-90 max-w-3xl mx-auto">
            Join thousands of travelers who have discovered amazing destinations with our expert travel services
          </p>
          
          {/* Primary CTA Buttons */}
          <div className="flex flex-col md:flex-row gap-4 justify-center mb-12">
            {user ? (
              <>
                <button
                  onClick={() => navigate('/packages')}
                  className="px-8 py-4 bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg"
                >
                  Browse Travel Packages
                </button>
                <button
                  onClick={() => navigate('/my-bookings')}
                  className="px-8 py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-blue-600 transition-all duration-200 transform hover:scale-105"
                >
                  View My Bookings
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => navigate('/auth')}
                  className="px-8 py-4 bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg"
                >
                  Get Started Today
                </button>
                <button
                  onClick={() => navigate('/packages')}
                  className="px-8 py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-blue-600 transition-all duration-200 transform hover:scale-105"
                >
                  Explore Packages
                </button>
              </>
            )}
            <button
              onClick={() => navigate('/contact')}
              className="px-8 py-4 bg-transparent border-2 border-yellow-400 text-yellow-400 font-semibold rounded-lg hover:bg-yellow-400 hover:text-gray-900 transition-all duration-200 transform hover:scale-105"
            >
              Get Custom Quote
            </button>
          </div>
        </div>

        {/* Service Quick Links */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="text-center">
            <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">🎒</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Travel Packages</h3>
            <p className="text-sm opacity-90 mb-4">Pre-designed trips with everything included</p>
            <button
              onClick={() => navigate('/packages')}
              className="text-yellow-400 hover:text-yellow-300 font-medium underline"
            >
              Browse Packages →
            </button>
          </div>
          
          <div className="text-center">
            <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">🗺️</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Custom Planning</h3>
            <p className="text-sm opacity-90 mb-4">Personalized itineraries just for you</p>
            <button
              onClick={() => navigate('/services/custom')}
              className="text-yellow-400 hover:text-yellow-300 font-medium underline"
            >
              Plan Custom Trip →
            </button>
          </div>
          
          <div className="text-center">
            <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">🌍</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Destinations</h3>
            <p className="text-sm opacity-90 mb-4">Discover amazing places worldwide</p>
            <button
              onClick={() => navigate('/destinations')}
              className="text-yellow-400 hover:text-yellow-300 font-medium underline"
            >
              Explore Destinations →
            </button>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="max-w-2xl mx-auto text-center">
          <h3 className="text-2xl font-bold mb-4">Stay Updated with Travel Deals</h3>
          <p className="text-lg opacity-90 mb-6">
            Get exclusive offers, travel tips, and destination guides delivered to your inbox
          </p>
          
          {isSubscribed ? (
            <div className="bg-green-500 text-white px-6 py-3 rounded-lg inline-flex items-center">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Thank you for subscribing!
            </div>
          ) : (
            <form onSubmit={handleNewsletterSignup} className="flex flex-col md:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-4 focus:ring-yellow-400"
                required
              />
              <button
                type="submit"
                className="px-6 py-3 bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold rounded-lg transition-colors duration-200"
              >
                Subscribe
              </button>
            </form>
          )}
          
          <p className="text-sm opacity-75 mt-4">
            No spam, unsubscribe at any time. We respect your privacy.
          </p>
        </div>

        {/* Contact Information */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div>
            <div className="text-2xl mb-2">📞</div>
            <h4 className="font-semibold mb-1">Call Us</h4>
            <p className="opacity-90">+1 (555) 123-4567</p>
            <p className="text-sm opacity-75">Available 24/7</p>
          </div>
          
          <div>
            <div className="text-2xl mb-2">📧</div>
            <h4 className="font-semibold mb-1">Email Us</h4>
            <p className="opacity-90">support@travel.com</p>
            <p className="text-sm opacity-75">Response within 2 hours</p>
          </div>
          
          <div>
            <div className="text-2xl mb-2">💬</div>
            <h4 className="font-semibold mb-1">Live Chat</h4>
            <p className="opacity-90">Instant Support</p>
            <p className="text-sm opacity-75">Available 9 AM - 9 PM</p>
          </div>
        </div>

        {/* Social Proof */}
        <div className="mt-16 text-center">
          <p className="text-lg opacity-90 mb-6">Trusted by over 10,000 travelers worldwide</p>
          <div className="flex justify-center items-center space-x-8 opacity-75">
            <div className="text-sm">
              <div className="font-bold text-xl">4.9/5</div>
              <div>Customer Rating</div>
            </div>
            <div className="text-sm">
              <div className="font-bold text-xl">98%</div>
              <div>Satisfaction Rate</div>
            </div>
            <div className="text-sm">
              <div className="font-bold text-xl">50+</div>
              <div>Destinations</div>
            </div>
            <div className="text-sm">
              <div className="font-bold text-xl">24/7</div>
              <div>Support</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceCTA;
