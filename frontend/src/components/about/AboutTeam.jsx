import { useState } from 'react';

const AboutTeam = () => {
  const [selectedMember, setSelectedMember] = useState(null);

  const teamMembers = [
    {
      id: 1,
      name: 'Sarah Johnson',
      position: 'CEO & Co-Founder',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
      bio: 'Sarah is a passionate traveler who has visited over 60 countries. She founded Travel Booking with the vision of making extraordinary travel accessible to everyone.',
      experience: '15+ years in travel industry',
      education: 'MBA from Stanford University',
      specialties: ['Strategic Planning', 'Business Development', 'Customer Experience'],
      social: {
        linkedin: '#',
        twitter: '#',
        email: 'sarah@travel.com'
      },
      quote: 'Travel is the only thing you buy that makes you richer.'
    },
    {
      id: 2,
      name: 'Michael Chen',
      position: 'CTO & Co-Founder',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
      bio: 'Michael leads our technology vision and has built scalable platforms that serve millions of users. His expertise in AI and machine learning drives our personalization features.',
      experience: '12+ years in tech',
      education: 'MS Computer Science from MIT',
      specialties: ['AI/ML', 'Platform Architecture', 'Product Development'],
      social: {
        linkedin: '#',
        twitter: '#',
        email: 'michael@travel.com'
      },
      quote: 'Technology should make travel planning effortless and enjoyable.'
    },
    {
      id: 3,
      name: 'Emily Rodriguez',
      position: 'Head of Operations',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
      bio: 'Emily ensures our operations run smoothly across all destinations. Her attention to detail and operational excellence guarantee exceptional travel experiences.',
      experience: '10+ years in operations',
      education: 'BA International Business',
      specialties: ['Operations Management', 'Quality Assurance', 'Partner Relations'],
      social: {
        linkedin: '#',
        twitter: '#',
        email: 'emily@travel.com'
      },
      quote: 'Excellence is in the details, especially when it comes to travel.'
    },
    {
      id: 4,
      name: 'David Thompson',
      position: 'Head of Customer Success',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
      bio: 'David leads our customer success team and ensures every traveler has an amazing experience from booking to return. His team provides 24/7 support worldwide.',
      experience: '8+ years in customer success',
      education: 'BA Communications',
      specialties: ['Customer Support', 'Team Leadership', 'Process Improvement'],
      social: {
        linkedin: '#',
        twitter: '#',
        email: 'david@travel.com'
      },
      quote: 'Every customer interaction is an opportunity to create a lasting positive impression.'
    },
    {
      id: 5,
      name: 'Lisa Wang',
      position: 'Head of Marketing',
      image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
      bio: 'Lisa drives our marketing strategy and brand development. Her creative campaigns have helped millions discover their next adventure through our platform.',
      experience: '9+ years in marketing',
      education: 'MA Marketing from NYU',
      specialties: ['Digital Marketing', 'Brand Strategy', 'Content Creation'],
      social: {
        linkedin: '#',
        twitter: '#',
        email: 'lisa@travel.com'
      },
      quote: 'Great marketing tells a story that inspires people to take action.'
    },
    {
      id: 6,
      name: 'Robert Martinez',
      position: 'Head of Finance',
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
      bio: 'Robert manages our financial strategy and ensures sustainable growth. His expertise in financial planning helps us invest in the right areas for long-term success.',
      experience: '12+ years in finance',
      education: 'CPA, MBA Finance',
      specialties: ['Financial Planning', 'Risk Management', 'Strategic Analysis'],
      social: {
        linkedin: '#',
        twitter: '#',
        email: 'robert@travel.com'
      },
      quote: 'Sound financial management enables us to focus on what matters most - our customers.'
    }
  ];

  const departments = [
    { name: 'Engineering', count: 15, icon: '💻' },
    { name: 'Customer Success', count: 12, icon: '🎧' },
    { name: 'Operations', count: 8, icon: '⚙️' },
    { name: 'Marketing', count: 6, icon: '📢' },
    { name: 'Finance', count: 4, icon: '💰' },
    { name: 'HR', count: 3, icon: '👥' }
  ];

  return (
    <section id="team-section" className="py-16 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Behind every great travel experience is a passionate team of experts dedicated to making your journey unforgettable.
            </p>
          </div>

          {/* Leadership Team */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">Leadership Team</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {teamMembers.map((member) => (
                <div
                  key={member.id}
                  className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-2"
                  onClick={() => setSelectedMember(member)}
                >
                  {/* Member Image */}
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                    <div className="absolute bottom-4 left-4 text-white">
                      <h4 className="text-lg font-bold">{member.name}</h4>
                      <p className="text-sm opacity-90">{member.position}</p>
                    </div>
                  </div>

                  {/* Member Info */}
                  <div className="p-6">
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">{member.bio}</p>
                    
                    {/* Specialties */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {member.specialties.slice(0, 2).map((specialty, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                        >
                          {specialty}
                        </span>
                      ))}
                      {member.specialties.length > 2 && (
                        <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                          +{member.specialties.length - 2} more
                        </span>
                      )}
                    </div>

                    {/* Social Links */}
                    <div className="flex space-x-3">
                      <a href={member.social.linkedin} className="text-blue-600 hover:text-blue-800">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z" clipRule="evenodd" />
                        </svg>
                      </a>
                      <a href={member.social.twitter} className="text-blue-400 hover:text-blue-600">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
                        </svg>
                      </a>
                      <a href={`mailto:${member.social.email}`} className="text-gray-600 hover:text-gray-800">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Team Departments */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">Our Departments</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {departments.map((dept, index) => (
                <div key={index} className="bg-white rounded-lg p-6 text-center shadow-md hover:shadow-lg transition-shadow duration-200">
                  <div className="text-3xl mb-3">{dept.icon}</div>
                  <h4 className="font-semibold text-gray-900 mb-1">{dept.name}</h4>
                  <p className="text-sm text-gray-600">{dept.count} members</p>
                </div>
              ))}
            </div>
          </div>

          {/* Team Culture */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Our Culture</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🌟</span>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Innovation First</h4>
                <p className="text-gray-600 text-sm">We encourage creative thinking and embrace new ideas that improve travel experiences.</p>
              </div>
              <div className="text-center">
                <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🤝</span>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Collaboration</h4>
                <p className="text-gray-600 text-sm">We work together as one team, supporting each other to achieve common goals.</p>
              </div>
              <div className="text-center">
                <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🎯</span>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Customer Focus</h4>
                <p className="text-gray-600 text-sm">Every decision we make is guided by what's best for our travelers and their experiences.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Member Detail Modal */}
      {selectedMember && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-8">
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center">
                  <img
                    src={selectedMember.image}
                    alt={selectedMember.name}
                    className="w-20 h-20 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">{selectedMember.name}</h3>
                    <p className="text-blue-600 font-medium">{selectedMember.position}</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedMember(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">About</h4>
                  <p className="text-gray-700">{selectedMember.bio}</p>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Experience & Education</h4>
                  <p className="text-gray-700 mb-1">{selectedMember.experience}</p>
                  <p className="text-gray-700">{selectedMember.education}</p>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Specialties</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedMember.specialties.map((specialty, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
                      >
                        {specialty}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-gray-700 italic">"{selectedMember.quote}"</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default AboutTeam;
