import { useState, useEffect } from 'react';

const ServiceTestimonials = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const testimonials = [
    {
      id: 1,
      name: 'Sarah Johnson',
      location: 'New York, USA',
      service: 'Custom Itinerary',
      rating: 5,
      text: 'The custom itinerary service exceeded all my expectations. Every detail was perfectly planned, and the local experiences were absolutely incredible. I felt like I had a personal travel expert with me throughout the entire journey.',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
      trip: 'Japan Cultural Tour'
    },
    {
      id: 2,
      name: 'Michael Chen',
      location: 'Toronto, Canada',
      service: 'Adventure Tours',
      rating: 5,
      text: 'The adventure tour in Nepal was life-changing! The guides were incredibly knowledgeable and safety-focused. Every activity was well-organized, and the equipment provided was top-notch. Highly recommend for thrill-seekers!',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
      trip: 'Nepal Himalayan Trek'
    },
    {
      id: 3,
      name: 'Emily Rodriguez',
      location: 'Madrid, Spain',
      service: 'Luxury Travel',
      rating: 5,
      text: 'From the moment we arrived, everything was flawless. The luxury accommodations, private transfers, and exclusive experiences made our anniversary trip unforgettable. The concierge service was exceptional.',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
      trip: 'Maldives Luxury Escape'
    },
    {
      id: 4,
      name: 'David Thompson',
      location: 'London, UK',
      service: 'Group Tours',
      rating: 5,
      text: 'Traveling solo, I was nervous about joining a group tour, but it turned out to be the best decision! Met amazing people, shared incredible experiences, and the group leader made sure everyone felt included.',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
      trip: 'European Heritage Tour'
    },
    {
      id: 5,
      name: 'Lisa Wang',
      location: 'Sydney, Australia',
      service: 'Travel Packages',
      rating: 5,
      text: 'The all-inclusive package was perfect for our family vacation. Everything was taken care of - flights, hotels, activities, and meals. The kids loved every moment, and we could just relax and enjoy.',
      image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
      trip: 'Bali Family Adventure'
    },
    {
      id: 6,
      name: 'Robert Martinez',
      location: 'Mexico City, Mexico',
      service: 'Business Travel',
      rating: 5,
      text: 'Their business travel service is outstanding. Flexible bookings, excellent corporate rates, and 24/7 support made managing our company trips effortless. The expense reporting feature is a game-changer.',
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
      trip: 'Corporate Conference Travel'
    }
  ];

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [testimonials.length]);

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <svg
        key={index}
        className={`w-5 h-5 ${index < rating ? 'text-yellow-400' : 'text-gray-300'}`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ));
  };

  return (
    <section className="py-16 bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">What Our Travelers Say</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Don't just take our word for it. Here's what our satisfied customers have to say about their experiences.
          </p>
        </div>

        {/* Main Testimonial Display */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
              {/* Customer Image */}
              <div className="flex-shrink-0">
                <img
                  src={testimonials[currentTestimonial].image}
                  alt={testimonials[currentTestimonial].name}
                  className="w-24 h-24 rounded-full object-cover shadow-lg"
                />
              </div>

              {/* Testimonial Content */}
              <div className="flex-1 text-center md:text-left">
                {/* Rating */}
                <div className="flex justify-center md:justify-start mb-4">
                  {renderStars(testimonials[currentTestimonial].rating)}
                </div>

                {/* Quote */}
                <blockquote className="text-lg md:text-xl text-gray-700 mb-6 italic">
                  "{testimonials[currentTestimonial].text}"
                </blockquote>

                {/* Customer Info */}
                <div className="border-t pt-6">
                  <div className="font-semibold text-gray-900 text-lg">
                    {testimonials[currentTestimonial].name}
                  </div>
                  <div className="text-gray-600 mb-2">
                    {testimonials[currentTestimonial].location}
                  </div>
                  <div className="flex flex-col md:flex-row md:items-center gap-2">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                      {testimonials[currentTestimonial].service}
                    </span>
                    <span className="text-gray-500 text-sm">
                      {testimonials[currentTestimonial].trip}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Testimonial Navigation */}
        <div className="flex justify-center space-x-2 mb-8">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentTestimonial(index)}
              className={`w-3 h-3 rounded-full transition-all duration-200 ${
                index === currentTestimonial ? 'bg-blue-600' : 'bg-gray-300 hover:bg-gray-400'
              }`}
            />
          ))}
        </div>

        {/* Testimonial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.slice(0, 6).map((testimonial, index) => (
            <div
              key={testimonial.id}
              className={`bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer ${
                index === currentTestimonial ? 'ring-2 ring-blue-500' : ''
              }`}
              onClick={() => setCurrentTestimonial(index)}
            >
              <div className="flex items-center mb-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <div className="font-semibold text-gray-900">{testimonial.name}</div>
                  <div className="text-sm text-gray-600">{testimonial.location}</div>
                </div>
              </div>
              
              <div className="flex mb-3">
                {renderStars(testimonial.rating)}
              </div>
              
              <p className="text-gray-700 text-sm mb-3 line-clamp-3">
                "{testimonial.text}"
              </p>
              
              <div className="text-xs text-blue-600 font-medium">
                {testimonial.service} • {testimonial.trip}
              </div>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="mt-16 bg-white rounded-xl p-8 shadow-lg">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-2">10,000+</div>
              <div className="text-gray-600">Happy Travelers</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-2">4.9/5</div>
              <div className="text-gray-600">Average Rating</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-2">98%</div>
              <div className="text-gray-600">Satisfaction Rate</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-2">50+</div>
              <div className="text-gray-600">Destinations</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceTestimonials;
