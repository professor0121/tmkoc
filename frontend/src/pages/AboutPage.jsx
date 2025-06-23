import Header from '../components/Header';
import AboutHero from '../components/about/AboutHero';
import AboutStory from '../components/about/AboutStory';
import AboutValues from '../components/about/AboutValues';
import AboutTeam from '../components/about/AboutTeam';
import AboutStats from '../components/about/AboutStats';
import AboutMission from '../components/about/AboutMission';
import AboutTimeline from '../components/about/AboutTimeline';
import AboutCTA from '../components/about/AboutCTA';
import Footer from '../components/home/Footer';

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* About Hero Section */}
      <AboutHero />

      {/* Company Story */}
      <AboutStory />

      {/* Mission & Vision */}
      <AboutMission />

      {/* Company Values */}
      <AboutValues />

      {/* Company Statistics */}
      <AboutStats />

      {/* Company Timeline */}
      <AboutTimeline />

      {/* Team Section */}
      <AboutTeam />

      {/* About CTA */}
      <AboutCTA />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default AboutPage;