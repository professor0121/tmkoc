import { useState } from 'react';

const ContactFAQ = () => {
  const [openFAQ, setOpenFAQ] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');

  const faqs = [
    {
      category: 'Contact & Support',
      questions: [
        {
          question: 'How can I contact customer support?',
          answer: 'You can reach our customer support team through multiple channels: phone (+1 555-123-4567), email (hello@travel.com), live chat on our website, or by visiting one of our office locations. We\'re available 24/7 for urgent matters.'
        },
        {
          question: 'What are your customer service hours?',
          answer: 'Our customer service is available 24/7 for urgent matters and emergencies. For general inquiries, our live chat and phone support are available from 9 AM to 9 PM EST, Monday through Sunday. Email support is available 24/7 with responses within 2-4 hours.'
        },
        {
          question: 'How quickly will I receive a response?',
          answer: 'Response times vary by contact method: Live chat provides instant responses, phone calls are answered immediately during business hours, emails are typically responded to within 2-4 hours, and emergency situations receive immediate attention 24/7.'
        },
        {
          question: 'Do you offer support in multiple languages?',
          answer: 'Yes, we offer customer support in 12+ languages including English, Spanish, French, German, Italian, Portuguese, Mandarin, Japanese, Korean, Arabic, Russian, and Dutch. Our multilingual team ensures you can get help in your preferred language.'
        }
      ]
    },
    {
      category: 'Booking Assistance',
      questions: [
        {
          question: 'Can you help me make a booking over the phone?',
          answer: 'Absolutely! Our travel experts are available to help you make bookings over the phone. Call us at +1 (555) 123-4567 and we\'ll assist you with finding the perfect trip, comparing options, and completing your reservation.'
        },
        {
          question: 'What information do I need to provide when contacting support?',
          answer: 'For booking assistance, please have your travel dates, destination preferences, number of travelers, and budget range ready. For existing bookings, please provide your booking reference number and the email address used for the reservation.'
        },
        {
          question: 'Can I modify my booking through customer service?',
          answer: 'Yes, our customer service team can help you modify your booking including changing dates, adding travelers, upgrading accommodations, or adjusting your itinerary. Some changes may incur fees depending on the booking terms and timing.'
        }
      ]
    },
    {
      category: 'Emergency Support',
      questions: [
        {
          question: 'What should I do in case of a travel emergency?',
          answer: 'For travel emergencies, immediately call our 24/7 emergency hotline at +1 (555) 123-4568 or contact us via WhatsApp at the same number. Our emergency team can assist with medical emergencies, travel disruptions, lost documents, and other urgent situations.'
        },
        {
          question: 'Do you provide assistance if my flight is cancelled?',
          answer: 'Yes, our support team will help you with flight cancellations by rebooking you on alternative flights, arranging accommodation if needed, and handling any additional costs covered by your travel insurance. Contact us immediately when you learn of the cancellation.'
        },
        {
          question: 'What if I lose my travel documents while abroad?',
          answer: 'Contact our emergency support immediately. We\'ll guide you through the process of reporting lost documents to local authorities, help you contact your embassy or consulate, assist with emergency document replacement, and provide support for any travel disruptions this may cause.'
        }
      ]
    },
    {
      category: 'Technical Support',
      questions: [
        {
          question: 'I\'m having trouble with the website. Who can help?',
          answer: 'Our technical support team can help with website issues, booking problems, account access, and mobile app troubleshooting. Contact us via live chat or email at support@travel.com with details about the issue you\'re experiencing.'
        },
        {
          question: 'How do I reset my account password?',
          answer: 'You can reset your password by clicking "Forgot Password" on the login page and following the instructions sent to your email. If you continue having issues, contact our technical support team for assistance.'
        },
        {
          question: 'Can I access my bookings if I\'m having technical issues?',
          answer: 'Yes, if you\'re unable to access your bookings online, contact our customer service team with your booking reference number and email address. We can provide you with your booking details and any necessary documents via email or phone.'
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

  const filteredQuestions = searchTerm
    ? allQuestions.filter(
        item =>
          item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.answer.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.category.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : allQuestions;

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Contact FAQ</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Find quick answers to common questions about contacting us and getting support
            </p>
          </div>

          {/* Search Bar */}
          <div className="mb-8">
            <div className="relative">
              <input
                type="text"
                placeholder="Search FAQ..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <svg
                className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>

          {/* FAQ Categories */}
          {!searchTerm && (
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
          )}

          {/* Search Results Count */}
          {searchTerm && (
            <div className="mb-6">
              <p className="text-gray-600">
                Found {filteredQuestions.length} result{filteredQuestions.length !== 1 ? 's' : ''} for "{searchTerm}"
              </p>
            </div>
          )}

          {/* FAQ Accordion */}
          <div className="space-y-4 mb-12">
            {filteredQuestions.map((item, index) => (
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
                    {searchTerm && (
                      <span className="inline-block mt-1 px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                        {item.category}
                      </span>
                    )}
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

          {/* No Results */}
          {searchTerm && filteredQuestions.length === 0 && (
            <div className="text-center py-12">
              <div className="text-4xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No results found</h3>
              <p className="text-gray-600 mb-6">
                We couldn't find any FAQ entries matching "{searchTerm}". Try a different search term or contact our support team.
              </p>
              <button
                onClick={() => setSearchTerm('')}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
              >
                Clear Search
              </button>
            </div>
          )}

          {/* Still Need Help */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8 text-center text-white">
            <h3 className="text-2xl font-bold mb-4">Still Need Help?</h3>
            <p className="text-lg mb-6 opacity-90">
              Can't find the answer you're looking for? Our support team is here to help!
            </p>
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <button
                onClick={() => document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors duration-200"
              >
                Send Message
              </button>
              <button
                onClick={() => window.open('tel:+15551234567')}
                className="px-6 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-blue-600 transition-colors duration-200"
              >
                Call Support
              </button>
              <button className="px-6 py-3 bg-transparent border-2 border-yellow-400 text-yellow-400 font-semibold rounded-lg hover:bg-yellow-400 hover:text-gray-900 transition-colors duration-200">
                Start Live Chat
              </button>
            </div>
          </div>

          {/* Quick Contact Info */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-white rounded-lg shadow-sm">
              <div className="text-3xl mb-3">📞</div>
              <h4 className="font-semibold text-gray-900 mb-2">Phone Support</h4>
              <p className="text-gray-600 text-sm mb-2">Available 24/7</p>
              <p className="text-blue-600 font-medium">+1 (555) 123-4567</p>
            </div>
            
            <div className="text-center p-6 bg-white rounded-lg shadow-sm">
              <div className="text-3xl mb-3">💬</div>
              <h4 className="font-semibold text-gray-900 mb-2">Live Chat</h4>
              <p className="text-gray-600 text-sm mb-2">9 AM - 9 PM EST</p>
              <p className="text-blue-600 font-medium">Start Chat</p>
            </div>
            
            <div className="text-center p-6 bg-white rounded-lg shadow-sm">
              <div className="text-3xl mb-3">📧</div>
              <h4 className="font-semibold text-gray-900 mb-2">Email Support</h4>
              <p className="text-gray-600 text-sm mb-2">Response within 2 hours</p>
              <p className="text-blue-600 font-medium">hello@travel.com</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactFAQ;
