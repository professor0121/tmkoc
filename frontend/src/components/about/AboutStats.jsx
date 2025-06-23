import { useState, useEffect } from 'react';

const AboutStats = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [animatedStats, setAnimatedStats] = useState({
    travelers: 0,
    destinations: 0,
    satisfaction: 0,
    years: 0
  });

  const finalStats = {
    travelers: 10000,
    destinations: 50,
    satisfaction: 98,
    years: 10
  };

  const stats = [
    {
      key: 'travelers',
      value: animatedStats.travelers,
      label: 'Happy Travelers',
      suffix: '+',
      icon: '👥',
      color: 'blue',
      description: 'Customers who have traveled with us'
    },
    {
      key: 'destinations',
      value: animatedStats.destinations,
      label: 'Destinations',
      suffix: '+',
      icon: '🌍',
      color: 'green',
      description: 'Countries and regions we serve'
    },
    {
      key: 'satisfaction',
      value: animatedStats.satisfaction,
      label: 'Satisfaction Rate',
      suffix: '%',
      icon: '⭐',
      color: 'yellow',
      description: 'Customer satisfaction rating'
    },
    {
      key: 'years',
      value: animatedStats.years,
      label: 'Years Experience',
      suffix: '+',
      icon: '🏆',
      color: 'purple',
      description: 'Years in the travel industry'
    }
  ];

  const achievements = [
    {
      title: 'Best Travel Platform 2023',
      organization: 'Travel Industry Awards',
      icon: '🏆',
      year: '2023'
    },
    {
      title: 'Customer Choice Award',
      organization: 'TripAdvisor',
      icon: '🥇',
      year: '2023'
    },
    {
      title: 'Sustainable Tourism Leader',
      organization: 'Green Travel Association',
      icon: '🌱',
      year: '2022'
    },
    {
      title: 'Innovation in Travel Tech',
      organization: 'Tech Travel Awards',
      icon: '💡',
      year: '2022'
    }
  ];

  // Animate numbers when component becomes visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    const element = document.getElementById('stats-section');
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, []);

  // Animate stats when visible
  useEffect(() => {
    if (isVisible) {
      const duration = 2000; // 2 seconds
      const steps = 60; // 60 steps for smooth animation
      const stepDuration = duration / steps;

      let currentStep = 0;
      const timer = setInterval(() => {
        currentStep++;
        const progress = currentStep / steps;

        setAnimatedStats({
          travelers: Math.floor(finalStats.travelers * progress),
          destinations: Math.floor(finalStats.destinations * progress),
          satisfaction: Math.floor(finalStats.satisfaction * progress),
          years: Math.floor(finalStats.years * progress)
        });

        if (currentStep >= steps) {
          clearInterval(timer);
          setAnimatedStats(finalStats);
        }
      }, stepDuration);

      return () => clearInterval(timer);
    }
  }, [isVisible]);

  const getColorClasses = (color) => {
    const colors = {
      blue: 'from-blue-500 to-blue-600 text-blue-600',
      green: 'from-green-500 to-green-600 text-green-600',
      yellow: 'from-yellow-500 to-yellow-600 text-yellow-600',
      purple: 'from-purple-500 to-purple-600 text-purple-600'
    };
    return colors[color] || colors.blue;
  };

  return (
    <section id="stats-section" className="py-16 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Impact in Numbers</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              These numbers represent more than statistics - they represent dreams fulfilled, 
              memories created, and lives enriched through travel.
            </p>
          </div>

          {/* Main Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {stats.map((stat, index) => (
              <div
                key={stat.key}
                className="bg-white rounded-xl shadow-lg p-8 text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className="text-4xl mb-4">{stat.icon}</div>
                <div className={`text-4xl font-bold mb-2 bg-gradient-to-r ${getColorClasses(stat.color)} bg-clip-text text-transparent`}>
                  {stat.value.toLocaleString()}{stat.suffix}
                </div>
                <div className="text-lg font-semibold text-gray-900 mb-2">{stat.label}</div>
                <div className="text-sm text-gray-600">{stat.description}</div>
              </div>
            ))}
          </div>

          {/* Additional Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="bg-white rounded-lg p-6 shadow-md text-center">
              <div className="text-2xl font-bold text-blue-600 mb-2">4.9/5</div>
              <div className="text-gray-900 font-medium mb-1">Average Rating</div>
              <div className="text-sm text-gray-600">Based on 5,000+ reviews</div>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-md text-center">
              <div className="text-2xl font-bold text-green-600 mb-2">24/7</div>
              <div className="text-gray-900 font-medium mb-1">Customer Support</div>
              <div className="text-sm text-gray-600">Always available to help</div>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-md text-center">
              <div className="text-2xl font-bold text-purple-600 mb-2">500+</div>
              <div className="text-gray-900 font-medium mb-1">Local Partners</div>
              <div className="text-sm text-gray-600">Trusted partners worldwide</div>
            </div>
          </div>

          {/* Awards & Recognition */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Awards & Recognition</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {achievements.map((achievement, index) => (
                <div
                  key={index}
                  className="text-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                >
                  <div className="text-3xl mb-3">{achievement.icon}</div>
                  <h4 className="font-semibold text-gray-900 mb-2 text-sm">{achievement.title}</h4>
                  <p className="text-xs text-gray-600 mb-1">{achievement.organization}</p>
                  <p className="text-xs text-blue-600 font-medium">{achievement.year}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Growth Chart Visualization */}
          <div className="mt-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-6 text-center">Our Growth Journey</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold mb-2">2014</div>
                <div className="text-sm opacity-90">Founded</div>
                <div className="text-xs opacity-75">Started with a dream</div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-2">2018</div>
                <div className="text-sm opacity-90">1,000 Travelers</div>
                <div className="text-xs opacity-75">First milestone reached</div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-2">2021</div>
                <div className="text-sm opacity-90">5,000 Travelers</div>
                <div className="text-xs opacity-75">Rapid growth phase</div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-2">2024</div>
                <div className="text-sm opacity-90">10,000+ Travelers</div>
                <div className="text-xs opacity-75">Continuing to grow</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutStats;
