import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const CTASection = () => {
  const navigate = useNavigate();
  const { user } = useSelector(state => state.auth);

  return (
    <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-700 text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold mb-4">Ready to Start Your Adventure?</h2>
        <p className="text-xl mb-8 opacity-90">
          Join thousands of travelers who have discovered amazing destinations with us
        </p>
        
        <div className="flex flex-col md:flex-row gap-4 justify-center">
          {user ? (
            <>
              <button
                onClick={() => navigate('/packages')}
                className="px-8 py-3 bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold rounded-lg transition-colors duration-200"
              >
                Browse Packages
              </button>
              <button
                onClick={() => navigate('/my-bookings')}
                className="px-8 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-blue-600 transition-colors duration-200"
              >
                My Bookings
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => navigate('/auth')}
                className="px-8 py-3 bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold rounded-lg transition-colors duration-200"
              >
                Sign Up Now
              </button>
              <button
                onClick={() => navigate('/packages')}
                className="px-8 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-blue-600 transition-colors duration-200"
              >
                Explore Packages
              </button>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default CTASection;
