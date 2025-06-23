import { useState } from 'react';

const ContactMap = () => {
  const [selectedOffice, setSelectedOffice] = useState(0);

  const offices = [
    {
      id: 0,
      city: 'San Francisco',
      country: 'USA',
      address: '123 Travel Street, Suite 100',
      fullAddress: 'San Francisco, CA 94102, USA',
      phone: '+1 (555) 123-4567',
      email: 'sf@travel.com',
      hours: 'Mon-Fri: 9 AM - 6 PM PST',
      isHeadquarters: true,
      coordinates: { lat: 37.7749, lng: -122.4194 },
      mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.0197!2d-122.4194!3d37.7749!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzfCsDQ2JzI5LjYiTiAxMjLCsDI1JzA5LjgiVw!5e0!3m2!1sen!2sus!4v1234567890'
    },
    {
      id: 1,
      city: 'New York',
      country: 'USA',
      address: '456 Adventure Avenue, Floor 15',
      fullAddress: 'New York, NY 10001, USA',
      phone: '+1 (555) 234-5678',
      email: 'ny@travel.com',
      hours: 'Mon-Fri: 9 AM - 6 PM EST',
      isHeadquarters: false,
      coordinates: { lat: 40.7128, lng: -74.0060 },
      mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3024.0197!2d-74.0060!3d40.7128!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDDCsDQyJzQ2LjEiTiA3NMKwMDAnMjEuNiJX!5e0!3m2!1sen!2sus!4v1234567891'
    },
    {
      id: 2,
      city: 'London',
      country: 'UK',
      address: '789 Explorer Lane, Suite 200',
      fullAddress: 'London, UK SW1A 1AA',
      phone: '+44 20 1234 5678',
      email: 'london@travel.com',
      hours: 'Mon-Fri: 9 AM - 6 PM GMT',
      isHeadquarters: false,
      coordinates: { lat: 51.5074, lng: -0.1278 },
      mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2483.0197!2d-0.1278!3d51.5074!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNTHCsDMwJzI2LjYiTiAwwrAwNyc0MC4xIlc!5e0!3m2!1sen!2suk!4v1234567892'
    }
  ];

  const currentOffice = offices[selectedOffice];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Visit Our Offices</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We have offices around the world to better serve our global community of travelers. 
              Schedule a visit or just drop by to say hello!
            </p>
          </div>

          {/* Office Selector */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {offices.map((office) => (
              <button
                key={office.id}
                onClick={() => setSelectedOffice(office.id)}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-200 ${
                  selectedOffice === office.id
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
                }`}
              >
                {office.city}, {office.country}
                {office.isHeadquarters && (
                  <span className="ml-2 text-xs">🏢</span>
                )}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Map */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="h-96 bg-gray-200 relative">
                {/* Placeholder for actual map integration */}
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-100">
                  <div className="text-center">
                    <div className="text-4xl mb-4">🗺️</div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">
                      {currentOffice.city} Office
                    </h3>
                    <p className="text-gray-600">{currentOffice.address}</p>
                    <button className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200">
                      Open in Google Maps
                    </button>
                  </div>
                </div>
                
                {/* Uncomment below for actual Google Maps integration */}
                
                <iframe
                  src={currentOffice.mapUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title={`${currentOffice.city} Office Location`}
                ></iframe>
               
              </div>
            </div>

            {/* Office Details */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="flex items-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900 mr-3">
                  {currentOffice.city} Office
                </h3>
                {currentOffice.isHeadquarters && (
                  <span className="px-3 py-1 bg-yellow-100 text-yellow-800 text-sm rounded-full font-medium">
                    Headquarters
                  </span>
                )}
              </div>

              <div className="space-y-6">
                {/* Address */}
                <div className="flex items-start">
                  <div className="text-2xl mr-4 mt-1">📍</div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Address</h4>
                    <p className="text-gray-600">{currentOffice.address}</p>
                    <p className="text-gray-600">{currentOffice.fullAddress}</p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start">
                  <div className="text-2xl mr-4 mt-1">📞</div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Phone</h4>
                    <a 
                      href={`tel:${currentOffice.phone}`}
                      className="text-blue-600 hover:underline"
                    >
                      {currentOffice.phone}
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start">
                  <div className="text-2xl mr-4 mt-1">📧</div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Email</h4>
                    <a 
                      href={`mailto:${currentOffice.email}`}
                      className="text-blue-600 hover:underline"
                    >
                      {currentOffice.email}
                    </a>
                  </div>
                </div>

                {/* Hours */}
                <div className="flex items-start">
                  <div className="text-2xl mr-4 mt-1">🕒</div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Office Hours</h4>
                    <p className="text-gray-600">{currentOffice.hours}</p>
                    <p className="text-sm text-gray-500 mt-1">
                      Appointments recommended for meetings
                    </p>
                  </div>
                </div>

                {/* Services */}
                <div className="flex items-start">
                  <div className="text-2xl mr-4 mt-1">🎯</div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Services Available</h4>
                    <ul className="text-gray-600 text-sm space-y-1">
                      <li>• Travel consultation</li>
                      <li>• Custom trip planning</li>
                      <li>• Group booking assistance</li>
                      <li>• Travel document support</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-8 space-y-3">
                <button className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium">
                  Schedule a Visit
                </button>
                <button className="w-full px-6 py-3 border border-blue-300 text-blue-700 rounded-lg hover:bg-blue-50 transition-colors duration-200 font-medium">
                  Get Directions
                </button>
              </div>
            </div>
          </div>

          {/* Additional Info */}
          <div className="mt-12 bg-white rounded-xl shadow-lg p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Planning to Visit?</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-3xl mb-3">📅</div>
                <h4 className="font-semibold text-gray-900 mb-2">Schedule Ahead</h4>
                <p className="text-gray-600 text-sm">
                  Book an appointment to ensure our travel experts are available to assist you.
                </p>
              </div>
              <div className="text-center">
                <div className="text-3xl mb-3">🚗</div>
                <h4 className="font-semibold text-gray-900 mb-2">Parking Available</h4>
                <p className="text-gray-600 text-sm">
                  Free parking is available at all our office locations for visitors.
                </p>
              </div>
              <div className="text-center">
                <div className="text-3xl mb-3">☕</div>
                <h4 className="font-semibold text-gray-900 mb-2">Comfortable Environment</h4>
                <p className="text-gray-600 text-sm">
                  Enjoy complimentary refreshments while we plan your perfect trip.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactMap;
