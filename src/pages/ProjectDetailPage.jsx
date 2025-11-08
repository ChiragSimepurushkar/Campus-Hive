import React, { useState } from 'react';
import { ArrowLeft, Heart, Share2, Users, Eye, Clock, MessageCircle, CheckCircle, AlertCircle, Target } from 'lucide-react';

const ProjectDetailPage = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isLiked, setIsLiked] = useState(false);
  
  const project = {
    title: 'AI-Powered Study Assistant',
    description: 'Building an intelligent chatbot to help students with their coursework and study schedules. This project aims to leverage modern AI technologies to create a personalized learning companion that understands student needs and provides contextual help.',
    fullDescription: 'Our AI-Powered Study Assistant is designed to revolutionize how students approach their studies. Using advanced natural language processing and machine learning algorithms, the assistant can understand complex queries, provide relevant resources, and even predict when students might need help based on their study patterns. The system will integrate with popular learning management systems and offer features like automated scheduling, progress tracking, and personalized study recommendations.',
    status: 'Open',
    category: 'AI/ML',
    difficulty: 'Intermediate',
    skills: ['Python', 'TensorFlow', 'NLP', 'Flask', 'React'],
    members: [
      { name: 'Sarah Johnson', role: 'Team Lead', avatar: 'SJ', college: 'MIT', skills: ['Python', 'ML'] },
      { name: 'Mike Chen', role: 'ML Engineer', avatar: 'MC', college: 'Stanford', skills: ['TensorFlow', 'NLP'] },
      { name: 'Emma Davis', role: 'Backend Dev', avatar: 'ED', college: 'Berkeley', skills: ['Flask', 'APIs'] }
    ],
    maxMembers: 5,
    likes: 24,
    views: 156,
    createdAt: '2 weeks ago',
    deadline: 'March 15, 2025',
    college: 'MIT',
    author: 'Sarah Johnson'
  };

  const milestones = [
    { 
      title: 'Initial Planning & Research', 
      status: 'completed', 
      date: 'Completed 1 week ago',
      description: 'Project scope defined, tech stack selected, and team roles assigned'
    },
    { 
      title: 'Data Collection & Preprocessing', 
      status: 'in-progress', 
      date: 'In Progress',
      description: 'Gathering training data and preparing datasets for model training'
    },
    { 
      title: 'Model Development', 
      status: 'upcoming', 
      date: 'Starting Feb 1',
      description: 'Building and training the core NLP model'
    },
    { 
      title: 'Frontend Integration', 
      status: 'upcoming', 
      date: 'Starting Feb 15',
      description: 'Developing the user interface and API integration'
    },
    { 
      title: 'Testing & Deployment', 
      status: 'upcoming', 
      date: 'Starting Mar 1',
      description: 'Beta testing with real users and final deployment'
    }
  ];

  const requirements = [
    'Experience with machine learning frameworks (TensorFlow/PyTorch)',
    'Strong Python programming skills',
    'Understanding of NLP concepts and techniques',
    'Passion for education technology',
    'Good communication and teamwork abilities',
    'Ability to commit 10-15 hours per week'
  ];

  const discussions = [
    {
      author: 'Sarah Johnson',
      avatar: 'SJ',
      time: '2 hours ago',
      message: 'Hey team! Just uploaded the initial dataset to our shared drive. Please review and let me know if you have any questions.',
      replies: 2
    },
    {
      author: 'Mike Chen',
      avatar: 'MC',
      time: '5 hours ago',
      message: 'Found a great research paper on conversational AI. Think we should incorporate some of these techniques. Link in the resources channel.',
      replies: 1
    }
  ];

  const getStatusIcon = (status) => {
    switch(status) {
      case 'completed': return <CheckCircle className="text-green-600" size={20} />;
      case 'in-progress': return <AlertCircle className="text-yellow-600" size={20} />;
      default: return <Clock className="text-gray-400" size={20} />;
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'completed': return 'border-green-500';
      case 'in-progress': return 'border-yellow-500';
      default: return 'border-gray-300';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-indigo-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Back Button */}
        <button className="mb-6 flex items-center gap-2 text-indigo-600 hover:text-indigo-700 font-semibold transition-colors">
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
                      <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        project.status === 'Open' 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-gray-100 text-gray-700'
                      }`}>
                        {project.status}
                      </span>
                      <span className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm font-semibold">
                        {project.category}
                      </span>
                      <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm font-semibold">
                        {project.difficulty}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => setIsLiked(!isLiked)}
                      className={`p-3 rounded-xl transition-all ${
                        isLiked 
                          ? 'bg-pink-100 text-pink-600' 
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      <Heart size={24} fill={isLiked ? 'currentColor' : 'none'} />
                    </button>
                    <button className="p-3 bg-gray-100 text-gray-600 hover:bg-gray-200 rounded-xl transition-all">
                      <Share2 size={24} />
                    </button>
                  </div>
                </div>

                {/* Stats */}
                <div className="flex items-center gap-6 text-sm text-gray-600">
                  <span className="flex items-center gap-2">
                    <Eye size={16} />
                    {project.views} views
                  </span>
                  <span className="flex items-center gap-2">
                    <Heart size={16} />
                    {project.likes} likes
                  </span>
                  <span className="flex items-center gap-2">
                    <Clock size={16} />
                    Created {project.createdAt}
                  </span>
                  <span className="flex items-center gap-2">
                    <Target size={16} />
                    Due: {project.deadline}
                  </span>
                </div>
              </div>

              {/* Tabs */}
              <div className="border-b border-gray-200">
                <div className="flex px-8">
                  {['overview', 'discussion', 'milestones', 'members'].map(tab => (
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
                      <p className="text-gray-700 leading-relaxed mb-6">{project.fullDescription}</p>
                    </div>

                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-3">Required Skills</h3>
                      <div className="flex flex-wrap gap-2">
                        {project.skills.map((skill, idx) => (
                          <span key={idx} className="px-4 py-2 bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-700 rounded-full font-medium">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-3">What We're Looking For</h3>
                      <ul className="space-y-3">
                        {requirements.map((req, idx) => (
                          <li key={idx} className="flex items-start gap-3 text-gray-700">
                            <CheckCircle className="text-green-600 flex-shrink-0 mt-0.5" size={20} />
                            <span>{req}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-6">
                      <h3 className="text-lg font-bold text-gray-900 mb-2">Project Goals</h3>
                      <p className="text-gray-700">
                        Create a functional AI assistant that can help students with scheduling, study planning, and resource discovery. 
                        The final product should be ready for beta testing with real students by March 2025.
                      </p>
                    </div>
                  </div>
                )}

                {activeTab === 'discussion' && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-2xl font-bold text-gray-900">Team Discussion</h2>
                      <button className="px-4 py-2 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 transition-all">
                        New Message
                      </button>
                    </div>

                    {discussions.map((discussion, idx) => (
                      <div key={idx} className="bg-gray-50 rounded-xl p-6">
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                            {discussion.avatar}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                              <div>
                                <div className="font-bold text-gray-900">{discussion.author}</div>
                                <div className="text-sm text-gray-600">{discussion.time}</div>
                              </div>
                            </div>
                            <p className="text-gray-700 mb-3">{discussion.message}</p>
                            <button className="flex items-center gap-2 text-sm text-indigo-600 hover:text-indigo-700 font-semibold">
                              <MessageCircle size={16} />
                              {discussion.replies} replies
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}

                    <div className="text-center py-8 text-gray-500">
                      <p>Join the project to participate in discussions</p>
                    </div>
                  </div>
                )}

                {activeTab === 'milestones' && (
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Project Milestones</h2>
                    <div className="space-y-4">
                      {milestones.map((milestone, idx) => (
                        <div key={idx} className={`border-l-4 ${getStatusColor(milestone.status)} pl-6 py-4`}>
                          <div className="flex items-start gap-3 mb-2">
                            {getStatusIcon(milestone.status)}
                            <div className="flex-1">
                              <h4 className="font-bold text-gray-900 mb-1">{milestone.title}</h4>
                              <p className="text-sm text-gray-600 mb-2">{milestone.description}</p>
                              <p className="text-sm text-gray-500">{milestone.date}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'members' && (
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Team Members</h2>
                    <div className="space-y-4">
                      {project.members.map((member, idx) => (
                        <div key={idx} className="bg-gray-50 rounded-xl p-6 flex items-start gap-4">
                          <div className="w-16 h-16 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center text-white font-bold text-xl flex-shrink-0">
                            {member.avatar}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-start justify-between mb-2">
                              <div>
                                <h3 className="font-bold text-gray-900 text-lg">{member.name}</h3>
                                <p className="text-indigo-600 font-semibold">{member.role}</p>
                                <p className="text-sm text-gray-600">{member.college}</p>
                              </div>
                              <button className="px-4 py-2 bg-indigo-100 text-indigo-600 rounded-lg font-semibold hover:bg-indigo-200 transition-all">
                                View Profile
                              </button>
                            </div>
                            <div className="flex flex-wrap gap-2 mt-3">
                              {member.skills.map((skill, skillIdx) => (
                                <span key={skillIdx} className="px-3 py-1 bg-white text-gray-700 rounded-full text-sm font-medium">
                                  {skill}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      ))}
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
                    {project.members.length}/{project.maxMembers}
                  </span>
                </div>
                <p className="text-gray-600 mb-4">
                  {project.maxMembers - project.members.length} spots remaining
                </p>
                <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                  <div 
                    className="bg-gradient-to-r from-indigo-600 to-purple-600 h-2 rounded-full"
                    style={`{width: ${(project.members.length / project.maxMembers) * 100}% }`}
                  />
                </div>
              </div>
              <button className="w-full py-3 px-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all transform hover:scale-105 shadow-lg mb-3">
                Request to Join
              </button>
              <button className="w-full py-3 px-4 border-2 border-gray-200 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-all">
                Save Project
              </button>
            </div>

            {/* Project Info */}
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h3 className="font-bold text-gray-900 mb-4">Project Info</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Created</span>
                  <span className="font-semibold text-gray-900">{project.createdAt}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Deadline</span>
                  <span className="font-semibold text-gray-900">{project.deadline}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Views</span>
                  <span className="font-semibold text-gray-900">{project.views}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Likes</span>
                  <span className="font-semibold text-gray-900">{project.likes}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">College</span>
                  <span className="font-semibold text-gray-900">{project.college}</span>
                </div>
              </div>
            </div>

            {/* Project Owner */}
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h3 className="font-bold text-gray-900 mb-4">Project Owner</h3>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                  {project.author.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <div className="font-bold text-gray-900">{project.author}</div>
                  <div className="text-sm text-gray-600">{project.college}</div>
                </div>
              </div>
              <button className="w-full mt-4 py-2 px-4 border-2 border-gray-200 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-all">
                View Profile
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailPage;