
import React, { useState } from 'react';
import { TrendingUp, Users, Calendar, Briefcase, Award, Clock, ArrowRight, Plus } from 'lucide-react';

const Dashboard = () => {
  const [userName] = useState('John Doe');
  
  const stats = [
    { title: 'My Projects', value: '5', icon: Briefcase, color: 'indigo', change: '+2 this month' },
    { title: 'Upcoming Events', value: '3', icon: Calendar, color: 'purple', change: 'Next: Tomorrow' },
    { title: 'Connections', value: '24', icon: Users, color: 'blue', change: '+5 this week' },
    { title: 'Achievements', value: '12', icon: Award, color: 'green', change: 'Top 10% contributor' }
  ];

  const activeProjects = [
    {
      id: 1,
      title: 'AI Study Assistant',
      role: 'Team Lead',
      members: 3,
      progress: 65,
      status: 'Active',
      dueDate: '2 weeks',
      category: 'AI/ML'
    },
    {
      id: 2,
      title: 'Campus Event App',
      role: 'Developer',
      members: 4,
      progress: 40,
      status: 'In Progress',
      dueDate: '1 month',
      category: 'Mobile Dev'
    }
  ];

  const recommendedProjects = [
    {
      id: 1,
      title: 'Blockchain Voting System',
      description: 'Looking for blockchain developers',
      skills: ['Solidity', 'Web3'],
      members: 2,
      maxMembers: 4
    },
    {
      id: 2,
      title: 'Sustainability Research',
      description: 'Environmental data analysis project',
      skills: ['Python', 'Research'],
      members: 3,
      maxMembers: 5
    }
  ];

  const upcomingEvents = [
    {
      id: 1,
      title: 'Tech Talk: Future of AI',
      date: 'Tomorrow',
      time: '6:00 PM',
      attendees: 45
    },
    {
      id: 2,
      title: 'Startup Weekend Hackathon',
      date: 'Dec 20-22',
      time: 'All Day',
      attendees: 120
    }
  ];

  const recentActivity = [
    { type: 'join', text: 'You joined AI Study Assistant project', time: '2 hours ago' },
    { type: 'like', text: 'Sarah liked your project idea', time: '5 hours ago' },
    { type: 'event', text: 'New event: Tech Talk registered', time: '1 day ago' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-indigo-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-4xl font-bold mb-2">Welcome back, {userName}! 👋</h1>
              <p className="text-indigo-100 text-lg">Here's what's happening with your projects today</p>
            </div>
            <button className="mt-4 md:mt-0 inline-flex items-center gap-2 bg-white text-indigo-600 px-6 py-3 rounded-xl font-semibold hover:bg-indigo-50 transition-all transform hover:scale-105">
              <Plus size={20} />
              Create New Project
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 -mt-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, idx) => 
          (
            <>
            <div key={idx} className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all transform hover:scale-105">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-xl bg-${stat.color}-100`}>
                  <stat.icon className={`text-${stat.color}-600} size={24} `}/>
                </div>
                <TrendingUp className="text-green-500" size={20} />
              </div>
              <h3 className="text-gray-600 text-sm font-medium mb-1">{stat.title}</h3>
              <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
              <p className="text-sm text-gray-500">{stat.change}</p>
            </div>
            </>
          )
          )}
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-8">
          {/* Active Projects */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-gray-900">My Active Projects</h2>
              <button className="text-indigo-600 hover:text-indigo-700 font-semibold text-sm flex items-center gap-1">
                View All <ArrowRight size={16} />
              </button>
            </div>

            {activeProjects.map(project => (
              <div key={project.id} className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-bold text-gray-900">{project.title}</h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        project.status === 'Active' 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-yellow-100 text-yellow-700'
                      }`}>
                        {project.status}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span className="flex items-center gap-1">
                        <Users size={16} />
                        {project.members} members
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock size={16} />
                        Due in {project.dueDate}
                      </span>
                      <span className="px-2 py-1 bg-indigo-100 text-indigo-700 rounded-full text-xs font-medium">
                        {project.category}
                      </span>
                    </div>
                  </div>
                  <span className="text-sm font-semibold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">
                    {project.role}
                  </span>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Progress</span>
                    <span className="font-semibold text-gray-900">{project.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-indigo-600 to-purple-600 h-2 rounded-full transition-all"
                      style={`{ width: ${project.progress}% }`}
                    />
                  </div>
                </div>

                <div className="mt-4 flex gap-3">
                  <button className="flex-1 py-2 px-4 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 transition-all">
                    View Project
                  </button>
                  <button className="py-2 px-4 border-2 border-gray-200 rounded-xl font-semibold hover:bg-gray-50 transition-all">
                    Chat
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Upcoming Events */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Upcoming Events</h3>
              <div className="space-y-4">
                {upcomingEvents.map(event => (
                  <div key={event.id} className="p-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl hover:shadow-md transition-all cursor-pointer">
                    <h4 className="font-semibold text-gray-900 mb-2">{event.title}</h4>
                    <div className="space-y-1 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <Calendar size={14} />
                        <span>{event.date} • {event.time}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users size={14} />
                        <span>{event.attendees} attending</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <button className="w-full mt-4 py-2 px-4 border-2 border-indigo-200 text-indigo-600 rounded-xl font-semibold hover:bg-indigo-50 transition-all">
                View All Events
              </button>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Recent Activity</h3>
              <div className="space-y-4">
                {recentActivity.map((activity, idx) => (
                  <div key={idx} className="flex gap-3">
                    <div className={`w-2 h-2 mt-2 rounded-full ${
                      activity.type === 'join' ? 'bg-green-500' :
                      activity.type === 'like' ? 'bg-pink-500' : 'bg-blue-500'
                    }`} />
                    <div>
                      <p className="text-sm text-gray-900">{activity.text}</p>
                      <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Recommended Projects */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Recommended For You</h2>
            <button className="text-indigo-600 hover:text-indigo-700 font-semibold text-sm flex items-center gap-1">
              View All <ArrowRight size={16} />
            </button>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {recommendedProjects.map(project => (
              <div key={project.id} className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{project.title}</h3>
                <p className="text-gray-600 mb-4">{project.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.skills.map((skill, idx) => (
                    <span key={idx} className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium">
                      {skill}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Users size={16} />
                    <span>{project.members}/{project.maxMembers} members</span>
                  </div>
                  <button className="py-2 px-4 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 transition-all">
                    Join Project
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;