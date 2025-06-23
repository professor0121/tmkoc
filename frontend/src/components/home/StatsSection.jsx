const StatsSection = () => {
  const stats = [
    { number: '50+', label: 'Destinations' },
    { number: '100+', label: 'Travel Packages' },
    { number: '10K+', label: 'Happy Travelers' },
    { number: '4.8★', label: 'Average Rating' }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((stat, index) => (
            <div key={index}>
              <div className="text-4xl font-bold text-blue-600 mb-2">{stat.number}</div>
              <div className="text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
