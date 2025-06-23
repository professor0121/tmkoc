import { useState } from 'react';
import { useSelector } from 'react-redux';

const ContactForm = () => {
  const { user } = useSelector(state => state.auth);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '',
    subject: '',
    category: 'general',
    message: '',
    preferredContact: 'email',
    urgency: 'normal'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const categories = [
    { value: 'general', label: 'General Inquiry' },
    { value: 'booking', label: 'Booking Support' },
    { value: 'custom', label: 'Custom Trip Planning' },
    { value: 'complaint', label: 'Complaint/Issue' },
    { value: 'partnership', label: 'Partnership' },
    { value: 'media', label: 'Media/Press' }
  ];

  const urgencyLevels = [
    { value: 'low', label: 'Low - Response within 24 hours' },
    { value: 'normal', label: 'Normal - Response within 4 hours' },
    { value: 'high', label: 'High - Response within 1 hour' },
    { value: 'urgent', label: 'Urgent - Immediate response needed' }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters long';
    }

    if (formData.phone && !/^\+?[\d\s\-\(\)]+$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Here you would typically send the form data to your backend
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate API call
      
      setIsSubmitted(true);
      setFormData({
        name: user?.name || '',
        email: user?.email || '',
        phone: '',
        subject: '',
        category: 'general',
        message: '',
        preferredContact: 'email',
        urgency: 'normal'
      });
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div id="contact-form" className="bg-green-50 border border-green-200 rounded-xl p-8 text-center">
        <div className="text-4xl mb-4">✅</div>
        <h3 className="text-2xl font-bold text-green-800 mb-4">Message Sent Successfully!</h3>
        <p className="text-green-700 mb-6">
          Thank you for contacting us. We've received your message and will get back to you soon.
        </p>
        <div className="bg-white rounded-lg p-4 mb-6">
          <p className="text-sm text-gray-600">
            <strong>Expected Response Time:</strong> {
              formData.urgency === 'urgent' ? 'Within 30 minutes' :
              formData.urgency === 'high' ? 'Within 1 hour' :
              formData.urgency === 'normal' ? 'Within 4 hours' :
              'Within 24 hours'
            }
          </p>
        </div>
        <button
          onClick={() => setIsSubmitted(false)}
          className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200"
        >
          Send Another Message
        </button>
      </div>
    );
  }

  return (
    <div id="contact-form">
      <h2 className="text-3xl font-bold text-gray-900 mb-6">Send Us a Message</h2>
      <p className="text-gray-600 mb-8">
        Fill out the form below and we'll get back to you as soon as possible. 
        All fields marked with * are required.
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name and Email Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
              Full Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.name ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter your full name"
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email Address *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.email ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter your email address"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>
        </div>

        {/* Phone and Category Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
              Phone Number (Optional)
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.phone ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter your phone number"
            />
            {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
          </div>

          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
              Category
            </label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {categories.map(category => (
                <option key={category.value} value={category.value}>
                  {category.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Subject */}
        <div>
          <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
            Subject *
          </label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.subject ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Brief description of your inquiry"
          />
          {errors.subject && <p className="text-red-500 text-sm mt-1">{errors.subject}</p>}
        </div>

        {/* Message */}
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
            Message *
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows={6}
            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-vertical ${
              errors.message ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Please provide details about your inquiry..."
          />
          {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
          <p className="text-sm text-gray-500 mt-1">
            {formData.message.length}/500 characters
          </p>
        </div>

        {/* Preferences Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="preferredContact" className="block text-sm font-medium text-gray-700 mb-2">
              Preferred Contact Method
            </label>
            <select
              id="preferredContact"
              name="preferredContact"
              value={formData.preferredContact}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="email">Email</option>
              <option value="phone">Phone</option>
              <option value="either">Either</option>
            </select>
          </div>

          <div>
            <label htmlFor="urgency" className="block text-sm font-medium text-gray-700 mb-2">
              Urgency Level
            </label>
            <select
              id="urgency"
              name="urgency"
              value={formData.urgency}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {urgencyLevels.map(level => (
                <option key={level.value} value={level.value}>
                  {level.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-3 px-6 rounded-lg font-semibold transition-colors duration-200 ${
              isSubmitting
                ? 'bg-gray-400 text-gray-700 cursor-not-allowed'
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-gray-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Sending Message...
              </span>
            ) : (
              'Send Message'
            )}
          </button>
        </div>

        {/* Privacy Notice */}
        <div className="text-sm text-gray-500 text-center">
          <p>
            By submitting this form, you agree to our{' '}
            <a href="/privacy" className="text-blue-600 hover:underline">Privacy Policy</a>{' '}
            and{' '}
            <a href="/terms" className="text-blue-600 hover:underline">Terms of Service</a>.
          </p>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;
