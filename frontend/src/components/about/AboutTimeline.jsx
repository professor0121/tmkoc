const AboutTimeline = () => {
  const timelineEvents = [
    {
      year: '2014',
      title: 'Company Founded',
      description: 'Travel Booking was founded by three passionate travelers with a vision to make extraordinary travel accessible to everyone.',
      icon: '🚀',
      color: 'blue',
      achievements: ['Initial funding secured', 'First team of 5 members', 'Basic platform launched']
    },
    {
      year: '2015',
      title: 'First 100 Travelers',
      description: 'Reached our first major milestone by successfully serving 100 happy travelers across 10 destinations.',
      icon: '🎯',
      color: 'green',
      achievements: ['100+ successful trips', '10 destination partnerships', 'Customer support established']
    },
    {
      year: '2016',
      title: 'Technology Innovation',
      description: 'Launched our proprietary booking platform with AI-powered recommendations and real-time availability.',
      icon: '💡',
      color: 'purple',
      achievements: ['AI recommendation engine', 'Mobile app launched', 'Real-time booking system']
    },
    {
      year: '2017',
      title: 'International Expansion',
      description: 'Expanded operations to serve customers globally with partnerships across 25 countries.',
      icon: '🌍',
      color: 'indigo',
      achievements: ['25 country partnerships', 'Multi-language support', 'International payment gateway']
    },
    {
      year: '2018',
      title: '1,000 Travelers Milestone',
      description: 'Celebrated serving our 1,000th traveler and received our first industry recognition award.',
      icon: '🏆',
      color: 'yellow',
      achievements: ['1,000+ travelers served', 'First industry award', 'Customer loyalty program']
    },
    {
      year: '2019',
      title: 'Sustainable Tourism Initiative',
      description: 'Launched our sustainability program focusing on eco-friendly travel and supporting local communities.',
      icon: '🌱',
      color: 'green',
      achievements: ['Carbon offset program', 'Local community partnerships', 'Eco-friendly accommodations']
    },
    {
      year: '2020',
      title: 'Pandemic Resilience',
      description: 'Adapted to global challenges by introducing flexible booking policies and virtual travel experiences.',
      icon: '🛡️',
      color: 'red',
      achievements: ['Flexible cancellation policies', 'Virtual travel experiences', 'Enhanced safety protocols']
    },
    {
      year: '2021',
      title: 'Digital Transformation',
      description: 'Completed major platform upgrade with enhanced user experience and advanced personalization features.',
      icon: '📱',
      color: 'blue',
      achievements: ['Platform 2.0 launch', 'Advanced personalization', 'Enhanced mobile experience']
    },
    {
      year: '2022',
      title: '5,000 Travelers & Awards',
      description: 'Reached 5,000 travelers milestone and won multiple industry awards for innovation and customer service.',
      icon: '🥇',
      color: 'gold',
      achievements: ['5,000+ travelers', 'Multiple industry awards', 'Customer satisfaction 98%']
    },
    {
      year: '2023',
      title: 'AI-Powered Personalization',
      description: 'Introduced advanced AI features for hyper-personalized travel recommendations and dynamic pricing.',
      icon: '🤖',
      color: 'purple',
      achievements: ['AI personalization engine', 'Dynamic pricing system', 'Predictive analytics']
    },
    {
      year: '2024',
      title: '10,000+ Travelers & Beyond',
      description: 'Celebrating over 10,000 happy travelers and continuing to innovate for the future of travel.',
      icon: '🎉',
      color: 'rainbow',
      achievements: ['10,000+ travelers', '50+ destinations', 'Future expansion plans']
    }
  ];

  const getColorClasses = (color) => {
    const colors = {
      blue: 'bg-blue-500 border-blue-200',
      green: 'bg-green-500 border-green-200',
      purple: 'bg-purple-500 border-purple-200',
      indigo: 'bg-indigo-500 border-indigo-200',
      yellow: 'bg-yellow-500 border-yellow-200',
      red: 'bg-red-500 border-red-200',
      gold: 'bg-yellow-400 border-yellow-200',
      rainbow: 'bg-gradient-to-r from-blue-500 to-purple-500 border-blue-200'
    };
    return colors[color] || colors.blue;
  };

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Journey Through Time</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From a small startup to a global travel platform - discover the key milestones 
              that shaped our company and defined our commitment to exceptional travel experiences.
            </p>
          </div>

          {/* Timeline */}
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-gray-200 h-full hidden lg:block"></div>

            {/* Timeline Events */}
            <div className="space-y-12">
              {timelineEvents.map((event, index) => (
                <div
                  key={index}
                  className={`relative flex items-center ${
                    index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                  } flex-col lg:space-x-8`}
                >
                  {/* Timeline Dot */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 hidden lg:flex">
                    <div className={`w-16 h-16 rounded-full ${getColorClasses(event.color)} flex items-center justify-center text-white text-2xl shadow-lg border-4 border-white`}>
                      {event.icon}
                    </div>
                  </div>

                  {/* Content Card */}
                  <div className={`w-full lg:w-5/12 ${index % 2 === 0 ? 'lg:text-right lg:pr-8' : 'lg:text-left lg:pl-8'}`}>
                    <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300 border border-gray-100">
                      {/* Mobile Icon */}
                      <div className="lg:hidden flex items-center mb-4">
                        <div className={`w-12 h-12 rounded-full ${getColorClasses(event.color)} flex items-center justify-center text-white text-xl mr-4`}>
                          {event.icon}
                        </div>
                        <div className="text-2xl font-bold text-gray-900">{event.year}</div>
                      </div>

                      {/* Desktop Year */}
                      <div className="hidden lg:block text-2xl font-bold text-gray-900 mb-3">{event.year}</div>

                      {/* Title */}
                      <h3 className="text-xl font-bold text-gray-900 mb-3">{event.title}</h3>

                      {/* Description */}
                      <p className="text-gray-600 mb-4 leading-relaxed">{event.description}</p>

                      {/* Achievements */}
                      <div className="space-y-2">
                        {event.achievements.map((achievement, achievementIndex) => (
                          <div key={achievementIndex} className="flex items-center text-sm text-gray-700">
                            <svg className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            {achievement}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Spacer for opposite side */}
                  <div className="hidden lg:block w-5/12"></div>
                </div>
              ))}
            </div>
          </div>

          {/* Future Vision */}
          <div className="mt-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8 text-white text-center">
            <h3 className="text-2xl font-bold mb-4">Looking Ahead</h3>
            <p className="text-lg opacity-90 mb-6 max-w-3xl mx-auto">
              Our journey is far from over. We're committed to continuing our innovation in travel technology, 
              expanding to new destinations, and creating even more extraordinary experiences for travelers worldwide.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <div className="text-3xl mb-2">🚀</div>
                <h4 className="font-semibold mb-1">2025 Goals</h4>
                <p className="text-sm opacity-90">20,000+ travelers, 100+ destinations</p>
              </div>
              <div>
                <div className="text-3xl mb-2">🌍</div>
                <h4 className="font-semibold mb-1">Global Expansion</h4>
                <p className="text-sm opacity-90">New markets in Asia and Africa</p>
              </div>
              <div>
                <div className="text-3xl mb-2">💡</div>
                <h4 className="font-semibold mb-1">Innovation</h4>
                <p className="text-sm opacity-90">VR previews, blockchain payments</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutTimeline;
