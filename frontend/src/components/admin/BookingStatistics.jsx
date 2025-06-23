import React from 'react';

const BookingStatistics = ({ statistics }) => {
  const formatCurrency = (amount, currency = 'USD') => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency
    }).format(amount);
  };

  const formatPercentage = (value) => {
    return `${(value * 100).toFixed(1)}%`;
  };

  const getGrowthColor = (growth) => {
    if (growth > 0) return 'text-green-600';
    if (growth < 0) return 'text-red-600';
    return 'text-gray-600';
  };

  const getGrowthIcon = (growth) => {
    if (growth > 0) {
      return (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17l9.2-9.2M17 17V7H7" />
        </svg>
      );
    }
    if (growth < 0) {
      return (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 7l-9.2 9.2M7 7v10h10" />
        </svg>
      );
    }
    return (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
      </svg>
    );
  };

  if (!statistics) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Booking Statistics</h2>
        <p className="text-gray-500">Loading statistics...</p>
      </div>
    );
  }

  const statCards = [
    {
      title: 'Total Bookings',
      value: statistics.totalBookings || 0,
      growth: statistics.bookingGrowth || 0,
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
      ),
      color: 'bg-blue-500'
    },
    {
      title: 'Total Revenue',
      value: formatCurrency(statistics.totalRevenue || 0),
      growth: statistics.revenueGrowth || 0,
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
        </svg>
      ),
      color: 'bg-green-500'
    },
    {
      title: 'Confirmed Bookings',
      value: statistics.confirmedBookings || 0,
      growth: statistics.confirmedGrowth || 0,
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      ),
      color: 'bg-emerald-500'
    },
    {
      title: 'Pending Bookings',
      value: statistics.pendingBookings || 0,
      growth: statistics.pendingGrowth || 0,
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      color: 'bg-yellow-500'
    },
    {
      title: 'Cancelled Bookings',
      value: statistics.cancelledBookings || 0,
      growth: statistics.cancelledGrowth || 0,
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      ),
      color: 'bg-red-500'
    },
    {
      title: 'Average Booking Value',
      value: formatCurrency(statistics.averageBookingValue || 0),
      growth: statistics.avgValueGrowth || 0,
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      color: 'bg-purple-500'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Main Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {statCards.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className={`flex-shrink-0 ${stat.color} rounded-md p-3`}>
                <div className="text-white">
                  {stat.icon}
                </div>
              </div>
              <div className="ml-4 flex-1">
                <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                <p className="text-lg font-semibold text-gray-900">{stat.value}</p>
                <div className={`flex items-center text-sm ${getGrowthColor(stat.growth)}`}>
                  {getGrowthIcon(stat.growth)}
                  <span className="ml-1">
                    {stat.growth > 0 ? '+' : ''}{formatPercentage(stat.growth)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Additional Statistics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Popular Destinations */}
        {statistics.popularDestinations && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Popular Destinations</h3>
            <div className="space-y-3">
              {statistics.popularDestinations.slice(0, 5).map((destination, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900">{destination.name}</p>
                    <p className="text-sm text-gray-500">{destination.country}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">{destination.bookingCount}</p>
                    <p className="text-sm text-gray-500">bookings</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Popular Packages */}
        {statistics.popularPackages && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Popular Packages</h3>
            <div className="space-y-3">
              {statistics.popularPackages.slice(0, 5).map((pkg, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900">{pkg.name}</p>
                    <p className="text-sm text-gray-500">
                      {typeof pkg.duration === 'object'
                        ? `${pkg.duration.days || 0} days`
                        : `${pkg.duration || 0} days`
                      }
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">{pkg.bookingCount}</p>
                    <p className="text-sm text-gray-500">bookings</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Monthly Trends */}
      {statistics.monthlyTrends && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly Booking Trends</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {statistics.monthlyTrends.slice(-6).map((month, index) => (
              <div key={index} className="text-center">
                <p className="text-sm text-gray-500">{month.month}</p>
                <p className="text-lg font-semibold text-gray-900">{month.bookings}</p>
                <p className="text-xs text-gray-500">{formatCurrency(month.revenue)}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Payment Status Breakdown */}
      {statistics.paymentStatusBreakdown && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Status Breakdown</h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {Object.entries(statistics.paymentStatusBreakdown).map(([status, count]) => (
              <div key={status} className="text-center">
                <p className="text-sm text-gray-500 capitalize">{status}</p>
                <p className="text-lg font-semibold text-gray-900">{count}</p>
                <p className="text-xs text-gray-500">
                  {formatPercentage(count / statistics.totalBookings)}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingStatistics;
