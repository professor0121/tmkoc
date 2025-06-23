const AboutValues = () => {
  const values = [
    {
      icon: '🌟',
      title: 'Excellence',
      description: 'We strive for excellence in every aspect of our service, from planning to execution.',
      details: 'Our commitment to excellence means going above and beyond to exceed expectations and deliver exceptional travel experiences.'
    },
    {
      icon: '🤝',
      title: 'Trust',
      description: 'Building lasting relationships through transparency, reliability, and honest communication.',
      details: 'Trust is the foundation of every journey we plan. We believe in transparent pricing, honest recommendations, and reliable service.'
    },
    {
      icon: '🌍',
      title: 'Sustainability',
      description: 'Promoting responsible travel that protects our planet and supports local communities.',
      details: 'We are committed to sustainable tourism practices that preserve destinations for future generations while benefiting local communities.'
    },
    {
      icon: '💡',
      title: 'Innovation',
      description: 'Embracing technology and creative solutions to enhance the travel experience.',
      details: 'We continuously innovate to make travel planning easier, more personalized, and more enjoyable through cutting-edge technology.'
    },
    {
      icon: '❤️',
      title: 'Passion',
      description: 'Our love for travel and exploration drives everything we do.',
      details: 'Travel is not just our business - it\'s our passion. This genuine love for exploration and discovery fuels our dedication to creating amazing experiences.'
    },
    {
      icon: '🎯',
      title: 'Personalization',
      description: 'Every traveler is unique, and so should be their journey.',
      details: 'We believe that no two travelers are alike. That\'s why we focus on creating personalized experiences that match individual preferences and dreams.'
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Core Values</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              These fundamental principles guide our decisions, shape our culture, and define how we serve our travelers
            </p>
          </div>

          {/* Values Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="group bg-gray-50 rounded-xl p-8 hover:bg-white hover:shadow-xl transition-all duration-300 cursor-pointer"
              >
                {/* Icon */}
                <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {value.icon}
                </div>

                {/* Title */}
                <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-300">
                  {value.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 mb-4 leading-relaxed">
                  {value.description}
                </p>

                {/* Details */}
                <p className="text-sm text-gray-500 leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {value.details}
                </p>

                {/* Hover Indicator */}
                <div className="mt-4 w-0 group-hover:w-12 h-1 bg-blue-600 transition-all duration-300 rounded-full"></div>
              </div>
            ))}
          </div>

          {/* Values in Action */}
          <div className="mt-16 bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl p-8">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Values in Action</h3>
              <p className="text-gray-600 max-w-2xl mx-auto">
                See how our values translate into real benefits for our travelers
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3 shadow-md">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h4 className="font-semibold text-gray-900 mb-1">Quality Assurance</h4>
                <p className="text-sm text-gray-600">Every partner vetted and verified</p>
              </div>

              <div className="text-center">
                <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3 shadow-md">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                  </svg>
                </div>
                <h4 className="font-semibold text-gray-900 mb-1">Transparent Pricing</h4>
                <p className="text-sm text-gray-600">No hidden fees or surprises</p>
              </div>

              <div className="text-center">
                <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3 shadow-md">
                  <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <h4 className="font-semibold text-gray-900 mb-1">24/7 Support</h4>
                <p className="text-sm text-gray-600">Always here when you need us</p>
              </div>

              <div className="text-center">
                <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3 shadow-md">
                  <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                  </svg>
                </div>
                <h4 className="font-semibold text-gray-900 mb-1">Personalized Service</h4>
                <p className="text-sm text-gray-600">Tailored to your preferences</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutValues;
