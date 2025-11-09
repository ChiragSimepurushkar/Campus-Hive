import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Heart, Share2, Users, Eye, Clock, MessageCircle, CheckCircle, AlertCircle, Target, Send } from 'lucide-react';
import { MyContext } from '../App.jsx';
import { fetchDataFromApi, postData } from '../utils/api.js';

const ProjectDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const context = useContext(MyContext);

  const [activeTab, setActiveTab] = useState('overview');
  const [loading, setLoading] = useState(true);
  const [project, setProject] = useState(null);
  const [members, setMembers] = useState([]);
  const [comments, setComments] = useState([]);
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [submittingComment, setSubmittingComment] = useState(false);

  // Fetch project data
  useEffect(() => {
    const fetchProjectData = async () => {
      try {
        setLoading(true);
        const res = await fetchDataFromApi(`/api/projects/${id}`);
        
        if (res.success && res.data) {
          setProject(res.data);
        } else {
          context.openAlertBox('error', res.message || 'Failed to fetch project');
          navigate('/projects');
        }
      } catch (err) {
        console.error('Error fetching project:', err);
        context.openAlertBox('error', 'An unexpected error occurred');
        navigate('/projects');
      } finally {
        setLoading(false);
      }
    };

    fetchProjectData();
  }, [id, navigate, context]);

  // Fetch members when tab changes
  useEffect(() => {
    if (activeTab === 'members' && project) {
      fetchMembers();
    }
  }, [activeTab, project]);

  // Fetch comments when tab changes
  useEffect(() => {
    if (activeTab === 'discussion' && project) {
      fetchComments();
    }
  }, [activeTab, project]);

  const fetchMembers = async () => {
    try {
      const res = await fetchDataFromApi(`/api/members/${id}`);
      if (res.success && res.data) {
        setMembers(res.data);
      }
    } catch (err) {
      console.error('Error fetching members:', err);
    }
  };

  const fetchComments = async () => {
    try {
      const res = await fetchDataFromApi(`/api/comments/${id}`);
      if (res.success && res.data) {
        setComments(res.data);
      }
    } catch (err) {
      console.error('Error fetching comments:', err);
    }
  };

  const handleLike = async () => {
    try {
      const res = await postData('/api/interactions/upvote', { project_id: id });
      if (res.success) {
        setIsLiked(res.upvoted);
        setProject({
          ...project,
          upvote_count: res.upvoted ? (project.upvote_count || 0) + 1 : (project.upvote_count || 1) - 1
        });
        context.openAlertBox('success', res.message || 'Like updated');
      }
    } catch (err) {
      console.error('Error toggling like:', err);
      context.openAlertBox('error', 'Failed to update like status');
    }
  };

  const handleBookmark = async () => {
    try {
      const res = await postData('/api/interactions/bookmark', { project_id: id });
      if (res.success) {
        setIsBookmarked(res.bookmarked);
        context.openAlertBox('success', res.message || (res.bookmarked ? 'Added to bookmarks' : 'Removed from bookmarks'));
      }
    } catch (err) {
      console.error('Error toggling bookmark:', err);
      context.openAlertBox('error', 'Failed to update bookmark status');
    }
  };

  const handleJoinRequest = async () => {
    try {
      // Get current user ID from context or localStorage
      const userId = context.user?._id;
      
      if (!userId) {
        context.openAlertBox('error', 'Please login to join projects');
        return;
      }

      const res = await postData('/api/members/add', { 
        project_id: id,
        user_id: userId 
      });
      
      if (res.success) {
        context.openAlertBox('success', res.message || 'Join request sent successfully!');
        // Refresh project data to update member count
        const updatedProject = await fetchDataFromApi(`/api/projects/${id}`);
        if (updatedProject.success) {
          setProject(updatedProject.data);
        }
      } else {
        context.openAlertBox('error', res.message || 'Failed to send join request');
      }
    } catch (err) {
      console.error('Error sending join request:', err);
      context.openAlertBox('error', err.message || 'An unexpected error occurred');
    }
  };

  const handleSubmitComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    try {
      setSubmittingComment(true);
      const res = await postData('/api/comments', { 
        project_id: id, 
        content: newComment.trim() 
      });
      
      if (res.success) {
        setComments([res.data, ...comments]);
        setNewComment('');
        // Update comment count in project
        setProject({
          ...project,
          comment_count: (project.comment_count || 0) + 1
        });
        context.openAlertBox('success', 'Comment posted successfully!');
      } else {
        context.openAlertBox('error', res.message || 'Failed to post comment');
      }
    } catch (err) {
      console.error('Error posting comment:', err);
      context.openAlertBox('error', 'An unexpected error occurred');
    } finally {
      setSubmittingComment(false);
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'Completed': return 'bg-green-100 text-green-700';
      case 'In Progress': return 'bg-yellow-100 text-yellow-700';
      case 'Hiring': return 'bg-blue-100 text-blue-700';
      case 'Idea': return 'bg-purple-100 text-purple-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Unknown';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
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

  // Loading screen
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-50 to-indigo-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <div className="text-indigo-600 font-semibold text-lg">Loading project...</div>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-50 to-indigo-50">
        <div className="text-center">
          <div className="text-6xl mb-4">😔</div>
          <div className="text-red-600 font-semibold text-lg">Project not found</div>
          <button 
            onClick={() => navigate('/projects')}
            className="mt-4 px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            Back to Projects
          </button>
        </div>
      </div>
    );
  }

  const ownerInitials = project.owner_id?.name 
    ? project.owner_id.name.split(' ').map(n => n[0]).join('').toUpperCase() 
    : 'U';

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-indigo-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Back Button */}
        <button 
          onClick={() => navigate(-1)}
          className="mb-6 flex items-center gap-2 text-indigo-600 hover:text-indigo-700 font-semibold transition-colors"
        >
          <ArrowLeft size={20} />
          Back to Projects
        </button>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              {/* Project Header */}
              <div className="p-8 border-b border-gray-100">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <h1 className="text-3xl font-bold text-gray-900 mb-3">{project.title}</h1>
                    <p className="text-gray-600 mb-4">{project.description}</p>
                    <div className="flex flex-wrap gap-2">
                      <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(project.status)}`}>
                        {project.status}
                      </span>
                      {project.tags?.map((tag, idx) => (
                        <span key={idx} className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm font-semibold">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button 
                      onClick={handleLike}
                      className={`p-3 rounded-xl transition-all ${
                        isLiked 
                          ? 'bg-pink-100 text-pink-600' 
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                      title={isLiked ? 'Unlike' : 'Like'}
                    >
                      <Heart size={24} fill={isLiked ? 'currentColor' : 'none'} />
                    </button>
                    <button 
                      onClick={() => {
                        navigator.clipboard.writeText(window.location.href);
                        context.openAlertBox('success', 'Link copied to clipboard!');
                      }}
                      className="p-3 bg-gray-100 text-gray-600 hover:bg-gray-200 rounded-xl transition-all"
                      title="Share"
                    >
                      <Share2 size={24} />
                    </button>
                  </div>
                </div>

                {/* Stats */}
                <div className="flex items-center gap-6 text-sm text-gray-600 flex-wrap">
                  <span className="flex items-center gap-2">
                    <Clock size={16} />
                    Created {getTimeAgo(project.created_at)}
                  </span>
                  <span className="flex items-center gap-2">
                    <Heart size={16} />
                    {project.upvote_count || 0} likes
                  </span>
                  <span className="flex items-center gap-2">
                    <MessageCircle size={16} />
                    {project.comment_count || 0} comments
                  </span>
                  <span className="flex items-center gap-2">
                    <Users size={16} />
                    {project.member_count || 0} members
                  </span>
                </div>
              </div>

              {/* Tabs */}
              <div className="border-b border-gray-200">
                <div className="flex px-8">
                  {['overview', 'discussion', 'members'].map(tab => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`px-6 py-4 font-semibold capitalize transition-all ${
                        activeTab === tab
                          ? 'text-indigo-600 border-b-2 border-indigo-600'
                          : 'text-gray-600 hover:text-gray-900'
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
              </div>

              {/* Tab Content */}
              <div className="p-8">
                {activeTab === 'overview' && (
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900 mb-4">About This Project</h2>
                      <p className="text-gray-700 leading-relaxed mb-6">{project.description}</p>
                    </div>

                    {project.required_skills && project.required_skills.length > 0 && (
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-3">Required Skills</h3>
                        <div className="flex flex-wrap gap-2">
                          {project.required_skills.map((skill, idx) => (
                            <span key={idx} className="px-4 py-2 bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-700 rounded-full font-medium">
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-6">
                      <h3 className="text-lg font-bold text-gray-900 mb-2">Project Status</h3>
                      <div className="space-y-2">
                        <p className="text-gray-700">
                          <span className="font-semibold">Status:</span> {project.status}
                        </p>
                        <p className="text-gray-700">
                          <span className="font-semibold">Team Size:</span> {project.member_count || 0} member{project.member_count !== 1 ? 's' : ''}
                        </p>
                        <p className="text-gray-700">
                          <span className="font-semibold">Created:</span> {formatDate(project.created_at)}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'discussion' && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-2xl font-bold text-gray-900">Team Discussion</h2>
                    </div>

                    {/* Comment Form */}
                    <form onSubmit={handleSubmitComment} className="bg-gray-50 rounded-xl p-6 mb-6">
                      <textarea
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder="Share your thoughts or ask a question..."
                        rows="3"
                        className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none mb-3"
                      />
                      <button
                        type="submit"
                        disabled={submittingComment || !newComment.trim()}
                        className="px-4 py-2 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                      >
                        <Send size={16} />
                        {submittingComment ? 'Posting...' : 'Post Comment'}
                      </button>
                    </form>

                    {/* Comments List */}
                    {comments.length > 0 ? (
                      comments.map((comment, idx) => (
                        <div key={comment._id || idx} className="bg-gray-50 rounded-xl p-6">
                          <div className="flex items-start gap-4">
                            <div className="w-12 h-12 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                              {comment.user_id?.name?.split(' ').map(n => n[0]).join('').toUpperCase() || 'U'}
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-2">
                                <div>
                                  <div className="font-bold text-gray-900">{comment.user_id?.name || 'Unknown User'}</div>
                                  <div className="text-sm text-gray-600">
                                    {getTimeAgo(comment.created_at)}
                                  </div>
                                </div>
                              </div>
                              <p className="text-gray-700">{comment.content}</p>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-8 text-gray-500">
                        <MessageCircle size={48} className="mx-auto mb-4 text-gray-300" />
                        <p>No comments yet. Be the first to share your thoughts!</p>
                      </div>
                    )}
                  </div>
                )}

                {activeTab === 'members' && (
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Team Members</h2>
                    <div className="space-y-4">
                      {members.length > 0 ? (
                        members.map((member, idx) => (
                          <div key={member._id || idx} className="bg-gray-50 rounded-xl p-6 flex items-start gap-4">
                            <div className="w-16 h-16 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center text-white font-bold text-xl flex-shrink-0">
                              {member.user_id?.name?.split(' ').map(n => n[0]).join('').toUpperCase() || 'U'}
                            </div>
                            <div className="flex-1">
                              <div className="flex items-start justify-between mb-2">
                                <div>
                                  <h3 className="font-bold text-gray-900 text-lg">{member.user_id?.name || 'Unknown'}</h3>
                                  <p className="text-indigo-600 font-semibold">{member.role}</p>
                                  <p className="text-sm text-gray-600">{member.user_id?.college || 'College not specified'}</p>
                                </div>
                              </div>
                              {member.user_id?.skills && member.user_id.skills.length > 0 && (
                                <div className="flex flex-wrap gap-2 mt-3">
                                  {member.user_id.skills.slice(0, 5).map((skill, skillIdx) => (
                                    <span key={skillIdx} className="px-3 py-1 bg-white text-gray-700 rounded-full text-sm font-medium">
                                      {skill}
                                    </span>
                                  ))}
                                </div>
                              )}
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="text-center py-8 text-gray-500">
                          <Users size={48} className="mx-auto mb-4 text-gray-300" />
                          <p>No members to display</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Join Card */}
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <div className="text-center mb-6">
                <div className="flex items-center justify-center gap-2 mb-4">
                  <Users className="text-indigo-600" size={24} />
                  <span className="text-2xl font-bold text-gray-900">
                    {project.member_count || 0}
                  </span>
                </div>
                <p className="text-gray-600 mb-4">Team member{project.member_count !== 1 ? 's' : ''}</p>
              </div>
              <button 
                onClick={handleJoinRequest}
                className="w-full py-3 px-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all transform hover:scale-105 shadow-lg mb-3"
              >
                Request to Join
              </button>
              <button 
                onClick={handleBookmark}
                className={`w-full py-3 px-4 border-2 font-semibold rounded-xl transition-all ${
                  isBookmarked 
                    ? 'border-indigo-600 text-indigo-600 bg-indigo-50' 
                    : 'border-gray-200 text-gray-700 hover:bg-gray-50'
                }`}
              >
                {isBookmarked ? '✓ Saved' : 'Save Project'}
              </button>
            </div>

            {/* Project Info */}
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h3 className="font-bold text-gray-900 mb-4">Project Info</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Created</span>
                  <span className="font-semibold text-gray-900">
                    {formatDate(project.created_at)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Status</span>
                  <span className={`font-semibold px-2 py-1 rounded text-xs ${getStatusColor(project.status)}`}>
                    {project.status}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Likes</span>
                  <span className="font-semibold text-gray-900">{project.upvote_count || 0}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Comments</span>
                  <span className="font-semibold text-gray-900">{project.comment_count || 0}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Members</span>
                  <span className="font-semibold text-gray-900">{project.member_count || 0}</span>
                </div>
              </div>
            </div>

            {/* Project Owner */}
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h3 className="font-bold text-gray-900 mb-4">Project Owner</h3>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                  {ownerInitials}
                </div>
                <div>
                  <div className="font-bold text-gray-900">{project.owner_id?.name || 'Unknown'}</div>
                  <div className="text-sm text-gray-600">{project.owner_id?.college_branch || 'N/A'}</div>
                </div>
              </div>
              {project.owner_id?.college && (
                <p className="text-sm text-gray-600 mb-3">
                  <span className="font-semibold">College:</span> {project.owner_id.college}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailPage;