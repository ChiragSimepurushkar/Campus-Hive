import React, { useState } from 'react';
import { Settings, MapPin, Calendar, Github, Linkedin, Globe, Mail, Edit2, Save, X, Plus, Trash2 } from 'lucide-react';

const ProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: 'John Doe',
    email: 'john.doe@college.edu',
    college: 'Massachusetts Institute of Technology',
    branch: 'Computer Science',
    year: '3rd Year',
    location: 'Boston, MA',
    bio: 'Passionate computer science student with a love for AI/ML and web development. Always excited to collaborate on innovative projects that make a real impact. Looking to connect with like-minded students!',
    skills: ['React', 'Node.js', 'Python', 'Machine Learning', 'UI/UX Design', 'Data Analysis'],
    interests: ['AI/ML', 'Web Development', 'Open Source', 'Hackathons'],
    github: 'johndoe',
    linkedin: 'johndoe',
    portfolio: 'johndoe.dev',
    joinedDate: 'January 2024',
    projects: 5,
    connections: 24,
    contributions: 38
  });

  const [newSkill, setNewSkill] = useState('');

  const projects = [
    {
      id: 1,
      title: 'AI Study Assistant',
      description: 'Building an intelligent chatbot for students',
      role: 'Team Lead',
      status: 'Active',
      tags: ['AI/ML', 'Python', 'NLP'],
      members: 3,
      likes: 24
    },
    {
      id: 2,
      title: 'Campus Event App',
      description: 'Mobile app for campus events and activities',
      role: 'Developer',
      status: 'In Progress',
      tags: ['React Native', 'Firebase'],
      members: 4,
      likes: 18
    },
    {
      id: 3,
      title: 'Blockchain Voting',
      description: 'Secure voting system using blockchain',
      role: 'Contributor',
      status: 'Completed',
      tags: ['Blockchain', 'Web3'],
      members: 3,
      likes: 32
    }
  ];

  const achievements = [
    { title: 'Hackathon Winner', icon: '🏆', date: 'Nov 2024' },
    { title: 'Top Contributor', icon: '⭐', date: 'Oct 2024' },
    { title: 'Project Pioneer', icon: '🚀', date: 'Sep 2024' }
  ];

  const handleSave = () => {
    setIsEditing(false);
    // Save profile logic here
  };

  const handleAddSkill = () => {
    if (newSkill.trim() && !profile.skills.includes(newSkill.trim())) {
      setProfile({
        ...profile,
        skills: [...profile.skills, newSkill.trim()]
      });
      setNewSkill('');
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    setProfile({
      ...profile,
      skills: profile.skills.filter(skill => skill !== skillToRemove)
    });
  };

  return (
    <>
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-indigo-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Profile Header Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8">
          {/* Cover Image */}
          <div className="h-48 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 relative">
            <div className="absolute inset-0 opacity-20" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}></div>
          </div>

          {/* Profile Info */}
          <div className="px-8 pb-8">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between -mt-16 relative">
              <div className="flex flex-col md:flex-row md:items-end gap-6">
                {/* Avatar */}
                <div className="relative">
                  <div className="w-32 h-32 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center text-white text-5xl font-bold border-4 border-white shadow-xl">
                    {profile.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  {isEditing && (
                    <button className="absolute bottom-0 right-0 p-2 bg-white rounded-lg shadow-lg hover:bg-gray-50">
                      <Edit2 size={16} className="text-indigo-600" />
                    </button>
                  )}
                </div>

                {/* Basic Info */}
                <div className="md:mb-4">
                  {isEditing ? (
                    <input
                      type="text"
                      value={profile.name}
                      onChange={(e) => setProfile({...profile, name: e.target.value})}
                      className="text-3xl font-bold text-gray-900 mb-2 border-2 border-gray-200 rounded-lg px-3 py-1"
                    />
                  ) : (
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">{profile.name}</h1>
                  )}
                  <p className="text-indigo-600 font-semibold mb-2">{profile.branch} • {profile.year}</p>
                  <div className="flex flex-wrap gap-3 text-sm text-gray-600">
                    <span className="flex items-center gap-1">
                      <MapPin size={16} />
                      {profile.college}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar size={16} />
                      Joined {profile.joinedDate}
                    </span>
                  </div>
                </div>
              </div>

              {/* Edit Button */}
              <button
                onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                className={`mt-4 md:mt-0 flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all transform hover:scale-105 ${
                  isEditing 
                    ? 'bg-green-600 text-white hover:bg-green-700' 
                    : 'bg-indigo-600 text-white hover:bg-indigo-700'
                }`}
              >
                {isEditing ? (
                  <>
                    <Save size={20} />
                    Save Profile
                  </>
                ) : (
                  <>
                    <Settings size={20} />
                    Edit Profile
                  </>
                )}
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mt-8 p-6 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl">
              <div className="text-center">
                <div className="text-3xl font-bold text-indigo-600">{profile.projects}</div>
                <div className="text-sm text-gray-600 mt-1">Projects</div>
              </div>
              <div className="text-center border-x border-indigo-200">
                <div className="text-3xl font-bold text-purple-600">{profile.connections}</div>
                <div className="text-sm text-gray-600 mt-1">Connections</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-pink-600">{profile.contributions}</div>
                <div className="text-sm text-gray-600 mt-1">Contributions</div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* About Section */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">About</h2>
              {isEditing ? (
                <textarea
                  value={profile.bio}
                  onChange={(e) => setProfile({...profile, bio: e.target.value})}
                  rows="4"
                  className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none"
                />
              ) : (
                <p className="text-gray-700 leading-relaxed">{profile.bio}</p>
              )}
            </div>

            {/* Skills Section */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Skills</h2>
              <div className="flex flex-wrap gap-2 mb-4">
                {profile.skills.map((skill, idx) => (
                  <span 
                    key={idx} 
                    className="px-4 py-2 bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-700 rounded-full font-medium flex items-center gap-2"
                  >
                    {skill}
                    {isEditing && (
                      <button
                        onClick={() => handleRemoveSkill(skill)}
                        className="hover:text-red-600"
                      >
                        <X size={16} />
                      </button>
                    )}
                  </span>
                ))}
              </div>
              {isEditing && (
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleAddSkill()}
                    placeholder="Add a skill..."
                    className="flex-1 px-4 py-2 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none"
                  />
                  <button
                    onClick={handleAddSkill}
                    className="px-4 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 flex items-center gap-2"
                  >
                    <Plus size={20} />
                    Add
                  </button>
                </div>
              )}
            </div>

            {/* Projects Section */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">My Projects</h2>
                <button className="text-indigo-600 hover:text-indigo-700 font-semibold text-sm">
                  View All
                </button>
              </div>
              <div className="space-y-4">
                {projects.map(project => (
                  <div 
                    key={project.id} 
                    className="p-6 border-2 border-gray-100 rounded-xl hover:border-indigo-200 hover:shadow-md transition-all cursor-pointer"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="text-lg font-bold text-gray-900 mb-1">{project.title}</h3>
                        <p className="text-gray-600 text-sm mb-2">{project.description}</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        project.status === 'Active' ? 'bg-green-100 text-green-700' :
                        project.status === 'In Progress' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-gray-100 text-gray-700'
                      }`}>
                        {project.status}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {project.tags.map((tag, idx) => (
                        <span key={idx} className="px-2 py-1 bg-indigo-50 text-indigo-700 rounded-md text-xs font-medium">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-indigo-600 font-semibold">{project.role}</span>
                      <div className="flex items-center gap-4 text-gray-600">
                        <span>{project.members} members</span>
                        <span>❤ {project.likes}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* Contact Info */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Contact</h2>
              <div className="space-y-3">
                <a href={`mailto:${profile.email}`} className="flex items-center gap-3 text-gray-700 hover:text-indigo-600 transition-colors">
                  <Mail size={20} className="text-gray-400" />
                  <span className="text-sm">{profile.email}</span>
                </a>
                {profile.github && (
                  <a href={`https://github.com/${profile.github}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-gray-700 hover:text-indigo-600 transition-colors">
                    <Github size={20} className="text-gray-400" />
                    <span className="text-sm">@{profile.github}</span>
                  </a>
                )}
                {profile.linkedin && (
                  <a href={`https://linkedin.com/in/${profile.linkedin}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-gray-700 hover:text-indigo-600 transition-colors">
                    <Linkedin size={20} className="text-gray-400" />
                    <span className="text-sm">@{profile.linkedin}</span>
                  </a>
                )}
                {profile.portfolio && (
                  <a href={`https://${profile.portfolio}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-gray-700 hover:text-indigo-600 transition-colors">
                    <Globe size={20} className="text-gray-400" />
                    <span className="text-sm">{profile.portfolio}</span>
                  </a>
                )}
              </div>
            </div>

            {/* Interests */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Interests</h2>
              <div className="flex flex-wrap gap-2">
                {profile.interests.map((interest, idx) => (
                  <span key={idx} className="px-3 py-2 bg-purple-100 text-purple-700 rounded-lg text-sm font-medium">
                    {interest}
                  </span>
                ))}
              </div>
            </div>

            {/* Achievements */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Achievements</h2>
              <div className="space-y-4">
                {achievements.map((achievement, idx) => (
                  <div key={idx} className="flex items-center gap-4 p-3 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl">
                    <div className="text-3xl">{achievement.icon}</div>
                    <div>
                      <h4 className="font-semibold text-gray-900">{achievement.title}</h4>
                      <p className="text-sm text-gray-600">{achievement.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default ProfilePage;