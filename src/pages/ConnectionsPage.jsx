import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Users, Briefcase, UserMinus, Eye, MessageCircle, Star, TrendingUp } from 'lucide-react';

function ConnectionsPage() {
  // Mock data - replace with real API calls
  const [joinedTeams] = useState([
    {
      id: 1,
      title: 'AI Study Assistant',
      description: 'Building an AI-powered study companion',
      members: 5,
      progress: 65,
      image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400',
      tags: ['AI', 'React']
    },
    {
      id: 2,
      title: 'E-commerce Platform',
      description: 'Modern shopping experience',
      members: 8,
      progress: 80,
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400',
      tags: ['MERN', 'Payment']
    }
  ]);

  const [followedUsers, setFollowedUsers] = useState([
    {
      id: 1,
      name: 'Sarah Johnson',
      major: 'Computer Science',
      college: 'MIT',
      avatar: 'SJ',
      skills: ['React', 'Python', 'ML'],
      projects: 12,
      followers: 234
    },
    {
      id: 2,
      name: 'Mike Chen',
      major: 'Software Engineering',
      college: 'Stanford',
      avatar: 'MC',
      skills: ['Node.js', 'MongoDB', 'AWS'],
      projects: 8,
      followers: 189
    },
    {
      id: 3,
      name: 'Emma Davis',
      major: 'Data Science',
      college: 'Berkeley',
      avatar: 'ED',
      skills: ['Python', 'TensorFlow', 'SQL'],
      projects: 15,
      followers: 312
    }
  ]);

  const handleUnfollow = (userId) => {
    setFollowedUsers(followedUsers.filter(user => user.id !== userId));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">My Network</h1>
          <p className="text-gray-600">Manage your connections and collaborations</p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Connections</p>
                <h3 className="text-3xl font-bold text-gray-900">{followedUsers.length}</h3>
              </div>
              <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center">
                <Users className="text-indigo-600" size={24} />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Active Teams</p>
                <h3 className="text-3xl font-bold text-gray-900">{joinedTeams.length}</h3>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                <Briefcase className="text-purple-600" size={24} />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Network Growth</p>
                <h3 className="text-3xl font-bold text-green-600">+12%</h3>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <TrendingUp className="text-green-600" size={24} />
              </div>
            </div>
          </div>
        </div>

        {/* Joined Teams Section */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <Briefcase className="text-indigo-600" size={28} />
              Joined Teams & Projects
            </h2>
            <Link 
              to="/projects" 
              className="text-indigo-600 hover:text-indigo-700 font-semibold text-sm"
            >
              Browse More →
            </Link>
          </div>

          {joinedTeams.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {joinedTeams.map(project => (
                <div 
                  key={project.id}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-all group"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-white font-bold text-lg mb-1">{project.title}</h3>
                    </div>
                  </div>
                  
                  <div className="p-5">
                    <p className="text-gray-600 text-sm mb-4">{project.description}</p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tags.map((tag, idx) => (
                        <span 
                          key={idx}
                          className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-xs font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="mb-4">
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-gray-600">Progress</span>
                        <span className="font-bold text-indigo-600">{project.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-indigo-600 to-purple-600 h-2 rounded-full transition-all"
                          style={{ width: `${project.progress}%` }}
                        />
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-gray-600 text-sm">
                        <Users size={16} />
                        <span>{project.members} members</span>
                      </div>
                      <Link
                        to={`/projects/${project.id}`}
                        className="px-4 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 font-semibold text-sm transition-all"
                      >
                        View Project
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-2xl p-12 text-center border border-gray-200">
              <Briefcase className="mx-auto mb-4 text-gray-400" size={48} />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No Teams Yet</h3>
              <p className="text-gray-600 mb-6">Start collaborating by joining a project!</p>
              <Link 
                to="/projects"
                className="inline-block px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all"
              >
                Browse Projects
              </Link>
            </div>
          )}
        </section>

        {/* Followed Users Section */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <Users className="text-purple-600" size={28} />
              Followed Users
            </h2>
            <Link 
              to="/discover" 
              className="text-purple-600 hover:text-purple-700 font-semibold text-sm"
            >
              Discover More →
            </Link>
          </div>

          {followedUsers.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {followedUsers.map(user => (
                <div 
                  key={user.id}
                  className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all"
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center text-white font-bold text-xl flex-shrink-0">
                      {user.avatar}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-900 text-lg mb-1">{user.name}</h3>
                      <p className="text-sm text-gray-600">{user.major}</p>
                      <p className="text-xs text-gray-500">{user.college}</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {user.skills.slice(0, 3).map((skill, idx) => (
                      <span 
                        key={idx}
                        className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-4 mb-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <Briefcase size={16} />
                      <span>{user.projects} projects</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star size={16} />
                      <span>{user.followers} followers</span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Link
                      to={`/profile/${user.id}`}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 font-semibold text-sm transition-all"
                    >
                      <Eye size={16} />
                      Profile
                    </Link>
                    <Link
                      to={`/messages/${user.id}`}
                      className="px-4 py-2 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-all"
                    >
                      <MessageCircle size={16} />
                    </Link>
                    <button
                      onClick={() => handleUnfollow(user.id)}
                      className="px-4 py-2 bg-red-50 text-red-600 rounded-xl hover:bg-red-100 transition-all"
                    >
                      <UserMinus size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-2xl p-12 text-center border border-gray-200">
              <Users className="mx-auto mb-4 text-gray-400" size={48} />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No Connections Yet</h3>
              <p className="text-gray-600 mb-6">Start building your network!</p>
              <Link 
                to="/discover"
                className="inline-block px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold hover:from-purple-700 hover:to-pink-700 transition-all"
              >
                Discover People
              </Link>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

export default ConnectionsPage;