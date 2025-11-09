import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search,
  Filter,
  Plus,
  Users,
  Heart,
  Eye,
  Clock,
  ArrowLeft,
} from 'lucide-react';
import { MyContext } from '../App.jsx';
import { getProjects } from '../utils/api.js';

const ProjectsPage = () => {
  const navigate = useNavigate();
  const context = useContext(MyContext);
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [sortBy, setSortBy] = useState('recent');
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  const categories = [
    'all',
    'AI/ML',
    'Web Dev',
    'Mobile Dev',
    'Blockchain',
    'IoT',
    'Research',
    'Design',
    'Data Science',
  ];

  // Fetch projects from backend
  useEffect(() => {
    fetchProjects();
  }, [selectedCategory, selectedStatus, searchQuery, sortBy, page]);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      
      const filters = {
        page: page,
        limit: 12,
      };

      // Add filters only if they're not 'all'
      if (selectedCategory !== 'all') {
        filters.tag = selectedCategory;
      }
      if (selectedStatus !== 'all') {
        filters.status = selectedStatus;
      }
      if (searchQuery.trim()) {
        filters.search = searchQuery.trim();
      }

      const res = await getProjects(filters);
      
      if (res.success && res.data) {
        setProjects(res.data);
        setTotalCount(res.meta?.totalCount || 0);
      } else {
        context.openAlertBox('error', res.message || 'Failed to fetch projects');
      }
    } catch (err) {
      console.error('Error fetching projects:', err);
      context.openAlertBox('error', 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Beginner':
        return 'bg-green-100 text-green-700';
      case 'Intermediate':
        return 'bg-yellow-100 text-yellow-700';
      case 'Advanced':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Hiring':
        return 'bg-green-100 text-green-700';
      case 'In Progress':
        return 'bg-blue-100 text-blue-700';
      case 'Completed':
        return 'bg-gray-100 text-gray-700';
      case 'Idea':
        return 'bg-purple-100 text-purple-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getTimeAgo = (dateString) => {
    if (!dateString) return 'Unknown';
    const date = new Date(dateString);
    const now = new Date();
    const diffInMs = now - date;
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
    
    if (diffInDays === 0) return 'Today';
    if (diffInDays === 1) return 'Yesterday';
    if (diffInDays < 7) return `${diffInDays} days ago`;
    if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} weeks ago`;
    if (diffInDays < 365) return `${Math.floor(diffInDays / 30)} months ago`;
    return `${Math.floor(diffInDays / 365)} years ago`;
  };

  const handleProjectClick = (projectId) => {
    navigate(`/projects/${projectId}`);
  };

  const handleCreateProject = () => {
    navigate('/projects/create');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-indigo-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">

        {/* Back to Home Button */}
        <div className="mb-6">
          <button
            onClick={() => navigate('/')}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl shadow-sm hover:bg-indigo-50 hover:border-indigo-300 transition-all text-gray-700 font-medium"
          >
            <ArrowLeft size={18} />
            Back to Home
          </button>
        </div>

        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">Discover Projects</h1>
              <p className="text-gray-600">
                Find and join exciting collaborative projects 
                {totalCount > 0 && ` • ${totalCount} projects available`}
              </p>
            </div>
            <button 
              onClick={handleCreateProject}
              className="mt-4 md:mt-0 inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all transform hover:scale-105 shadow-lg"
            >
              <Plus size={20} />
              Create Project
            </button>
          </div>

          {/* Filters */}
          <div className="bg-white p-4 rounded-2xl shadow-md border border-gray-100 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center gap-3 flex-1">
              <div className="relative w-full md:w-80">
                <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
                <input
                  type="text"
                  placeholder="Search projects..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>
              <div className="relative">
                <Filter className="absolute left-3 top-2.5 text-gray-400" size={18} />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="pl-9 pr-8 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              >
                <option value="all">All Status</option>
                <option value="Hiring">Hiring</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
                <option value="Idea">Idea</option>
              </select>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              >
                <option value="recent">Most Recent</option>
                <option value="popular">Most Popular</option>
                <option value="trending">Trending</option>
              </select>
            </div>
          </div>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="text-center">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-indigo-600 mx-auto mb-4"></div>
              <div className="text-indigo-600 font-semibold text-lg">Loading projects...</div>
            </div>
          </div>
        ) : (
          <>
            {/* Project Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project) => (
                <div
                  key={project._id}
                  onClick={() => handleProjectClick(project._id)}
                  className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all border border-gray-100 overflow-hidden cursor-pointer transform hover:scale-105"
                >
                  <div className="p-5">
                    <div className="flex items-center justify-between mb-2">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}
                      >
                        {project.status}
                      </span>
                      {project.tags && project.tags.length > 0 && (
                        <span className="px-3 py-1 rounded-full text-xs font-medium bg-indigo-100 text-indigo-700">
                          {project.tags[0]}
                        </span>
                      )}
                    </div>

                    <h2 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-1">
                      {project.title}
                    </h2>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                      {project.description}
                    </p>

                    {project.required_skills && project.required_skills.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.required_skills.slice(0, 4).map((skill, idx) => (
                          <span
                            key={idx}
                            className="px-2.5 py-1 bg-indigo-50 text-indigo-700 text-xs rounded-lg font-medium"
                          >
                            {skill}
                          </span>
                        ))}
                        {project.required_skills.length > 4 && (
                          <span className="px-2.5 py-1 bg-gray-100 text-gray-600 text-xs rounded-lg font-medium">
                            +{project.required_skills.length - 4}
                          </span>
                        )}
                      </div>
                    )}

                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <Users size={15} /> {project.member_count || 0}
                      </div>
                      <div className="flex items-center gap-1">
                        <Heart size={15} /> {project.upvote_count || 0}
                      </div>
                      <div className="flex items-center gap-1">
                        <Eye size={15} /> {project.views || 0}
                      </div>
                    </div>

                    <div className="mt-4 border-t pt-3 text-sm text-gray-500 flex items-center justify-between">
                      <div>
                        <span className="font-medium text-gray-700">
                          {project.owner_id?.name || 'Unknown'}
                        </span>
                        {project.owner_id?.college && (
                          <> • {project.owner_id.college}</>
                        )}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock size={14} /> {getTimeAgo(project.created_at)}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* No Results */}
            {projects.length === 0 && !loading && (
              <div className="text-center py-20">
                <div className="text-6xl mb-4">🔍</div>
                <p className="text-gray-500 text-lg mb-2">No projects found</p>
                <p className="text-gray-400 text-sm">Try adjusting your search or filters</p>
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

export default ProjectsPage;