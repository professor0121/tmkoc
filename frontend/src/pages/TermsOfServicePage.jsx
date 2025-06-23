import Header from '../components/Header';
import Footer from '../components/home/Footer';

const TermsOfServicePage = () => {
  const lastUpdated = "December 15, 2024";

  const sections = [
    {
      title: "1. Acceptance of Terms",
      content: `By accessing and using Travel Booking's website, mobile application, or services, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service and our Privacy Policy. If you do not agree to these terms, please do not use our services.

These terms constitute a legally binding agreement between you and Travel Booking. We reserve the right to modify these terms at any time, and such modifications will be effective immediately upon posting on our website.`
    },
    {
      title: "2. Description of Services",
      content: `Travel Booking provides an online platform that allows users to search, compare, and book travel packages, accommodations, transportation, and related travel services. Our services include:

• Travel package booking and management
• Custom itinerary planning
• Group travel coordination
• Travel consultation services
• Customer support and assistance
• Travel-related information and resources

We act as an intermediary between travelers and travel service providers. We do not own, operate, or control the underlying travel services.`
    },
    {
      title: "3. User Accounts and Registration",
      content: `To access certain features of our services, you must create an account and provide accurate, complete, and current information. You are responsible for:

• Maintaining the confidentiality of your account credentials
• All activities that occur under your account
• Notifying us immediately of any unauthorized use
• Ensuring your account information remains accurate and up-to-date

You must be at least 18 years old to create an account. If you are under 18, you may only use our services with parental consent and supervision.`
    },
    {
      title: "4. Booking and Payment Terms",
      content: `When you make a booking through our platform:

• All bookings are subject to availability and confirmation
• Prices are subject to change until payment is completed
• Full payment is required at the time of booking unless otherwise specified
• Additional fees may apply for changes or cancellations
• You are responsible for ensuring all traveler information is accurate
• Special requests are subject to availability and additional charges

We accept major credit cards, PayPal, and other payment methods as specified on our platform. All payments are processed securely through encrypted connections.`
    },
    {
      title: "5. Cancellation and Refund Policy",
      content: `Cancellation and refund policies vary by travel service provider and package type:

• Standard cancellations: 48-72 hours before departure for full refund
• Last-minute cancellations may incur fees or forfeit full payment
• Travel insurance may cover certain cancellation reasons
• Refunds are processed within 5-10 business days
• Some bookings may be non-refundable or have specific cancellation terms

Detailed cancellation terms are provided during the booking process and in your confirmation email. We recommend purchasing travel insurance to protect against unforeseen circumstances.`
    },
    {
      title: "6. Travel Documents and Requirements",
      content: `You are solely responsible for obtaining all necessary travel documents, including:

• Valid passports with appropriate validity periods
• Required visas and entry permits
• Health certificates and vaccination records
• Travel insurance documentation
• Any other documents required by destination countries

We provide general guidance on travel requirements, but you must verify all requirements with relevant authorities. We are not responsible for denied entry or travel disruptions due to inadequate documentation.`
    },
    {
      title: "7. Limitation of Liability",
      content: `Travel Booking's liability is limited to the maximum extent permitted by law:

• We are not liable for acts of travel service providers
• Our total liability shall not exceed the amount paid for services
• We are not responsible for travel delays, cancellations, or disruptions
• Force majeure events are beyond our control and responsibility
• We provide services "as is" without warranties of any kind

This limitation applies to all claims, whether based on contract, tort, or any other legal theory. Some jurisdictions may not allow certain limitations, so these may not apply to you.`
    },
    {
      title: "8. User Conduct and Prohibited Activities",
      content: `When using our services, you agree not to:

• Provide false or misleading information
• Use our platform for illegal or unauthorized purposes
• Interfere with or disrupt our services or servers
• Attempt to gain unauthorized access to our systems
• Violate any applicable laws or regulations
• Infringe on intellectual property rights
• Engage in fraudulent or deceptive practices

We reserve the right to suspend or terminate accounts that violate these terms or engage in prohibited activities.`
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
              Terms of
              <span className="block text-yellow-400">Service</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90 max-w-3xl mx-auto leading-relaxed">
              Please read these terms carefully before using our services. 
              These terms govern your use of Travel Booking's platform and services.
            </p>
            <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-6 inline-block">
              <p className="text-lg font-semibold mb-2 text-black">Last Updated</p>
              <p className="text-yellow-400 font-medium">{lastUpdated}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Terms Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Introduction */}
            <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Introduction</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Welcome to Travel Booking. These Terms of Service ("Terms") govern your use of our website, 
                mobile application, and services. By using our platform, you enter into a binding legal agreement 
                with Travel Booking Inc.
              </p>
              <p className="text-gray-700 leading-relaxed">
                These terms are designed to protect both you and Travel Booking, ensuring a safe and reliable 
                travel booking experience. Please take the time to read and understand these terms before using our services.
              </p>
            </div>

            {/* Terms Sections */}
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

            {/* Additional Important Information */}
            <div className="mt-12 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Important Additional Information</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">Governing Law</h4>
                  <p className="text-gray-700 text-sm">
                    These terms are governed by the laws of the State of California, United States. 
                    Any disputes will be resolved in the courts of San Francisco County, California.
                  </p>
                </div>
                
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">Severability</h4>
                  <p className="text-gray-700 text-sm">
                    If any provision of these terms is found to be unenforceable, the remaining 
                    provisions will continue to be valid and enforceable.
                  </p>
                </div>
                
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">Entire Agreement</h4>
                  <p className="text-gray-700 text-sm">
                    These terms, together with our Privacy Policy, constitute the entire agreement 
                    between you and Travel Booking regarding the use of our services.
                  </p>
                </div>
                
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">Contact Information</h4>
                  <p className="text-gray-700 text-sm">
                    For questions about these terms, please contact our legal team at 
                    legal@travel.com or call +1 (555) 123-4567.
                  </p>
                </div>
              </div>
            </div>

            {/* Contact and Support */}
            <div className="mt-12 bg-white rounded-xl shadow-lg p-8 text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Questions About These Terms?</h3>
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                If you have any questions about these Terms of Service or need clarification on any provisions, 
                our legal and customer support teams are here to help.
              </p>
              <div className="flex flex-col md:flex-row gap-4 justify-center">
                <button className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-200">
                  Contact Legal Team
                </button>
                <button className="px-6 py-3 border border-blue-300 text-blue-700 font-semibold rounded-lg hover:bg-blue-50 transition-colors duration-200">
                  Customer Support
                </button>
                <button className="px-6 py-3 bg-gray-100 text-gray-700 font-semibold rounded-lg hover:bg-gray-200 transition-colors duration-200">
                  Download PDF
                </button>
              </div>
            </div>

            {/* Related Documents */}
            <div className="mt-12 bg-gray-100 rounded-xl p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">Related Documents</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white rounded-lg p-6 text-center shadow-sm hover:shadow-md transition-shadow duration-200">
                  <div className="text-3xl mb-3">🔒</div>
                  <h4 className="font-semibold text-gray-900 mb-2">Privacy Policy</h4>
                  <p className="text-gray-600 text-sm mb-4">Learn how we collect, use, and protect your personal information</p>
                  <button className="text-blue-600 hover:text-blue-800 font-medium">Read Privacy Policy</button>
                </div>
                
                <div className="bg-white rounded-lg p-6 text-center shadow-sm hover:shadow-md transition-shadow duration-200">
                  <div className="text-3xl mb-3">🍪</div>
                  <h4 className="font-semibold text-gray-900 mb-2">Cookie Policy</h4>
                  <p className="text-gray-600 text-sm mb-4">Understand how we use cookies and similar technologies</p>
                  <button className="text-blue-600 hover:text-blue-800 font-medium">Read Cookie Policy</button>
                </div>
                
                <div className="bg-white rounded-lg p-6 text-center shadow-sm hover:shadow-md transition-shadow duration-200">
                  <div className="text-3xl mb-3">❓</div>
                  <h4 className="font-semibold text-gray-900 mb-2">Help Center</h4>
                  <p className="text-gray-600 text-sm mb-4">Find answers to common questions and get support</p>
                  <button className="text-blue-600 hover:text-blue-800 font-medium">Visit Help Center</button>
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

export default TermsOfServicePage;
