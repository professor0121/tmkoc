import Header from '../components/Header';
import HelpHero from '../components/help/HelpHero';
import HelpCategories from '../components/help/HelpCategories';
import HelpSearch from '../components/help/HelpSearch';
import HelpFAQ from '../components/help/HelpFAQ';
import HelpGuides from '../components/help/HelpGuides';
import HelpContact from '../components/help/HelpContact';
import Footer from '../components/home/Footer';

const HelpCenterPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Help Hero Section */}
      <HelpHero />
      
      {/* Help Search */}
      <HelpSearch />
      
      {/* Help Categories */}
      <HelpCategories />
      
      {/* Help Guides */}
      <HelpGuides />
      
      {/* Help FAQ */}
      <HelpFAQ />
      
      {/* Help Contact */}
      <HelpContact />
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default HelpCenterPage;
