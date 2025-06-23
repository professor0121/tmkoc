import { useState } from 'react';

const HelpFAQ = () => {
  const [openFAQ, setOpenFAQ] = useState(0);

  const faqs = [
    {
      category: 'Getting Started',
      questions: [
        {
          question: 'How do I create an account?',
          answer: 'Creating an account is simple! Click the "Sign Up" button in the top right corner, fill in your details, and verify your email address. You can also sign up using your Google or Facebook account for faster registration.'
        },
        {
          question: 'Is it free to browse and search for trips?',
          answer: 'Yes, absolutely! Browsing destinations, searching for packages, and exploring our platform is completely free. You only pay when you decide to book a trip.'
        },
        {
          question: 'How do I search for travel packages?',
          answer: 'Use our search bar on the homepage to enter your destination, travel dates, and number of travelers. You can also browse by categories like "Adventure," "Luxury," or "Family-Friendly" to find packages that match your interests.'
        }
      ]
    },
    {
      category: 'Booking Process',
      questions: [
        {
          question: 'How do I book a travel package?',
          answer: 'Select your desired package, choose your travel dates, add any extras, review your booking details, and proceed to payment. You\'ll receive a confirmation email with all your trip details once payment is complete.'
        },
        {
          question: 'Can I modify my booking after confirmation?',
          answer: 'Yes, you can modify most bookings up to 48 hours before your departure date. Changes may incur additional fees depending on the package terms and availability. Contact our support team for assistance.'
        },
        {
          question: 'What payment methods do you accept?',
          answer: 'We accept all major credit cards (Visa, MasterCard, American Express), PayPal, bank transfers, and offer installment payment plans for bookings over $500.'
        }
      ]
    },
    {
      category: 'Travel Support',
      questions: [
        {
          question: 'What if I need help during my trip?',
          answer: 'Our 24/7 emergency support team is always available to help. You can reach us through our mobile app, emergency hotline, or WhatsApp. We provide assistance with any travel-related issues or emergencies.'
        },
        {
          question: 'Do you provide travel insurance?',
          answer: 'Yes, we offer comprehensive travel insurance that covers trip cancellation, medical emergencies, lost luggage, and travel delays. Insurance can be added during the booking process or purchased separately.'
        },
        {
          question: 'What documents do I need for international travel?',
          answer: 'Requirements vary by destination, but typically include a valid passport (with at least 6 months validity), visa (if required), travel insurance, and vaccination certificates. We provide detailed document checklists for each destination.'
        }
      ]
    }
  ];

  const allQuestions = faqs.flatMap((category, categoryIndex) =>
    category.questions.map((q, questionIndex) => ({
      ...q,
      categoryIndex,
      questionIndex,
      globalIndex: categoryIndex * 10 + questionIndex,
      category: category.category
    }))
  );

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Quick answers to the most common questions about our platform and services
            </p>
          </div>

          {/* FAQ Categories */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {faqs.map((category, index) => (
              <button
                key={index}
                onClick={() => setOpenFAQ(index * 10)}
                className="px-6 py-2 bg-blue-100 text-blue-700 rounded-full hover:bg-blue-200 transition-colors duration-200 font-medium"
              >
                {category.category}
              </button>
            ))}
          </div>

          {/* FAQ Accordion */}
          <div className="space-y-4 mb-12">
            {allQuestions.map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200"
              >
                <button
                  onClick={() => setOpenFAQ(openFAQ === index ? -1 : index)}
                  className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors duration-200"
                >
                  <div>
                    <span className="font-semibold text-gray-900 pr-4">{item.question}</span>
                    <span className="inline-block mt-1 px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                      {item.category}
                    </span>
                  </div>
                  <svg
                    className={`w-5 h-5 text-gray-500 transform transition-transform duration-200 flex-shrink-0 ${
                      openFAQ === index ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                {openFAQ === index && (
                  <div className="px-6 pb-4">
                    <div className="border-t border-gray-200 pt-4">
                      <p className="text-gray-700 leading-relaxed">{item.answer}</p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Still Need Help */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8 text-center text-white">
            <h3 className="text-2xl font-bold mb-4">Still Need Help?</h3>
            <p className="text-lg mb-6 opacity-90">
              Can't find the answer you're looking for? Our support team is here to help!
            </p>
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <button className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors duration-200">
                Contact Support
              </button>
              <button className="px-6 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-blue-600 transition-colors duration-200">
                Live Chat
              </button>
              <button className="px-6 py-3 bg-transparent border-2 border-yellow-400 text-yellow-400 font-semibold rounded-lg hover:bg-yellow-400 hover:text-gray-900 transition-colors duration-200">
                Call Us
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HelpFAQ;
