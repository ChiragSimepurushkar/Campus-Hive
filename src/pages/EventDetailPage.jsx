import React, { useState } from 'react';
import { Calendar, MapPin, Users, Clock, Share2, Bookmark, ExternalLink, Trophy, CheckCircle, AlertCircle, ChevronRight, User, Award, Target, Zap } from 'lucide-react';

const EventDetailPage = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isRegistered, setIsRegistered] = useState(false);

  const event = {
    id: 1,
    title: 'AI/ML Hackathon 2025',
    organizer: 'MIT Tech Club',
    organizerLogo: 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=100',
    date: 'March 15-17, 2025',
    time: '9:00 AM - 6:00 PM',
    location: 'MIT Campus, Boston, MA',
    type: 'hackathon',
    category: 'AI/ML',
    participants: 250,
    maxParticipants: 300,
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200',
    prize: '$10,000',
    difficulty: 'Advanced',
    registrationDeadline: 'March 10, 2025',
    description: 'Join us for the biggest AI/ML Hackathon of 2025! This 3-day event brings together the brightest minds in artificial intelligence and machine learning. Build innovative solutions, network with industry leaders, and compete for amazing prizes.',
    schedule: [
      { day: 'Day 1', date: 'March 15', events: [
        { time: '9:00 AM', title: 'Registration & Check-in' },
        { time: '10:00 AM', title: 'Opening Ceremony' },
        { time: '11:00 AM', title: 'Hacking Begins' },
        { time: '1:00 PM', title: 'Lunch & Networking' },
        { time: '6:00 PM', title: 'Workshop: Advanced ML Techniques' }
      ]},
      { day: 'Day 2', date: 'March 16', events: [
        { time: '9:00 AM', title: 'Morning Check-in' },
        { time: '12:00 PM', title: 'Mentor Office Hours' },
        { time: '1:00 PM', title: 'Lunch & Tech Talks' },
        { time: '7:00 PM', title: 'Progress Presentations' }
      ]},
      { day: 'Day 3', date: 'March 17', events: [
        { time: '9:00 AM', title: 'Final Push' },
        { time: '12:00 PM', title: 'Project Submissions' },
        { time: '2:00 PM', title: 'Final Presentations' },
        { time: '5:00 PM', title: 'Awards Ceremony' }
      ]}
    ],
    prizes: [
      { place: '1st Place', amount: '$5,000', description: 'Plus mentorship from industry leaders' },
      { place: '2nd Place', amount: '$3,000', description: 'Plus access to exclusive resources' },
      { place: '3rd Place', amount: '$2,000', description: 'Plus certificate of achievement' }
    ],
    requirements: [
      'Valid student ID from any university',
      'Laptop with development environment',
      'Basic knowledge of Python and ML frameworks',
      'Team size: 2-4 members (individuals welcome)'
    ],
    sponsors: [
      { name: 'Google', logo: 'https://via.placeholder.com/100?text=Google' },
      { name: 'Microsoft', logo: 'https://via.placeholder.com/100?text=Microsoft' },
      { name: 'Amazon', logo: 'https://via.placeholder.com/100?text=Amazon' },
      { name: 'Meta', logo: 'https://via.placeholder.com/100?text=Meta' }
    ],
    speakers: [
      { name: 'Dr. Sarah Johnson', role: 'AI Research Lead, Google', avatar: 'SJ', bio: 'PhD in ML from Stanford' },
      { name: 'Mike Chen', role: 'Senior Engineer, OpenAI', avatar: 'MC', bio: '10+ years in AI/ML' },
      { name: 'Emma Davis', role: 'Tech Lead, Microsoft', avatar: 'ED', bio: 'Expert in Deep Learning' }
    ],
    perks: [
      'Free meals and snacks throughout the event',
      'Access to cloud computing credits',
      'Mentorship from industry experts',
      'Swag bag with tech goodies',
      'Networking opportunities with sponsors',
      'Certificate of participation'
    ]
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Target },
    { id: 'schedule', label: 'Schedule', icon: Calendar },
    { id: 'prizes', label: 'Prizes', icon: Trophy },
    { id: 'speakers', label: 'Speakers', icon: User }
  ];

  const renderTabContent = () => {
    switch(activeTab) {
      case 'overview':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">About This Event</h3>
              <p className="text-gray-700 leading-relaxed mb-6">
                {event.description}
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Requirements</h3>
              <div className="space-y-3">
                {event.requirements.map((req, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <CheckCircle size={20} className="text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{req}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">What You'll Get</h3>
              <div className="grid md:grid-cols-2 gap-4">
                {event.perks.map((perk, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-4 bg-indigo-50 rounded-xl">
                    <Zap size={18} className="text-indigo-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{perk}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Sponsors</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {event.sponsors.map((sponsor, idx) => (
                  <div key={idx} className="bg-white p-6 rounded-xl border-2 border-gray-100 flex items-center justify-center hover:border-indigo-200 hover:shadow-lg transition-all">
                    <img src={sponsor.logo} alt={sponsor.name} className="w-20 h-20 object-contain" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'schedule':
        return (
          <div className="space-y-8">
            {event.schedule.map((day, idx) => (
              <div key={idx}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center text-white font-bold">
                    {idx + 1}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{day.day}</h3>
                    <p className="text-gray-600">{day.date}</p>
                  </div>
                </div>
                <div className="space-y-3 pl-16">
                  {day.events.map((evt, evtIdx) => (
                    <div key={evtIdx} className="flex items-start gap-4 p-4 bg-white rounded-xl border-2 border-gray-100 hover:border-indigo-200 transition-all">
                      <div className="flex items-center gap-2 min-w-[100px]">
                        <Clock size={16} className="text-indigo-600" />
                        <span className="text-sm font-semibold text-gray-700">{evt.time}</span>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900">{evt.title}</h4>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        );

      case 'prizes':
        return (
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl p-8 border-2 border-yellow-200">
              <div className="flex items-center gap-3 mb-4">
                <Trophy size={32} className="text-yellow-600" />
                <h3 className="text-2xl font-bold text-gray-900">Total Prize Pool: {event.prize}</h3>
              </div>
              <p className="text-gray-700">Compete for cash prizes and exclusive opportunities!</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {event.prizes.map((prize, idx) => (
                <div key={idx} className="bg-white rounded-2xl p-6 border-2 border-gray-100 hover:border-indigo-200 hover:shadow-xl transition-all">
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      idx === 0 ? 'bg-gradient-to-br from-yellow-400 to-orange-500' :
                      idx === 1 ? 'bg-gradient-to-br from-gray-300 to-gray-400' :
                      'bg-gradient-to-br from-orange-300 to-orange-400'
                    }`}>
                      <Award size={24} className="text-white" />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-gray-900">{prize.place}</h4>
                      <p className="text-2xl font-bold text-indigo-600">{prize.amount}</p>
                    </div>
                  </div>
                  <p className="text-gray-600">{prize.description}</p>
                </div>
              ))}
            </div>
          </div>
        );

      case 'speakers':
        return (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {event.speakers.map((speaker, idx) => (
              <div key={idx} className="bg-white rounded-2xl p-6 border-2 border-gray-100 hover:border-indigo-200 hover:shadow-xl transition-all">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                    {speaker.avatar}
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">{speaker.name}</h4>
                    <p className="text-sm text-gray-600">{speaker.role}</p>
                  </div>
                </div>
                <p className="text-gray-700">{speaker.bio}</p>
              </div>
            ))}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Hero Section */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8">
          <div className="relative h-96">
            <img 
              src={event.image} 
              alt={event.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
            
            <div className="absolute top-6 right-6 flex gap-3">
              <button className="p-3 bg-white/90 backdrop-blur-sm rounded-xl hover:bg-white transition-all">
                <Share2 size={20} className="text-gray-700" />
              </button>
              <button className="p-3 bg-white/90 backdrop-blur-sm rounded-xl hover:bg-white transition-all">
                <Bookmark size={20} className="text-gray-700" />
              </button>
            </div>

            <div className="absolute bottom-0 left-0 right-0 p-8">
              <div className="flex items-center gap-3 mb-4">
                <img 
                  src={event.organizerLogo} 
                  alt={event.organizer}
                  className="w-12 h-12 rounded-xl border-2 border-white"
                />
                <span className="text-white font-semibold">{event.organizer}</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                {event.title}
              </h1>
              <div className="flex flex-wrap gap-3">
                <span className="px-4 py-2 bg-white/20 backdrop-blur-sm text-white rounded-xl font-semibold border border-white/30">
                  {event.type.toUpperCase()}
                </span>
                <span className="px-4 py-2 bg-white/20 backdrop-blur-sm text-white rounded-xl font-semibold border border-white/30">
                  {event.difficulty}
                </span>
                <span className="px-4 py-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-xl font-semibold">
                  Prize: {event.prize}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Tabs */}
            <div className="bg-white rounded-2xl shadow-lg p-2 mb-8">
              <div className="flex flex-wrap gap-2">
                {tabs.map(tab => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex-1 min-w-[120px] flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-semibold transition-all ${
                        activeTab === tab.id
                          ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white'
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      <Icon size={18} />
                      {tab.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Tab Content */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              {renderTabContent()}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Registration Card */}
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-8">
              <div className="space-y-4 mb-6">
                <div className="flex items-center gap-3">
                  <Calendar size={20} className="text-indigo-600" />
                  <div>
                    <p className="text-sm text-gray-600">Date</p>
                    <p className="font-semibold text-gray-900">{event.date}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <Clock size={20} className="text-indigo-600" />
                  <div>
                    <p className="text-sm text-gray-600">Time</p>
                    <p className="font-semibold text-gray-900">{event.time}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <MapPin size={20} className="text-indigo-600" />
                  <div>
                    <p className="text-sm text-gray-600">Location</p>
                    <p className="font-semibold text-gray-900">{event.location}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Users size={20} className="text-indigo-600" />
                  <div>
                    <p className="text-sm text-gray-600">Participants</p>
                    <p className="font-semibold text-gray-900">{event.participants}/{event.maxParticipants}</p>
                  </div>
                </div>
              </div>

              <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-xl flex items-start gap-2">
                <AlertCircle size={18} className="text-yellow-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-semibold text-gray-900">Registration Deadline</p>
                  <p className="text-sm text-gray-600">{event.registrationDeadline}</p>
                </div>
              </div>

              <div className="mb-4">
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-indigo-600 to-purple-600"
                    style={`{ width: ${(event.participants / event.maxParticipants) * 100}% }`}
                  ></div>
                </div>
                <p className="text-sm text-gray-600 mt-2 text-center">
                  {event.maxParticipants - event.participants} spots remaining
                </p>
              </div>

              <button
                onClick={() => setIsRegistered(!isRegistered)}
                className={`w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${
                  isRegistered
                    ? 'bg-green-100 text-green-700 hover:bg-green-200'
                    : 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700'
                }`}
              >
                {isRegistered ? (
                  <>
                    <CheckCircle size={20} />
                    Registered
                  </>
                ) : (
                  <>
                    Register Now
                    <ChevronRight size={20} />
                  </>
                )}
              </button>

              <button className="w-full mt-3 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-all flex items-center justify-center gap-2">
                <ExternalLink size={18} />
                View Official Page
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetailPage;