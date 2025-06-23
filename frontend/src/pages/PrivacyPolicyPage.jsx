import Header from '../components/Header';
import Footer from '../components/home/Footer';

const PrivacyPolicyPage = () => {
  const lastUpdated = "December 15, 2024";

  const sections = [
    {
      title: "1. Information We Collect",
      content: `We collect information you provide directly to us, such as when you create an account, make a booking, or contact us for support.

Personal Information:
• Name, email address, phone number
• Billing and shipping addresses
• Payment information (processed securely by third-party providers)
• Travel preferences and special requirements
• Government-issued ID information for travel bookings
• Emergency contact information

Automatically Collected Information:
• Device information (IP address, browser type, operating system)
• Usage data (pages visited, time spent, click patterns)
• Location information (with your permission)
• Cookies and similar tracking technologies`
    },
    {
      title: "2. How We Use Your Information",
      content: `We use the information we collect to provide, maintain, and improve our services:

Service Provision:
• Process and manage your travel bookings
• Provide customer support and assistance
• Send booking confirmations and travel updates
• Facilitate communication with travel service providers

Personalization and Improvement:
• Customize your experience and recommendations
• Analyze usage patterns to improve our platform
• Develop new features and services
• Conduct research and analytics

Communication:
• Send important service-related notifications
• Provide marketing communications (with your consent)
• Respond to your inquiries and requests
• Send newsletters and promotional offers`
    },
    {
      title: "3. Information Sharing and Disclosure",
      content: `We do not sell, trade, or rent your personal information to third parties. We may share your information in the following circumstances:

Service Providers:
• Travel service providers (hotels, airlines, tour operators) necessary to fulfill your bookings
• Payment processors for secure transaction processing
• Technology service providers who help us operate our platform
• Customer service providers who assist with support

Legal Requirements:
• When required by law or legal process
• To protect our rights, property, or safety
• To prevent fraud or illegal activities
• In connection with business transfers or mergers

With Your Consent:
• When you explicitly authorize us to share information
• For marketing partnerships (opt-in only)
• For social media integration features`
    },
    {
      title: "4. Data Security and Protection",
      content: `We implement comprehensive security measures to protect your personal information:

Technical Safeguards:
• SSL/TLS encryption for data transmission
• Secure data storage with encryption at rest
• Regular security audits and vulnerability assessments
• Multi-factor authentication for account access
• Secure payment processing through PCI-compliant providers

Organizational Measures:
• Employee training on data protection
• Access controls and need-to-know basis
• Regular security policy updates
• Incident response procedures
• Third-party security certifications

While we strive to protect your information, no method of transmission over the internet is 100% secure. We cannot guarantee absolute security but continuously work to improve our protections.`
    },
    {
      title: "5. Your Privacy Rights and Choices",
      content: `You have several rights regarding your personal information:

Access and Control:
• View and update your account information
• Download a copy of your personal data
• Request deletion of your account and data
• Opt-out of marketing communications
• Manage cookie preferences

Data Portability:
• Export your data in a machine-readable format
• Transfer your data to another service provider
• Receive a copy of data we've shared with third parties

Communication Preferences:
• Unsubscribe from marketing emails
• Adjust notification settings
• Choose communication channels
• Set frequency preferences

To exercise these rights, contact us at privacy@travel.com or use the privacy controls in your account settings.`
    },
    {
      title: "6. Cookies and Tracking Technologies",
      content: `We use cookies and similar technologies to enhance your experience:

Types of Cookies:
• Essential cookies: Required for basic site functionality
• Performance cookies: Help us understand how you use our site
• Functional cookies: Remember your preferences and settings
• Marketing cookies: Deliver relevant advertisements

Third-Party Services:
• Google Analytics for website analytics
• Social media plugins for sharing features
• Advertising networks for targeted marketing
• Customer support chat tools

Cookie Management:
You can control cookies through your browser settings. Note that disabling certain cookies may affect site functionality. We provide a cookie preference center where you can manage your choices.`
    },
    {
      title: "7. International Data Transfers",
      content: `Travel Booking operates globally, and your information may be transferred to and processed in countries other than your own:

Transfer Safeguards:
• We ensure adequate protection through appropriate safeguards
• Standard contractual clauses for EU data transfers
• Privacy Shield certification where applicable
• Regular assessment of transfer mechanisms

Data Processing Locations:
• Primary servers located in the United States
• Backup systems in secure international facilities
• Service providers may process data in various countries
• All transfers comply with applicable privacy laws

Your data is always protected by the same privacy standards regardless of where it's processed.`
    },
    {
      title: "8. Children's Privacy",
      content: `Our services are not intended for children under 13 years of age:

Age Restrictions:
• We do not knowingly collect information from children under 13
• Account creation requires users to be at least 18 years old
• Minors may use our services only with parental supervision
• Parents can request deletion of their child's information

Parental Rights:
• Parents may review their child's information
• Request correction or deletion of data
• Refuse further collection or use of information
• Contact us with any concerns about children's privacy

If we become aware that we've collected information from a child under 13, we will take steps to delete such information promptly.`
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Privacy
              <span className="block text-yellow-400">Policy</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90 max-w-3xl mx-auto leading-relaxed">
              Your privacy is important to us. This policy explains how we collect, use, 
              and protect your personal information when you use our services.
            </p>
            <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-6 inline-block">
              <p className="text-lg font-semibold mb-2 text-black">Last Updated</p>
              <p className="text-yellow-400 font-medium">{lastUpdated}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Privacy Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Introduction */}
            <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Commitment to Your Privacy</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                At Travel Booking, we are committed to protecting your privacy and ensuring the security of your personal information. 
                This Privacy Policy explains how we collect, use, share, and protect your information when you use our website, 
                mobile application, and services.
              </p>
              <p className="text-gray-700 leading-relaxed">
                We believe in transparency and want you to understand exactly how your information is handled. 
                This policy applies to all users of our platform and covers all aspects of our data practices.
              </p>
            </div>

            {/* Privacy Sections */}
            <div className="space-y-8">
              {sections.map((section, index) => (
                <div key={index} className="bg-white rounded-xl shadow-lg p-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{section.title}</h3>
                  <div className="text-gray-700 leading-relaxed whitespace-pre-line">
                    {section.content}
                  </div>
                </div>
              ))}
            </div>

            {/* Privacy Rights Summary */}
            <div className="mt-12 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Your Privacy Rights at a Glance</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white rounded-lg p-6 shadow-sm">
                  <div className="flex items-center mb-3">
                    <div className="bg-blue-100 rounded-full p-2 mr-3">
                      <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <h4 className="font-semibold text-gray-900">Access Your Data</h4>
                  </div>
                  <p className="text-gray-600 text-sm">View and download all personal information we have about you</p>
                </div>
                
                <div className="bg-white rounded-lg p-6 shadow-sm">
                  <div className="flex items-center mb-3">
                    <div className="bg-green-100 rounded-full p-2 mr-3">
                      <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </div>
                    <h4 className="font-semibold text-gray-900">Correct Information</h4>
                  </div>
                  <p className="text-gray-600 text-sm">Update or correct any inaccurate personal information</p>
                </div>
                
                <div className="bg-white rounded-lg p-6 shadow-sm">
                  <div className="flex items-center mb-3">
                    <div className="bg-red-100 rounded-full p-2 mr-3">
                      <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </div>
                    <h4 className="font-semibold text-gray-900">Delete Your Data</h4>
                  </div>
                  <p className="text-gray-600 text-sm">Request deletion of your account and personal information</p>
                </div>
                
                <div className="bg-white rounded-lg p-6 shadow-sm">
                  <div className="flex items-center mb-3">
                    <div className="bg-purple-100 rounded-full p-2 mr-3">
                      <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                    </div>
                    <h4 className="font-semibold text-gray-900">Control Communications</h4>
                  </div>
                  <p className="text-gray-600 text-sm">Manage your email preferences and marketing communications</p>
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="mt-12 bg-white rounded-xl shadow-lg p-8 text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Privacy Questions or Concerns?</h3>
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                Our privacy team is here to help you understand your rights and address any concerns 
                you may have about how we handle your personal information.
              </p>
              <div className="flex flex-col md:flex-row gap-4 justify-center">
                <button className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-200">
                  Contact Privacy Team
                </button>
                <button className="px-6 py-3 border border-blue-300 text-blue-700 font-semibold rounded-lg hover:bg-blue-50 transition-colors duration-200">
                  Manage Privacy Settings
                </button>
                <button className="px-6 py-3 bg-gray-100 text-gray-700 font-semibold rounded-lg hover:bg-gray-200 transition-colors duration-200">
                  Download Data
                </button>
              </div>
              
              <div className="mt-8 pt-6 border-t border-gray-200">
                <p className="text-gray-600 text-sm">
                  <strong>Privacy Officer:</strong> privacy@travel.com | 
                  <strong> Phone:</strong> +1 (555) 123-4567 | 
                  <strong> Address:</strong> 123 Travel Street, San Francisco, CA 94102
                </p>
              </div>
            </div>

            {/* Related Information */}
            <div className="mt-12 bg-gray-100 rounded-xl p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">Related Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white rounded-lg p-6 text-center shadow-sm hover:shadow-md transition-shadow duration-200">
                  <div className="text-3xl mb-3">📋</div>
                  <h4 className="font-semibold text-gray-900 mb-2">Terms of Service</h4>
                  <p className="text-gray-600 text-sm mb-4">Read our terms and conditions for using our services</p>
                  <button className="text-blue-600 hover:text-blue-800 font-medium">Read Terms</button>
                </div>
                
                <div className="bg-white rounded-lg p-6 text-center shadow-sm hover:shadow-md transition-shadow duration-200">
                  <div className="text-3xl mb-3">🔒</div>
                  <h4 className="font-semibold text-gray-900 mb-2">Security Center</h4>
                  <p className="text-gray-600 text-sm mb-4">Learn about our security measures and best practices</p>
                  <button className="text-blue-600 hover:text-blue-800 font-medium">Security Info</button>
                </div>
                
                <div className="bg-white rounded-lg p-6 text-center shadow-sm hover:shadow-md transition-shadow duration-200">
                  <div className="text-3xl mb-3">❓</div>
                  <h4 className="font-semibold text-gray-900 mb-2">Help Center</h4>
                  <p className="text-gray-600 text-sm mb-4">Find answers to privacy-related questions</p>
                  <button className="text-blue-600 hover:text-blue-800 font-medium">Get Help</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default PrivacyPolicyPage;
