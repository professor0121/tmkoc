const ContactInfo = () => {
  const contactMethods = [
    {
      icon: '📞',
      title: 'Phone Support',
      subtitle: '24/7 Available',
      details: [
        { label: 'Main Line', value: '+1 (555) 123-4567' },
        { label: 'Emergency Line', value: '+1 (555) 123-4568' },
        { label: 'International', value: '+1 (555) 123-4569' }
      ],
      description: 'Speak directly with our travel experts for immediate assistance.',
      availability: 'Available 24/7 for urgent matters'
    },
    {
      icon: '📧',
      title: 'Email Support',
      subtitle: 'Response within 2 hours',
      details: [
        { label: 'General Inquiries', value: 'hello@travel.com' },
        { label: 'Booking Support', value: 'bookings@travel.com' },
        { label: 'Partnerships', value: 'partners@travel.com' }
      ],
      description: 'Send us detailed questions and we\'ll respond promptly.',
      availability: 'Responses within 2 hours during business hours'
    },
    {
      icon: '💬',
      title: 'Live Chat',
      subtitle: 'Instant Support',
      details: [
        { label: 'Website Chat', value: 'Available on all pages' },
        { label: 'Mobile App', value: 'In-app messaging' },
        { label: 'WhatsApp', value: '+1 (555) 123-4567' }
      ],
      description: 'Get instant answers to your questions through live chat.',
      availability: '9 AM - 9 PM EST, Monday to Sunday'
    }
  ];

  const officeLocations = [
    {
      city: 'San Francisco',
      address: '123 Travel Street, Suite 100',
      zipCode: 'San Francisco, CA 94102',
      phone: '+1 (555) 123-4567',
      email: 'sf@travel.com',
      hours: 'Mon-Fri: 9 AM - 6 PM PST',
      isHeadquarters: true
    },
    {
      city: 'New York',
      address: '456 Adventure Avenue, Floor 15',
      zipCode: 'New York, NY 10001',
      phone: '+1 (555) 234-5678',
      email: 'ny@travel.com',
      hours: 'Mon-Fri: 9 AM - 6 PM EST',
      isHeadquarters: false
    },
    {
      city: 'London',
      address: '789 Explorer Lane, Suite 200',
      zipCode: 'London, UK SW1A 1AA',
      phone: '+44 20 1234 5678',
      email: 'london@travel.com',
      hours: 'Mon-Fri: 9 AM - 6 PM GMT',
      isHeadquarters: false
    }
  ];

  const socialMedia = [
    { platform: 'Facebook', handle: '@TravelBooking', url: '#', icon: '📘' },
    { platform: 'Twitter', handle: '@TravelBooking', url: '#', icon: '🐦' },
    { platform: 'Instagram', handle: '@TravelBooking', url: '#', icon: '📷' },
    { platform: 'LinkedIn', handle: 'Travel Booking', url: '#', icon: '💼' },
    { platform: 'YouTube', handle: 'Travel Booking', url: '#', icon: '📺' }
  ];

  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-900 mb-6">Contact Information</h2>
      <p className="text-gray-600 mb-8">
        Choose the contact method that works best for you. Our team is here to help 
        with any questions about your travel plans.
      </p>

      {/* Contact Methods */}
      <div className="space-y-8 mb-12">
        {contactMethods.map((method, index) => (
          <div key={index} className="bg-gray-50 rounded-lg p-6 hover:bg-gray-100 transition-colors duration-200">
            <div className="flex items-start">
              <div className="text-3xl mr-4 mt-1">{method.icon}</div>
              <div className="flex-1">
                <div className="flex items-center mb-2">
                  <h3 className="text-xl font-semibold text-gray-900 mr-3">{method.title}</h3>
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                    {method.subtitle}
                  </span>
                </div>
                <p className="text-gray-600 mb-4">{method.description}</p>
                
                <div className="space-y-2 mb-4">
                  {method.details.map((detail, detailIndex) => (
                    <div key={detailIndex} className="flex justify-between items-center">
                      <span className="text-sm text-gray-500">{detail.label}:</span>
                      <span className="text-sm font-medium text-gray-900">{detail.value}</span>
                    </div>
                  ))}
                </div>
                
                <p className="text-xs text-gray-500">{method.availability}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Office Locations */}
      <div className="mb-12">
        <h3 className="text-2xl font-bold text-gray-900 mb-6">Our Offices</h3>
        <div className="space-y-6">
          {officeLocations.map((office, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow duration-200">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 flex items-center">
                    {office.city}
                    {office.isHeadquarters && (
                      <span className="ml-2 px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">
                        Headquarters
                      </span>
                    )}
                  </h4>
                  <p className="text-gray-600">{office.address}</p>
                  <p className="text-gray-600">{office.zipCode}</p>
                </div>
                <div className="text-2xl">🏢</div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <span className="text-gray-500">Phone:</span>
                  <p className="font-medium">{office.phone}</p>
                </div>
                <div>
                  <span className="text-gray-500">Email:</span>
                  <p className="font-medium">{office.email}</p>
                </div>
                <div>
                  <span className="text-gray-500">Hours:</span>
                  <p className="font-medium">{office.hours}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Social Media */}
      <div className="mb-12">
        <h3 className="text-2xl font-bold text-gray-900 mb-6">Follow Us</h3>
        <p className="text-gray-600 mb-6">
          Stay connected with us on social media for travel inspiration, tips, and updates.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {socialMedia.map((social, index) => (
            <a
              key={index}
              href={social.url}
              className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200"
            >
              <span className="text-2xl mr-4">{social.icon}</span>
              <div>
                <h4 className="font-medium text-gray-900">{social.platform}</h4>
                <p className="text-sm text-gray-600">{social.handle}</p>
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* Emergency Contact */}
      <div className="bg-red-50 border border-red-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-red-800 mb-3 flex items-center">
          <span className="text-2xl mr-2">🚨</span>
          Emergency Contact
        </h3>
        <p className="text-red-700 mb-4">
          If you're currently traveling and need immediate assistance, use our emergency hotline.
        </p>
        <div className="space-y-2">
          <div className="flex items-center">
            <span className="text-red-600 font-medium mr-2">Emergency Hotline:</span>
            <a href="tel:+15551234568" className="text-red-800 font-bold hover:underline">
              +1 (555) 123-4568
            </a>
          </div>
          <div className="flex items-center">
            <span className="text-red-600 font-medium mr-2">WhatsApp Emergency:</span>
            <a href="https://wa.me/15551234568" className="text-red-800 font-bold hover:underline">
              +1 (555) 123-4568
            </a>
          </div>
          <p className="text-sm text-red-600 mt-3">
            Available 24/7 for travelers in need of immediate assistance.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;
