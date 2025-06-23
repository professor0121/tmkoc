import { useState } from 'react';
import Header from '../components/Header';
import ServiceHero from '../components/services/ServiceHero';
import ServiceCategories from '../components/services/ServiceCategories';
import ServiceFeatures from '../components/services/ServiceFeatures';
import ServiceTestimonials from '../components/services/ServiceTestimonials';
import ServicePricing from '../components/services/ServicePricing';
import ServiceFAQ from '../components/services/ServiceFAQ';
import ServiceCTA from '../components/services/ServiceCTA';
import Footer from '../components/home/Footer';

const Services = () => {
  const [activeService, setActiveService] = useState('packages');

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Service Hero Section */}
      <ServiceHero />

      {/* Service Categories */}
      <ServiceCategories
        activeService={activeService}
        setActiveService={setActiveService}
      />

      {/* Service Features */}
      <ServiceFeatures activeService={activeService} />

      {/* Service Pricing */}
      <ServicePricing />

      {/* Service Testimonials */}
      <ServiceTestimonials />

      {/* Service FAQ */}
      <ServiceFAQ />

      {/* Service CTA */}
      <ServiceCTA />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Services;