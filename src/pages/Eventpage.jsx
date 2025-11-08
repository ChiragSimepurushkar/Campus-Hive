import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, Users, Clock, Search, Filter, ChevronRight, Bookmark, Share2, ExternalLink, Trophy, Zap, TrendingUp } from 'lucide-react';

const EventsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('all');

  const events = [
    {
      id: 1,
      title: 'AI/ML Hackathon 2025',
      organizer: 'MIT Tech Club',
      date: 'March 15-17, 2025',
      time: '9:00 AM - 6:00 PM',
      location: 'MIT Campus, Boston',
      type: 'hackathon',
      category: 'AI/ML',
      participants: 250,
      maxParticipants: 300,
      image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400',
      prize: '$10,000',
      difficulty: 'Advanced',
      featured: true,
      tags: ['AI', 'Machine Learning', 'Python', 'Deep Learning'],
      registrationDeadline: 'March 10, 2025'
    },
    {
      id: 2,
      title: 'Web Development Workshop',
      organizer: 'Stanford CodeLab',
      date: 'March 20, 2025',
      time: '2:00 PM - 5:00 PM',
      location: 'Online',
      type: 'workshop',
      category: 'Web Dev',
      participants: 120,
      maxParticipants: 150,
      image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400',
      difficulty: 'Beginner',
      featured: false,
      tags: ['React', 'JavaScript', 'CSS', 'HTML'],
      registrationDeadline: 'March 18, 2025'
    },
    {
      id: 3,
      title: 'Blockchain Summit 2025',
      organizer: 'Berkeley Blockchain Club',
      date: 'March 25, 2025',
      time: '10:00 AM - 4:00 PM',
      location: 'UC Berkeley',
      type: 'conference',
      category: 'Blockchain',
      participants: 180,
      maxParticipants: 200,
      image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400',
      difficulty: 'Intermediate',
      featured: true,
      tags: ['Blockchain', 'Cryptocurrency', 'Smart Contracts'],
      registrationDeadline: 'March 22, 2025'
    },
    {
      id: 4,
      title: 'Design Thinking Bootcamp',
      organizer: 'Harvard Innovation Lab',
      date: 'April 1-2, 2025',
      time: '9:00 AM - 5:00 PM',
      location: 'Harvard University',
      type: 'bootcamp',
      category: 'Design',
      participants: 80,
      maxParticipants: 100,
      image: 'https://images.unsplash.com/photo-1559028012-481c04fa702d?w=400',
      prize: 'Certificates',
      difficulty: 'All Levels',
      featured: false,
      tags: ['UX Design', 'UI Design', 'Prototyping'],
      registrationDeadline: 'March 28, 2025'
    },
    {
      id: 5,
      title: 'Cybersecurity Challenge',
      organizer: 'MIT CyberSec Club',
      date: 'April 5-6, 2025',
      time: '24-hour event',
      location: 'Online',
      type: 'competition',
      category: 'Cybersecurity',
      participants: 200,
      maxParticipants: 250,
      image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400',
      prize: '$5,000',
      difficulty: 'Advanced',
      featured: true,
      tags: ['Security', 'Ethical Hacking', 'Networking'],
      registrationDeadline: 'April 1, 2025'
    },
    {
      id: 6,
      title: 'Startup Pitch Competition',
      organizer: 'Y Combinator',
      date: 'April 10, 2025',
      time: '1:00 PM - 6:00 PM',
      location: 'San Francisco, CA',
      type: 'competition',
      category: 'Entrepreneurship',
      participants: 50,
      maxParticipants: 60,
      image: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=400',
      prize: '$50,000',
      difficulty: 'All Levels',
      featured: true,
      tags: ['Startup', 'Business', 'Pitch'],
      registrationDeadline: 'April 5, 2025'
    }
  ];

  const categories = ['all', 'AI/ML', 'Web Dev', 'Blockchain', 'Design', 'Cybersecurity', 'Entrepreneurship'];
  const types = ['all', 'hackathon', 'workshop', 'conference', 'bootcamp', 'competition'];

  const filteredEvents = events.filter(event => {
    const matchesCategory = selectedCategory === 'all' || event.category === selectedCategory;
    const matchesType = selectedType === 'all' || event.type === selectedType;
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         event.organizer.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         event.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesType && matchesSearch;
  });

  const featuredEvents = filteredEvents.filter(e => e.featured);
  const regularEvents = filteredEvents.filter(e => !e.featured);

  const getDifficultyColor = (difficulty) => {
    const colors = {
      'Beginner': 'bg-green-100 text-green-700',
      'Intermediate': 'bg-yellow-100 text-yellow-700',
      'Advanced': 'bg-red-100 text-red-700',
      'All Levels': 'bg-blue-100 text-blue-700'
    };
    return colors[difficulty] || 'bg-gray-100 text-gray-700';
  };

  const getTypeIcon = (type) => {
    const icons = {
      'hackathon': Trophy,
      'workshop': Zap,
      'conference': Users,
      'bootcamp': TrendingUp,
      'competition': Trophy
    };
    return icons[type] || Calendar;
  };

  const EventCard = ({ event, featured = false }) => {
    const TypeIcon = getTypeIcon(event.type);
    
    return (
        <>
      <div className={`group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-1 ${featured ? 'border-2 border-indigo-200' : ''}`}>
        {/* Event Image */}
        <div className="relative h-48 overflow-hidden">
          <img 
            src={event.image} 
            alt={event.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          
          {featured && (
            <div className="absolute top-3 left-3 flex items-center gap-1 bg-gradient-to-r from-yellow-400 to-orange-500 px-3 py-1 rounded-full">
              <Zap size={14} className="text-white" />
              <span className="text-xs font-bold text-white">Featured</span>
            </div>
          )}
          
          <div className="absolute top-3 right-3 flex gap-2">
            <button className="p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-all">
              <Bookmark size={16} className="text-gray-700" />
            </button>
            <button className="p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-all">
              <Share2 size={16} className="text-gray-700" />
            </button>
          </div>

          <div className="absolute bottom-3 left-3">
            <span className={`px-3 py-1 rounded-full text-xs font-bold ${getDifficultyColor(event.difficulty)}`}>
              {event.difficulty}
            </span>
          </div>
        </div>

        {/* Event Content */}
        <div className="p-6">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center">
              <TypeIcon size={18} className="text-indigo-600" />
            </div>
            <span className="text-sm font-semibold text-indigo-600 capitalize">{event.type}</span>
          </div>

          <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors">
            {event.title}
          </h3>

          <p className="text-sm text-gray-600 mb-4">{event.organizer}</p>

          <div className="space-y-2 mb-4">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Calendar size={16} className="text-indigo-600" />
              <span>{event.date}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Clock size={16} className="text-indigo-600" />
              <span>{event.time}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <MapPin size={16} className="text-indigo-600" />
              <span>{event.location}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Users size={16} className="text-indigo-600" />
              <span>{event.participants}/{event.maxParticipants} registered</span>
            </div>
          </div>

          {event.prize && (
            <div className="mb-4 p-3 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl border border-yellow-200">
              <div className="flex items-center gap-2">
                <Trophy size={18} className="text-yellow-600" />
                <span className="font-bold text-gray-900">Prize: {event.prize}</span>
              </div>
            </div>
          )}

          <div className="flex flex-wrap gap-2 mb-4">
            {event.tags.slice(0, 3).map((tag, idx) => (
              <span key={idx} className="px-3 py-1 bg-indigo-50 text-indigo-700 rounded-lg text-xs font-medium">
                {tag}
              </span>
            ))}
          </div>

          <div className="flex gap-2">
            <Link 
              to={`/events/${event.id}`}
              className="flex-1 px-4 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all flex items-center justify-center gap-2"
            >
              Register Now
              <ChevronRight size={18} />
            </Link>
            <Link 
              to={`/events/${event.id}`}
              className="px-4 py-2.5 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-all flex items-center justify-center"
            >
              <ExternalLink size={18} />
            </Link>
          </div>

          <p className="text-xs text-gray-500 mt-3 text-center">
            Registration closes: {event.registrationDeadline}
          </p>
        </div>
      </div>
      </>
    );
  };
  
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3">
            Discover Events
          </h1>
          <p className="text-xl text-gray-600">
            Join hackathons, workshops, and competitions from top universities
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search events..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none"
              />
            </div>

            {/* Category Filter */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none bg-white"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>
                  {cat === 'all' ? 'All Categories' : cat}
                </option>
              ))}
            </select>

            {/* Type Filter */}
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none bg-white"
            >
              {types.map(type => (
                <option key={type} value={type}>
                  {type === 'all' ? 'All Types' : type.charAt(0).toUpperCase() + type.slice(1)}
                </option>
              ))}
            </select>
          </div>

          <div className="mt-4 flex items-center justify-between">
            <p className="text-sm text-gray-600">
              Showing {filteredEvents.length} of {events.length} events
            </p>
          </div>
        </div>

        {/* Featured Events */}
        {featuredEvents.length > 0 && (
          <div className="mb-12">
            <div className="flex items-center gap-2 mb-6">
              <Zap className="text-yellow-500" size={24} />
              <h2 className="text-2xl font-bold text-gray-900">Featured Events</h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredEvents.map(event => (
                <EventCard key={event.id} event={event} featured />
              ))}
            </div>
          </div>
        )}

        {/* All Events */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">All Events</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {regularEvents.map(event => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </div>

        {filteredEvents.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Calendar size={40} className="text-gray-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">No events found</h3>
            <p className="text-gray-600">Try adjusting your filters or search query</p>
          </div>
        )}
      </div>
    </div>
  );
};


export default EventsPage;
