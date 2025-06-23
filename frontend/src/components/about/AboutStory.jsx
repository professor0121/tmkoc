const AboutStory = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Story Content */}
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Story</h2>
              <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
                <p>
                  Travel Booking was born from a simple belief: that travel has the power to transform lives, 
                  broaden perspectives, and create lasting memories. Founded in 2014 by a group of passionate 
                  travelers, we started with a mission to make extraordinary travel experiences accessible to everyone.
                </p>
                <p>
                  What began as a small startup with big dreams has grown into a trusted travel platform serving 
                  thousands of adventurers worldwide. Our founders, having traveled to over 80 countries combined, 
                  understood the challenges travelers face - from planning complex itineraries to finding authentic 
                  local experiences.
                </p>
                <p>
                  Today, we're proud to be a leading travel company that combines cutting-edge technology with 
                  human expertise to deliver personalized travel solutions. Every trip we plan is crafted with 
                  care, attention to detail, and a deep understanding of what makes travel truly meaningful.
                </p>
              </div>
              
              {/* Story Highlights */}
              <div className="mt-8 grid grid-cols-2 gap-6">
                <div className="bg-blue-50 rounded-lg p-4">
                  <div className="text-2xl font-bold text-blue-600 mb-1">2014</div>
                  <div className="text-sm font-medium text-gray-900">Founded</div>
                  <div className="text-xs text-gray-600">Started with a dream</div>
                </div>
                <div className="bg-green-50 rounded-lg p-4">
                  <div className="text-2xl font-bold text-green-600 mb-1">Global</div>
                  <div className="text-sm font-medium text-gray-900">Reach</div>
                  <div className="text-xs text-gray-600">Serving worldwide</div>
                </div>
              </div>
            </div>

            {/* Story Images */}
            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <img
                    src="https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
                    alt="Beautiful landscape"
                    className="rounded-lg shadow-lg w-full h-48 object-cover"
                  />
                  <img
                    src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
                    alt="Travel planning"
                    className="rounded-lg shadow-lg w-full h-32 object-cover"
                  />
                </div>
                <div className="space-y-4 mt-8">
                  <img
                    src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
                    alt="Mountain adventure"
                    className="rounded-lg shadow-lg w-full h-32 object-cover"
                  />
                  <img
                    src="https://images.unsplash.com/photo-1539650116574-75c0c6d73f6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
                    alt="Cultural experience"
                    className="rounded-lg shadow-lg w-full h-48 object-cover"
                  />
                </div>
              </div>
              
              {/* Floating Stats */}
              <div className="absolute -bottom-6 -left-6 bg-white rounded-lg shadow-xl p-6 border">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600">4.9★</div>
                  <div className="text-sm text-gray-600">Customer Rating</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutStory;
