import Header from '../components/Header';
import ContactHero from '../components/contact/ContactHero';
import ContactForm from '../components/contact/ContactForm';
import ContactInfo from '../components/contact/ContactInfo';
import ContactMap from '../components/contact/ContactMap';
import ContactFAQ from '../components/contact/ContactFAQ';
import ContactSupport from '../components/contact/ContactSupport';
import ContactCTA from '../components/contact/ContactCTA';
import Footer from '../components/home/Footer';

const ContactPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Contact Hero Section */}
      <ContactHero />

      {/* Contact Form & Info */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <ContactForm />
              <ContactInfo />
            </div>
          </div>
        </div>
      </section>

      {/* Contact Map */}
      <ContactMap />

      {/* Support Options */}
      <ContactSupport />

      {/* Contact FAQ */}
      <ContactFAQ />

      {/* Contact CTA */}
      <ContactCTA />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default ContactPage;