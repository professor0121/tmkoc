const ContactHero = () => {
  return (
    <section className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 text-white">
      <div 
        className="relative min-h-[70vh] flex items-center justify-center bg-cover bg-center"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1423666639041-f56000c27a9a?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')"
        }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative text-center px-4 max-w-5xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Get in
            <span className="block text-yellow-400">Touch</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90 max-w-3xl mx-auto leading-relaxed">
            Have questions about your next adventure? Need help planning the perfect trip? 
            Our travel experts are here to help you every step of the way.
          </p>
          
          {/* Quick Contact Options */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 text-black">
            <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-6">
              <div className="text-3xl mb-3">📞</div>
              <h3 className="text-lg font-semibold mb-2">Call Us</h3>
              <p className="text-sm opacity-90">+1 (555) 123-4567</p>
              <p className="text-xs opacity-75">Available 24/7</p>
            </div>
            <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-6">
              <div className="text-3xl mb-3">📧</div>
              <h3 className="text-lg font-semibold mb-2">Email Us</h3>
              <p className="text-sm opacity-90">hello@travel.com</p>
              <p className="text-xs opacity-75">Response within 2 hours</p>
            </div>
            <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-6">
              <div className="text-3xl mb-3">💬</div>
              <h3 className="text-lg font-semibold mb-2">Live Chat</h3>
              <p className="text-sm opacity-90">Instant Support</p>
              <p className="text-xs opacity-75">9 AM - 9 PM EST</p>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <button
              onClick={() => document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-3 bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold rounded-lg transition-colors duration-200"
            >
              Send Message
            </button>
            <button
              onClick={() => document.getElementById('support-section')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-blue-600 transition-colors duration-200"
            >
              Get Support
            </button>
            <button
              onClick={() => window.open('tel:+15551234567')}
              className="px-8 py-3 bg-transparent border-2 border-yellow-400 text-yellow-400 font-semibold rounded-lg hover:bg-yellow-400 hover:text-gray-900 transition-colors duration-200"
            >
              Call Now
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactHero;
