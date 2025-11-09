import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Calendar, MapPin, Users, Clock, Share2, Bookmark, ExternalLink, Trophy, CheckCircle, AlertCircle, ChevronRight, User, Award, Target, Zap, ArrowLeft } from 'lucide-react';
import { MyContext } from '../App.jsx';
import { getEventById } from '../utils/api.js';

const EventDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const context = useContext(MyContext);
  
  const [activeTab, setActiveTab] = useState('overview');
  const [isRegistered, setIsRegistered] = useState(false);
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEventData = async () => {
      // Prevent treating 'create' as an ID
      if (id === 'create') {
        navigate('/events/create');
        return;
      }

      try {
        setLoading(true);
        const res = await getEventById(id);
        
        if (res.success && res.data) {
          setEvent(res.data);
        } else {
          context.openAlertBox('error', res.message || 'Failed to fetch event');
          navigate('/events');
        }
      } catch (err) {
        console.error('Error fetching event:', err);
        context.openAlertBox('error', 'An unexpected error occurred');
        navigate('/events');
      } finally {
        setLoading(false);
      }
    };

    fetchEventData();
  }, [id, navigate, context]);

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Target },
    { id: 'schedule', label: 'Schedule', icon: Calendar },
    { id: 'prizes', label: 'Prizes', icon: Trophy },
    { id: 'speakers', label: 'Speakers', icon: User }
  ];

  const handleRegister = () => {
    setIsRegistered(!isRegistered);
    context.openAlertBox('success', isRegistered ? 'Registration cancelled' : 'Successfully registered!');
  };

  const renderTabContent = () => {
    if (!event) return null;

    switch(activeTab) {
      case 'overview':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">About This Event</h3>
              <p className="text-gray-700 leading-relaxed mb-6">
                {event.description || 'No description available.'}
              </p>
            </div>

            {event.requirements && event.requirements.length > 0 && (
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
            )}

            {event.perks && event.perks.length > 0 && (
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
            )}

            {event.sponsors && event.sponsors.length > 0 && (
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
            )}
          </div>
        );

      case 'schedule':
        return (
          <div className="space-y-8">
            {event.schedule && event.schedule.length > 0 ? (
              event.schedule.map((day, idx) => (
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
              ))
            ) : (
              <p className="text-gray-500 text-center py-8">No schedule available yet.</p>
            )}
          </div>
        );

      case 'prizes':
        return (
          <div className="space-y-6">
            {event.prize && (
              <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl p-8 border-2 border-yellow-200">
                <div className="flex items-center gap-3 mb-4">
                  <Trophy size={32} className="text-yellow-600" />
                  <h3 className="text-2xl font-bold text-gray-900">Total Prize Pool: {event.prize}</h3>
                </div>
                <p className="text-gray-700">Compete for cash prizes and exclusive opportunities!</p>
              </div>
            )}

            {event.prizes && event.prizes.length > 0 ? (
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
            ) : (
              <p className="text-gray-500 text-center py-8">Prize information coming soon.</p>
            )}
          </div>
        );

      case 'speakers':
        return (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {event.speakers && event.speakers.length > 0 ? (
              event.speakers.map((speaker, idx) => (
                <div key={idx} className="bg-white rounded-2xl p-6 border-2 border-gray-100 hover:border-indigo-200 hover:shadow-xl transition-all">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                      {speaker.avatar || speaker.name?.charAt(0) || 'S'}
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900">{speaker.name}</h4>
                      <p className="text-sm text-gray-600">{speaker.role}</p>
                    </div>
                  </div>
                  <p className="text-gray-700">{speaker.bio}</p>
                </div>
              ))
            ) : (
              <div className="col-span-full text-gray-500 text-center py-8">
                Speaker information coming soon.
              </div>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  // Loading State
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <div className="text-indigo-600 font-semibold text-lg">Loading event...</div>
        </div>
      </div>
    );
  }

  // Event Not Found
  if (!event) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">😔</div>
          <div className="text-red-600 font-semibold text-lg mb-4">Event not found</div>
          <button 
            onClick={() => navigate('/events')}
            className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            Back to Events
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Back Button */}
        <button
          onClick={() => navigate('/events')}
          className="mb-6 flex items-center gap-2 text-gray-700 hover:text-indigo-600 transition"
        >
          <ArrowLeft size={18} />
          <span className="font-medium">Back to Events</span>
        </button>

        {/* Hero Section */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8">
          <div className="relative h-96">
            <img 
              src={event.image || 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200'} 
              alt={event.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
            
            <div className="absolute top-6 right-6 flex gap-3">
              <button 
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href);
                  context.openAlertBox('success', 'Link copied to clipboard!');
                }}
                className="p-3 bg-white/90 backdrop-blur-sm rounded-xl hover:bg-white transition-all"
              >
                <Share2 size={20} className="text-gray-700" />
              </button>
              <button className="p-3 bg-white/90 backdrop-blur-sm rounded-xl hover:bg-white transition-all">
                <Bookmark size={20} className="text-gray-700" />
              </button>
            </div>

            <div className="absolute bottom-0 left-0 right-0 p-8">
              {event.organizerLogo && (
                <div className="flex items-center gap-3 mb-4">
                  <img 
                    src={event.organizerLogo} 
                    alt={event.organizer}
                    className="w-12 h-12 rounded-xl border-2 border-white"
                  />
                  <span className="text-white font-semibold">{event.organizer || 'Organizer'}</span>
                </div>
              )}
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                {event.title}
              </h1>
              <div className="flex flex-wrap gap-3">
                <span className="px-4 py-2 bg-white/20 backdrop-blur-sm text-white rounded-xl font-semibold border border-white/30">
                  {event.type?.toUpperCase() || 'EVENT'}
                </span>
                {event.difficulty && (
                  <span className="px-4 py-2 bg-white/20 backdrop-blur-sm text-white rounded-xl font-semibold border border-white/30">
                    {event.difficulty}
                  </span>
                )}
                {event.prize && (
                  <span className="px-4 py-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-xl font-semibold">
                    Prize: {event.prize}
                  </span>
                )}
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
                    <p className="font-semibold text-gray-900">{event.date || 'TBD'}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <Clock size={20} className="text-indigo-600" />
                  <div>
                    <p className="text-sm text-gray-600">Time</p>
                    <p className="font-semibold text-gray-900">{event.time || 'TBD'}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <MapPin size={20} className="text-indigo-600" />
                  <div>
                    <p className="text-sm text-gray-600">Location</p>
                    <p className="font-semibold text-gray-900">{event.location || 'TBD'}</p>
                  </div>
                </div>

                {event.participants !== undefined && (
                  <div className="flex items-center gap-3">
                    <Users size={20} className="text-indigo-600" />
                    <div>
                      <p className="text-sm text-gray-600">Participants</p>
                      <p className="font-semibold text-gray-900">
                        {event.participants || 0}/{event.maxParticipants || '∞'}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {event.registrationDeadline && (
                <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-xl flex items-start gap-2">
                  <AlertCircle size={18} className="text-yellow-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-semibold text-gray-900">Registration Deadline</p>
                    <p className="text-sm text-gray-600">{event.registrationDeadline}</p>
                  </div>
                </div>
              )}

              {event.participants !== undefined && event.maxParticipants && (
                <div className="mb-4">
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-indigo-600 to-purple-600"
                      style={{ width: `${(event.participants / event.maxParticipants) * 100}%` }}
                    ></div>
                  </div>
                  <p className="text-sm text-gray-600 mt-2 text-center">
                    {event.maxParticipants - event.participants} spots remaining
                  </p>
                </div>
              )}

              <button
                onClick={handleRegister}
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