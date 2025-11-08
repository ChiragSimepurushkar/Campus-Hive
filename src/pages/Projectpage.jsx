import React, { useState } from 'react';
import { Search, Filter, Plus, Users, Heart, Eye, Clock, TrendingUp, Briefcase } from 'lucide-react';

const ProjectsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [sortBy, setSortBy] = useState('recent');
  const [viewMode, setViewMode] = useState('grid'); // grid or list

  const categories = [
    'all',
    'AI/ML',
    'Web Dev',
    'Mobile Dev',
    'Blockchain',
    'IoT',
    'Research',
    'Design',
    'Data Science'
  ];

  const projects = [
    {
      id: 1,
      title: 'AI-Powered Study Assistant',
      description: 'Building an intelligent chatbot to help students with their coursework and study schedules using natural language processing.',
      status: 'Open',
      category: 'AI/ML',
      skills: ['Python', 'TensorFlow', 'NLP', 'Flask'],
      members: 3,
      maxMembers: 5,
      likes: 24,
      views: 156,
      createdAt: '2 days ago',
      author: 'Sarah Johnson',
      college: 'MIT',
      difficulty: 'Intermediate'
    },
    {
      id: 2,
      title: 'Campus Event Management App',
      description: 'A mobile app to discover and manage campus events, clubs, and activities with real-time notifications.',
      status: 'Open',
      category: 'Mobile Dev',
      skills: ['React Native', 'Node.js', 'MongoDB', 'Firebase'],
      members: 2,
      maxMembers: 4,
      likes: 18,
      views: 89,
      createdAt: '5 days ago',
      author: 'Mike Chen',
      college: 'Stanford',
      difficulty: 'Advanced'
    },
    {
      id: 3,
      title: 'Sustainable Campus Initiative',
      description: 'Research project focusing on reducing carbon footprint and promoting sustainability through data analysis.',
      status: 'Full',
      category: 'Research',
      skills: ['Data Analysis', 'Research', 'Sustainability', 'Python'],
      members: 4,
      maxMembers: 4,
      likes: 32,
      views: 203,
      createdAt: '1 week ago',
      author: 'Emma Davis',
      college: 'Berkeley',
      difficulty: 'Beginner'
    },
    {
      id: 4,
      title: 'Blockchain Voting System',
      description: 'Secure and transparent voting system for student elections using blockchain technology and smart contracts.',
      status: 'Open',
      category: 'Blockchain',
      skills: ['Solidity', 'Web3.js', 'React', 'Ethereum'],
      members: 1,
      maxMembers: 3,
      likes: 41,
      views: 178,
      createdAt: '3 days ago',
      author: 'Alex Kumar',
      college: 'Harvard',
      difficulty: 'Advanced'
    },
    {
      id: 5,
      title: 'Mental Health Chatbot',
      description: 'AI chatbot providing mental health support and resources for students with empathetic conversation.',
      status: 'Open',
      category: 'AI/ML',
      skills: ['Python', 'NLP', 'Psychology', 'UI/UX'],
      members: 2,
      maxMembers: 4,
      likes: 56,
      views: 234,
      createdAt: '4 days ago',
      author: 'Lisa Wang',
      college: 'Yale',
      difficulty: 'Intermediate'
    },
    {
      id: 6,
      title: 'Smart IoT Campus System',
      description: 'IoT solution for automating classroom lighting, temperature control, and resource management.',
      status: 'Open',
      category: 'IoT',
      skills: ['Arduino', 'Raspberry Pi', 'C++', 'Sensors'],
      members: 3,
      maxMembers: 5,
      likes: 19,
      views: 145,
      createdAt: '1 week ago',
      author: 'David Brown',
      college: 'Georgia Tech',
      difficulty: 'Intermediate'
    }
  ];

  const filteredProjects = projects.filter(p => {
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         p.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || p.category === selectedCategory;
    const matchesStatus = selectedStatus === 'all' || p.status === selectedStatus;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const getDifficultyColor = (difficulty) => {
    switch(difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-700';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-700';
      case 'Advanced': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-indigo-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">Discover Projects</h1>
              <p className="text-gray-600">Find and join exciting collaborative projects</p>
            </div>
            <button className="mt-4 md:mt-0 inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all transform hover:scale-105 shadow-lg">
              <Plus size={20} />
              Create Project
            </button>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-white rounded-xl p-4 shadow-md">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-indigo-100 rounded-lg">
                  <Briefcase className="text-indigo-600" size={20} />
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">{filteredProjects.length}</div>
                  <div className="text-xs text-gray-600">Available Projects</div>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-md">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Users className="text-green-600" size={20} />
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">{filteredProjects.filter(p => p.status === 'Open').length}</div>
                  <div className="text-xs text-gray-600">Open to Join</div>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-md">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <TrendingUp className="text-purple-600" size={20} />
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">34</div>
                  <div className="text-xs text-gray-600">Trending</div>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-md">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-pink-100 rounded-lg">
                  <Clock className="text-pink-600" size={20} />
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">12</div>
                  <div className="text-xs text-gray-600">New Today</div>
                </div>
              </div>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="grid md:grid-cols-12 gap-4">
              {/* Search */}
              <div className="md:col-span-5">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="text"
                    placeholder="Search projects by title or description..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all outline-none"
                  />
                </div>
              </div>

              {/* Category Filter */}
              <div className="md:col-span-3">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all outline-none appearance-none bg-white"
                >
                  {categories.map(cat => (
                    <option key={cat} value={cat}>
                      {cat === 'all' ? 'All Categories' : cat}
                    </option>
                  ))}
                </select>
              </div>

              {/* Status Filter */}
              <div className="md:col-span-2">
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all outline-none appearance-none bg-white"
                >
                  <option value="all">All Status</option>
                  <option value="Open">Open</option>
                  <option value="Full">Full</option>
                </select>
              </div>

              {/* Sort */}
              <div className="md:col-span-2">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all outline-none appearance-none bg-white"
                >
                  <option value="recent">Most Recent</option>
                  <option value="popular">Most Popular</option>
                  <option value="members">Most Members</option>
                </select>
              </div>
            </div>

            {/* Active Filters */}
            {(selectedCategory !== 'all' || selectedStatus !== 'all' || searchQuery) && (
              <div className="mt-4 flex flex-wrap gap-2">
                <span className="text-sm text-gray-600">Active filters:</span>
                {selectedCategory !== 'all' && (
                  <span className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium flex items-center gap-1">
                    {selectedCategory}
                    <button onClick={() => setSelectedCategory('all')} className="hover:text-indigo-900">×</button>
                  </span>
                )}
                {selectedStatus !== 'all' && (
                  <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium flex items-center gap-1">
                    {selectedStatus}
                    <button onClick={() => setSelectedStatus('all')} className="hover:text-green-900">×</button>
                  </span>
                )}
                {searchQuery && (
                  <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium flex items-center gap-1">
                    "{searchQuery}"
                    <button onClick={() => setSearchQuery('')} className="hover:text-purple-900">×</button>
                  </span>
                )}
                <button 
                  onClick={() => {
                    setSelectedCategory('all');
                    setSelectedStatus('all');
                    setSearchQuery('');
                  }}
                  className="text-sm text-indigo-600 hover:text-indigo-700 font-semibold"
                >
                  Clear all
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map(project => (
            <div 
              key={project.id} 
              className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-1 overflow-hidden group cursor-pointer"
            >
              {/* Project Header */}
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-sm text-gray-600 line-clamp-2 mb-3">
                      {project.description}
                    </p>
                  </div>
                </div>

                {/* Badges */}
                <div className="flex flex-wrap gap-2 mb-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    project.status === 'Open' 
                      ? 'bg-green-100 text-green-700' 
                      : 'bg-gray-100 text-gray-700'
                  }`}>
                    {project.status}
                  </span>
                  <span className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-xs font-semibold">
                    {project.category}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getDifficultyColor(project.difficulty)}`}>
                    {project.difficulty}
                  </span>
                </div>

                {/* Skills */}
                <div className="flex flex-wrap gap-2">
                  {project.skills.slice(0, 3).map((skill, idx) => (
                    <span key={idx} className="px-2 py-1 bg-gray-100 text-gray-700 rounded-md text-xs font-medium">
                      {skill}
                    </span>
                  ))}
                  {project.skills.length > 3 && (
                    <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-md text-xs font-medium">
                      +{project.skills.length - 3} more
                    </span>
                  )}
                </div>
              </div>

              {/* Project Footer */}
              <div className="px-6 py-4 bg-gray-50">
                <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1">
                      <Users size={16} />
                      {project.members}/{project.maxMembers}
                    </span>
                    <span className="flex items-center gap-1">
                      <Heart size={16} />
                      {project.likes}
                    </span>
                    <span className="flex items-center gap-1">
                      <Eye size={16} />
                      {project.views}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-xs text-gray-500">
                    <div className="font-semibold text-gray-700">{project.author}</div>
                    <div>{project.college} • {project.createdAt}</div>
                  </div>
                  <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-all text-sm">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="text-gray-400" size={40} />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">No projects found</h3>
            <p className="text-gray-600 mb-6">Try adjusting your filters or search query</p>
            <button 
              onClick={() => {
                setSelectedCategory('all');
                setSelectedStatus('all');
                setSearchQuery('');
              }}
              className="px-6 py-3 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 transition-all"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectsPage;