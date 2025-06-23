import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ContactCTA = () => {
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

  const contactMethods = [
    {
      title: 'Start Planning',
      description: 'Ready to book your next adventure?',
      action: 'Browse Packages',
      icon: '🎒',
      color: 'blue',
      onClick: () => navigate('/packages')
    },
    {
      title: 'Custom Trip',
      description: 'Need a personalized travel experience?',
      action: 'Plan Custom Trip',
      icon: '🗺️',
      color: 'purple',
      onClick: () => navigate('/services/custom')
    },
    {
      title: 'Get Support',
      description: 'Have questions about your booking?',
      action: 'Contact Support',
      icon: '🎧',
      color: 'green',
      onClick: () => window.open('tel:+15551234567')
    }
  ];

  const getColorClasses = (color) => {
    const colors = {
      blue: 'from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700',
      purple: 'from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700',
      green: 'from-green-500 to-green-600 hover:from-green-600 hover:to-green-700'
    };
    return colors[color] || colors.blue;
  };

  return (
    <section className="py-16 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Main CTA */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Let's Make Your
              <span className="block text-yellow-400">Travel Dreams Reality</span>
            </h2>
            <p className="text-xl md:text-2xl mb-8 opacity-90 max-w-3xl mx-auto">
              Whether you need help planning, have questions, or want to start your next adventure, 
              we're here to make it happen.
            </p>
          </div>

          {/* Action Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {contactMethods.map((method, index) => (
              <div
                key={index}
                className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-8 text-center hover:bg-opacity-20 transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className="text-5xl mb-4">{method.icon}</div>
                <h3 className="text-xl font-bold mb-3">{method.title}</h3>
                <p className="text-sm opacity-90 mb-6">{method.description}</p>
                <button
                  onClick={method.onClick}
                  className={`w-full px-6 py-3 bg-gradient-to-r ${getColorClasses(method.color)} text-white font-semibold rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg`}
                >
                  {method.action}
                </button>
              </div>
            ))}
          </div>

          {/* Contact Information Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            <div className="text-center">
              <div className="bg-white bg-opacity-20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📞</span>
              </div>
              <h4 className="font-semibold mb-2">24/7 Phone Support</h4>
              <p className="text-sm opacity-90 mb-2">+1 (555) 123-4567</p>
              <p className="text-xs opacity-75">Always available for emergencies</p>
            </div>
            
            <div className="text-center">
              <div className="bg-white bg-opacity-20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📧</span>
              </div>
              <h4 className="font-semibold mb-2">Email Support</h4>
              <p className="text-sm opacity-90 mb-2">hello@travel.com</p>
              <p className="text-xs opacity-75">Response within 2 hours</p>
            </div>
            
            <div className="text-center">
              <div className="bg-white bg-opacity-20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">💬</span>
              </div>
              <h4 className="font-semibold mb-2">Live Chat</h4>
              <p className="text-sm opacity-90 mb-2">Instant Support</p>
              <p className="text-xs opacity-75">9 AM - 9 PM EST</p>
            </div>
            
            <div className="text-center">
              <div className="bg-white bg-opacity-20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📍</span>
              </div>
              <h4 className="font-semibold mb-2">Visit Our Offices</h4>
              <p className="text-sm opacity-90 mb-2">3 Global Locations</p>
              <p className="text-xs opacity-75">SF, NYC, London</p>
            </div>
          </div>

          {/* Newsletter Signup */}
          <div className="max-w-2xl mx-auto text-center mb-16">
            <h3 className="text-2xl font-bold mb-4">Stay in Touch</h3>
            <p className="text-lg opacity-90 mb-6">
              Get travel tips, exclusive deals, and updates delivered to your inbox
            </p>
            
            {isSubscribed ? (
              <div className="bg-green-500 text-white px-6 py-3 rounded-lg inline-flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Thanks for subscribing!
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
              Join 5,000+ subscribers. No spam, unsubscribe anytime.
            </p>
          </div>

          {/* Emergency Contact */}
          <div className="bg-red-500 bg-opacity-20 border border-red-300 rounded-xl p-8 text-center">
            <h3 className="text-2xl font-bold mb-4 flex items-center justify-center">
              <span className="text-3xl mr-3">🚨</span>
              Emergency Support
            </h3>
            <p className="text-lg opacity-90 mb-6">
              Traveling and need immediate assistance? Our emergency team is available 24/7.
            </p>
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <a
                href="tel:+15551234568"
                className="px-8 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-colors duration-200 inline-flex items-center justify-center"
              >
                <span className="mr-2">📞</span>
                Emergency Hotline
              </a>
              <a
                href="https://wa.me/15551234568"
                className="px-8 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-colors duration-200 inline-flex items-center justify-center"
              >
                <span className="mr-2">💬</span>
                WhatsApp Emergency
              </a>
            </div>
            <p className="text-sm opacity-75 mt-4">
              For travelers experiencing emergencies, medical issues, or urgent travel disruptions
            </p>
          </div>

          {/* Social Media */}
          <div className="mt-16 text-center">
            <h4 className="text-xl font-semibold mb-6">Follow Our Journey</h4>
            <div className="flex justify-center space-x-6">
              <a href="#" className="text-white hover:text-yellow-400 transition-colors duration-200">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                </svg>
              </a>
              <a href="#" className="text-white hover:text-yellow-400 transition-colors duration-200">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="text-white hover:text-yellow-400 transition-colors duration-200">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001.012.001z"/>
                </svg>
              </a>
              <a href="#" className="text-white hover:text-yellow-400 transition-colors duration-200">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.5.75C6.146.75 1 5.896 1 12.25c0 5.089 3.292 9.387 7.863 10.91-.11-.971-.209-2.462.044-3.518.219-.932 1.405-5.938 1.405-5.938s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 01.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.357-.63-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146 1.124.347 2.317.535 3.554.535 6.355 0 11.5-5.146 11.5-11.5S18.855.75 12.5.75z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Final Message */}
          <div className="mt-12 text-center">
            <p className="text-lg opacity-90">
              We're excited to help you create your next unforgettable adventure! 🌟
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactCTA;
