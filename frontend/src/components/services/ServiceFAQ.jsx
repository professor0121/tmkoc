import { useState } from 'react';

const ServiceFAQ = () => {
  const [openFAQ, setOpenFAQ] = useState(0);

  const faqs = [
    {
      category: 'General',
      questions: [
        {
          question: 'What services do you offer?',
          answer: 'We offer a comprehensive range of travel services including pre-designed travel packages, custom itineraries, group tours, luxury travel experiences, adventure tours, and business travel solutions. Each service is tailored to meet different travel preferences and budgets.'
        },
        {
          question: 'How do I book a service?',
          answer: 'You can book our services through our website by browsing packages, contacting our travel experts for custom planning, or calling our customer service. We offer flexible booking options and secure payment processing.'
        },
        {
          question: 'What is included in your travel packages?',
          answer: 'Our travel packages typically include accommodation, transportation, guided tours, some meals, and travel insurance. The specific inclusions vary by package type and destination. Detailed information is provided for each package.'
        }
      ]
    },
    {
      category: 'Booking & Payment',
      questions: [
        {
          question: 'What payment methods do you accept?',
          answer: 'We accept all major credit cards (Visa, MasterCard, American Express), PayPal, bank transfers, and offer flexible payment plans. For custom packages, we also accept installment payments.'
        },
        {
          question: 'Can I modify or cancel my booking?',
          answer: 'Yes, modifications and cancellations are possible depending on the service type and timing. Most bookings can be cancelled up to 48 hours before departure with full refund. Custom itineraries offer more flexibility for changes.'
        },
        {
          question: 'Do you offer travel insurance?',
          answer: 'Yes, we include basic travel insurance with all our packages. We also offer comprehensive travel insurance options that cover medical emergencies, trip cancellation, lost luggage, and other travel-related issues.'
        }
      ]
    },
    {
      category: 'Custom Services',
      questions: [
        {
          question: 'How does custom itinerary planning work?',
          answer: 'Our custom itinerary service starts with a consultation to understand your preferences, budget, and travel goals. Our experts then create a personalized itinerary with accommodations, activities, and experiences tailored specifically for you.'
        },
        {
          question: 'How long does it take to plan a custom trip?',
          answer: 'Custom trip planning typically takes 3-7 business days depending on the complexity and destination. For urgent requests, we offer expedited planning services for an additional fee.'
        },
        {
          question: 'Can I make changes to my custom itinerary during the trip?',
          answer: 'Absolutely! One of the benefits of our custom service is flexibility. You can make changes during your trip through our 24/7 support team, subject to availability and any additional costs.'
        }
      ]
    },
    {
      category: 'Support & Safety',
      questions: [
        {
          question: 'Do you provide 24/7 support during trips?',
          answer: 'Yes, we provide 24/7 customer support for all our services. Our support team can assist with emergencies, booking changes, local recommendations, and any issues that may arise during your travel.'
        },
        {
          question: 'What safety measures do you have in place?',
          answer: 'We prioritize traveler safety with vetted local partners, comprehensive insurance coverage, real-time travel monitoring, emergency response protocols, and regular safety briefings for adventure activities.'
        },
        {
          question: 'What happens if there are travel disruptions?',
          answer: 'In case of travel disruptions (weather, political situations, etc.), our team works immediately to provide alternative arrangements, rebooking assistance, and ensure your safety. We have contingency plans for all destinations.'
        }
      ]
    }
  ];

  const allQuestions = faqs.flatMap((category, categoryIndex) =>
    category.questions.map((q, questionIndex) => ({
      ...q,
      categoryIndex,
      questionIndex,
      globalIndex: categoryIndex * 10 + questionIndex
    }))
  );

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Find answers to common questions about our travel services. Can't find what you're looking for? Contact our support team.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
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
          <div className="space-y-4">
            {allQuestions.map((item, index) => (
              <div
                key={index}
                className="bg-gray-50 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200"
              >
                <button
                  onClick={() => setOpenFAQ(openFAQ === index ? -1 : index)}
                  className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-100 transition-colors duration-200"
                >
                  <span className="font-semibold text-gray-900 pr-4">{item.question}</span>
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

          {/* Contact Support */}
          <div className="mt-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8 text-center text-white">
            <h3 className="text-2xl font-bold mb-4">Still Have Questions?</h3>
            <p className="text-lg mb-6 opacity-90">
              Our travel experts are here to help you plan the perfect trip
            </p>
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <button className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors duration-200">
                Chat with Expert
              </button>
              <button className="px-6 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-blue-600 transition-colors duration-200">
                Call Us: +1 (555) 123-4567
              </button>
              <button className="px-6 py-3 bg-transparent border-2 border-yellow-400 text-yellow-400 font-semibold rounded-lg hover:bg-yellow-400 hover:text-gray-900 transition-colors duration-200">
                Email Support
              </button>
            </div>
          </div>

          {/* Quick Help Links */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <div className="text-3xl mb-3">📞</div>
              <h4 className="font-semibold text-gray-900 mb-2">Phone Support</h4>
              <p className="text-gray-600 text-sm">Available 24/7 for urgent matters</p>
              <p className="text-blue-600 font-medium">+1 (555) 123-4567</p>
            </div>
            
            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <div className="text-3xl mb-3">💬</div>
              <h4 className="font-semibold text-gray-900 mb-2">Live Chat</h4>
              <p className="text-gray-600 text-sm">Instant help from our team</p>
              <p className="text-blue-600 font-medium">Start Chat</p>
            </div>
            
            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <div className="text-3xl mb-3">📧</div>
              <h4 className="font-semibold text-gray-900 mb-2">Email Support</h4>
              <p className="text-gray-600 text-sm">Response within 2 hours</p>
              <p className="text-blue-600 font-medium">support@travel.com</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceFAQ;
