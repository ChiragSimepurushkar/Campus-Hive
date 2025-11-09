import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Calendar, MapPin, Users, Clock, Search, Filter, ChevronRight, Bookmark, 
  Share2, ExternalLink, Trophy, Zap, TrendingUp, ArrowLeft, CalendarPlus 
} from 'lucide-react';
import { MyContext } from '../App.jsx';
import { getEvents } from '../utils/api.js';

const EventsPage = () => {
  const navigate = useNavigate();
  const context = useContext(MyContext);
  
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  const categories = ['all', 'AI/ML', 'Web Dev', 'Blockchain', 'Design', 'Cybersecurity', 'Entrepreneurship'];
  const types = ['all', 'hackathon', 'workshop', 'conference', 'bootcamp', 'competition'];

  // Fetch events from backend
  useEffect(() => {
    fetchEventsData();
  }, [selectedCategory, selectedType, searchQuery, page]);

  const fetchEventsData = async () => {
    try {
      setLoading(true);
      
      const filters = {
        page: page,
        limit: 12,
      };

      if (selectedCategory !== 'all') {
        filters.domain = selectedCategory;
      }
      if (selectedType !== 'all') {
        filters.type = selectedType;
      }
      if (searchQuery.trim()) {
        filters.search = searchQuery.trim();
      }

      const res = await getEvents(filters);
      
      if (res.success && res.data) {
        setEvents(res.data);
        setTotalCount(res.meta?.totalCount || 0);
      } else {
        context.openAlertBox('error', res.message || 'Failed to fetch events');
      }
    } catch (err) {
      console.error('Error fetching events:', err);
      context.openAlertBox('error', 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

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
      <div className={`group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-1 ${featured ? 'border-2 border-indigo-200' : ''}`}>
        {/* Event Image */}
        <div className="relative h-48 overflow-hidden">
          <img 
            src={event.image || 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400'} 
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

          {event.difficulty && (
            <div className="absolute bottom-3 left-3">
              <span className={`px-3 py-1 rounded-full text-xs font-bold ${getDifficultyColor(event.difficulty)}`}>
                {event.difficulty}
              </span>
            </div>
          )}
        </div>

        {/* Event Content */}
        <div className="p-6">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center">
              <TypeIcon size={18} className="text-indigo-600" />
            </div>
            <span className="text-sm font-semibold text-indigo-600 capitalize">{event.type || 'Event'}</span>
          </div>

          <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors line-clamp-2">
            {event.title}
          </h3>

          <p className="text-sm text-gray-600 mb-4">{event.organizer || 'Organizer'}</p>

          <div className="space-y-2 mb-4">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Calendar size={16} className="text-indigo-600" />
              <span>{event.date || 'Date TBD'}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Clock size={16} className="text-indigo-600" />
              <span>{event.time || 'Time TBD'}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <MapPin size={16} className="text-indigo-600" />
              <span className="line-clamp-1">{event.location || 'Location TBD'}</span>
            </div>
            {event.participants !== undefined && (
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Users size={16} className="text-indigo-600" />
                <span>{event.participants}/{event.maxParticipants || '∞'} registered</span>
              </div>
            )}
          </div>

          {event.prize && (
            <div className="mb-4 p-3 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl border border-yellow-200">
              <div className="flex items-center gap-2">
                <Trophy size={18} className="text-yellow-600" />
                <span className="font-bold text-gray-900">Prize: {event.prize}</span>
              </div>
            </div>
          )}

          {event.tags && event.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {event.tags.slice(0, 3).map((tag, idx) => (
                <span key={idx} className="px-3 py-1 bg-indigo-50 text-indigo-700 rounded-lg text-xs font-medium">
                  {tag}
                </span>
              ))}
            </div>
          )}

          <div className="flex gap-2">
            <Link 
              to={`/events/${event._id}`}
              className="flex-1 px-4 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all flex items-center justify-center gap-2"
            >
              View Details
              <ChevronRight size={18} />
            </Link>
            <Link 
              to={`/events/${event._id}`}
              className="px-4 py-2.5 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-all flex items-center justify-center"
            >
              <ExternalLink size={18} />
            </Link>
          </div>

          {event.registrationDeadline && (
            <p className="text-xs text-gray-500 mt-3 text-center">
              Registration closes: {event.registrationDeadline}
            </p>
          )}
        </div>
      </div>
    );
  };

  const filteredEvents = events;
  const featuredEvents = filteredEvents.filter(e => e.featured);
  const regularEvents = filteredEvents.filter(e => !e.featured);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Back Button */}
        <button
          onClick={() => navigate('/')}
          className="mb-6 flex items-center gap-2 text-gray-700 hover:text-indigo-600 transition"
        >
          <ArrowLeft size={18} />
          <span className="font-medium">Back to Home</span>
        </button>

        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3">
                Discover Events
              </h1>
              <p className="text-xl text-gray-600">
                Join hackathons, workshops, and competitions from top universities
                {totalCount > 0 && ` • ${totalCount} events available`}
              </p>
            </div>
            <button 
              onClick={() => navigate('/events/create')}
              className="mt-4 md:mt-0 inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold hover:from-purple-700 hover:to-pink-700 transition-all transform hover:scale-105 shadow-lg"
            >
              <CalendarPlus size={20} />
              Create Event
            </button>
          </div>
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
              Showing {filteredEvents.length} events
            </p>
          </div>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="text-center">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-indigo-600 mx-auto mb-4"></div>
              <div className="text-indigo-600 font-semibold text-lg">Loading events...</div>
            </div>
          </div>
        ) : (
          <>
            {/* Featured Events */}
            {featuredEvents.length > 0 && (
              <div className="mb-12">
                <div className="flex items-center gap-2 mb-6">
                  <Zap className="text-yellow-500" size={24} />
                  <h2 className="text-2xl font-bold text-gray-900">Featured Events</h2>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {featuredEvents.map(event => (
                    <EventCard key={event._id} event={event} featured />
                  ))}
                </div>
              </div>
            )}

            {/* All Events */}
            {regularEvents.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">All Events</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {regularEvents.map(event => (
                    <EventCard key={event._id} event={event} />
                  ))}
                </div>
              </div>
            )}

            {/* No Results */}
            {filteredEvents.length === 0 && !loading && (
              <div className="text-center py-12">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Calendar size={40} className="text-gray-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">No events found</h3>
                <p className="text-gray-600">Try adjusting your filters or search query</p>
              </div>
            )}

            {/* Pagination */}
            {totalCount > 12 && (
              <div className="flex justify-center items-center gap-4 mt-8">
                <button
                  onClick={() => setPage(Math.max(1, page - 1))}
                  disabled={page === 1}
                  className="px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>
                <span className="text-gray-600">
                  Page {page} of {Math.ceil(totalCount / 12)}
                </span>
                <button
                  onClick={() => setPage(page + 1)}
                  disabled={page >= Math.ceil(totalCount / 12)}
                  className="px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default EventsPage;