import React, { useState, useEffect, useContext } from 'react';
import { Settings, MapPin, Calendar, Github, Linkedin, Globe, Mail, Edit2, Save, X, Plus, ArrowLeft } from 'lucide-react';
import { editData, fetchDataFromApi } from '../utils/api.js';
import { MyContext } from '../App.jsx';
import CircularProgress from '@mui/material/CircularProgress';

const ProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [newSkill, setNewSkill] = useState('');
  const context = useContext(MyContext);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    college: '',
    college_branch: '',  // ADD THIS
    graduation_year: '',  // ADD THIS
    bio: '',
    github_url: '',  // ADD THIS
    linkedin_url: '',  // ADD THIS
    portfolio_url: '',  // ADD THIS
    skills: []
  });
  // Fetch user details from backend
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await fetchDataFromApi('/api/user/user-details');
        if (res.success && res.data) {
          setProfile({
          ...res.data,
          github_url: res.data.github_url || '',
          linkedin_url: res.data.linkedin_url || '',
          portfolio_url: res.data.portfolio_url || '',
          bio: res.data.bio || '',
          college_branch: res.data.college_branch || '',
          graduation_year: res.data.graduation_year || ''
        });
        } else {
          context.openAlertBox('error', res.message || 'Failed to fetch profile data');
        }
      } catch (err) {
        console.error('Error fetching profile:', err);
        context.openAlertBox('error', 'An unexpected error occurred');
      } finally {
        setLoading(false);
      }
    };
    fetchUserData();
  }, []);

 const handleSave = async () => {
  try {
    setSaving(true);
    
    if (!profile.name || !profile.email || !profile.college) {
      context.openAlertBox('error', 'Please fill in all required fields.');
      setSaving(false);
      return;
    }

    const payload = {
      name: profile.name,
      email: profile.email,
      college: profile.college,
      college_branch: profile.college_branch,
      graduation_year: profile.graduation_year,
      bio: profile.bio,
      github_url: profile.github_url,
      linkedin_url: profile.linkedin_url,
      portfolio_url: profile.portfolio_url,
      skills: profile.skills
    };

    const res = await editData('/api/user/update-details', payload);

    if (res && res.success) {
      context.openAlertBox('success', 'Profile updated successfully!');
      setProfile(res.user || profile);
      setIsEditing(false);
    } else {
      context.openAlertBox('error', res.message || 'Failed to update profile.');
    }
  } catch (err) {
    console.error('Error saving profile:', err);
    context.openAlertBox('error', 'An unexpected error occurred.');
  } finally {
    setSaving(false);
  }
};

  const handleAddSkill = () => {
    if (newSkill.trim() && !profile.skills.includes(newSkill.trim())) {
      setProfile({
        ...profile,
        skills: [...profile.skills, newSkill.trim()],
      });
      setNewSkill('');
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    setProfile({
      ...profile,
      skills: profile.skills.filter((skill) => skill !== skillToRemove),
    });
  };

  // Loading screen
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-indigo-600 font-semibold text-lg">Loading your profile...</div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-red-600 font-semibold text-lg">Failed to load profile 😔</div>
      </div>
    );
  }

  // Helper for avatar initials
  const initials = profile.name ? profile.name.split(' ').map(n => n[0]).join('').toUpperCase() : 'U';

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-indigo-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => window.history.back()}
          className="inline-flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900 font-medium mb-6 transition-colors"
        >
          <ArrowLeft size={20} />
          Back
        </button>

        {/* Profile Header */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8">
          {/* Cover */}
          <div className="h-48 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 relative">
            <div
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              }}
            ></div>
          </div>

          {/* Profile Info */}
          <div className="px-8 pb-8">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between -mt-16 relative">
              <div className="flex flex-col md:flex-row md:items-end gap-6">
                {/* Avatar */}
                <div className="relative">
                  <div className="w-32 h-32 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center text-white text-5xl font-bold border-4 border-white shadow-xl">
                    {initials}
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
                      value={profile.name || ''}
                      onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                      className="text-3xl font-bold text-gray-900 mb-2 border-2 border-gray-200 rounded-lg px-3 py-1"
                    />
                  ) : (
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">{profile.name}</h1>
                  )}
                  {isEditing ? (
                    <div className="flex gap-2 mb-2">
                      <input
                        type="text"
                        value={profile.college_branch|| ''}
                        onChange={(e) => setProfile({ ...profile, college_branch: e.target.value })}
                        placeholder="Branch/Major"
                        className="text-indigo-600 font-semibold border-2 border-gray-200 rounded-lg px-3 py-1"
                      />
                      <input
                        type="number"
                        value={profile.graduation_year|| ''}
                        onChange={(e) => setProfile({ ...profile, graduation_year: e.target.value })}
                        placeholder="Year"
                        className="text-indigo-600 font-semibold border-2 border-gray-200 rounded-lg px-3 py-1 w-24"
                      />
                    </div>
                  ) : (
                    <p className="text-indigo-600 font-semibold mb-2">
                      {profile.college_branch} • {profile.graduation_year}
                    </p>
                  )}
                  <div className="flex flex-wrap gap-3 text-sm text-gray-600">
                    <span className="flex items-center gap-1">
                      <MapPin size={16} />
                      {profile.college}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar size={16} />
                      Joined {new Date(profile.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>

              {/* Edit Button */}
              <button
                onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
                className={`mt-4 md:mt-0 flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all transform hover:scale-105 ${isEditing
                  ? 'bg-green-600 text-white hover:bg-green-700'
                  : 'bg-indigo-600 text-white hover:bg-indigo-700'
                  }`}
              >
                {isEditing ? (
                  saving ? (
                    <>
                      <CircularProgress size={18} color="inherit" />
                      <span>Saving...</span>
                    </>
                  ) : (
                    <>
                      <Save size={20} />
                      <span>Save Profile</span>
                    </>
                  )
                ) : (
                  <>
                    <Settings size={20} />
                    <span>Edit Profile</span>
                  </>
                )}
              </button>

            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mt-8 p-6 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl">
              <div className="text-center">
                <div className="text-3xl font-bold text-indigo-600">{profile.posted_projects?.length || 0}</div>
                <div className="text-sm text-gray-600 mt-1">Projects</div>
              </div>
              <div className="text-center border-x border-indigo-200">
                <div className="text-3xl font-bold text-purple-600">{profile.joined_teams?.length || 0}</div>
                <div className="text-sm text-gray-600 mt-1">Teams Joined</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-pink-600">{profile.participated_events?.length || 0}</div>
                <div className="text-sm text-gray-600 mt-1">Events</div>
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
                  value={profile.bio|| ''}
                  onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                  rows="4"
                  className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none"
                />
              ) : (
                <p className="text-gray-700 leading-relaxed">{profile.bio || 'No bio added yet.'}</p>
              )}
            </div>

            {/* Skills Section */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Skills</h2>
              <div className="flex flex-wrap gap-2 mb-4">
                {profile.skills?.map((skill, idx) => (
                  <span
                    key={idx}
                    className="px-4 py-2 bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-700 rounded-full font-medium flex items-center gap-2"
                  >
                    {skill}
                    {isEditing && (
                      <button onClick={() => handleRemoveSkill(skill)} className="hover:text-red-600">
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
                    value={newSkill|| ''}
                    onChange={(e) => setNewSkill(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleAddSkill()}
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
                <button className="text-indigo-600 hover:text-indigo-700 font-semibold text-sm">View All</button>
              </div>
              <div className="space-y-4">
                {profile.posted_projects?.length > 0 ? (
                  profile.posted_projects.map((project, idx) => (
                    <div
                      key={project._id || idx}
                      className="p-6 border-2 border-gray-100 rounded-xl hover:border-indigo-200 hover:shadow-md transition-all"
                    >
                      <h3 className="text-lg font-bold text-gray-900 mb-1">{project.title}</h3>
                      <p className="text-gray-600 text-sm mb-2">{project.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {project.tags?.map((tag, i) => (
                          <span
                            key={i}
                            className="px-2 py-1 bg-indigo-50 text-indigo-700 rounded-md text-xs font-medium"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500">No projects yet.</p>
                )}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* Contact Info */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Contact</h2>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Mail size={20} className="text-gray-400" />
                  {isEditing ? (
                    <input
                      type="email"
                      value={profile.email|| ''}
                      onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                      className="flex-1 text-sm border-2 border-gray-200 rounded-lg px-3 py-1"
                    />
                  ) : (
                    <a href={`mailto:${profile.email}`} className="text-sm text-gray-700 hover:text-indigo-600">
                      {profile.email}
                    </a>
                  )}
                </div>

                <div className="flex items-center gap-3">
                  <Github size={20} className="text-gray-400" />
                  {isEditing ? (
                    <input
                      type="text"
                      value={profile.github_url || ''}
                      onChange={(e) => setProfile({ ...profile, github_url: e.target.value })}
                      placeholder="github.com/username"
                      className="flex-1 text-sm border-2 border-gray-200 rounded-lg px-3 py-1"
                    />
                  ) : profile.github_url ? (
                    <a href={`https://github.com/${profile.github_url}`} target="_blank" rel="noopener noreferrer" className="text-sm text-gray-700 hover:text-indigo-600">
                      @{profile.github_url}
                    </a>
                  ) : (
                    <span className="text-sm text-gray-400">Not added</span>
                  )}
                </div>

                <div className="flex items-center gap-3">
                  <Linkedin size={20} className="text-gray-400" />
                  {isEditing ? (
                    <input
                      type="text"
                      value={profile.linkedin_url || ''}
                      onChange={(e) => setProfile({ ...profile, linkedin_url: e.target.value })}
                      placeholder="linkedin.com/in/username"
                      className="flex-1 text-sm border-2 border-gray-200 rounded-lg px-3 py-1"
                    />
                  ) : profile.linkedin_url ? (
                    <a href={`https://linkedin.com/in/${profile.linkedin_url}`} target="_blank" rel="noopener noreferrer" className="text-sm text-gray-700 hover:text-indigo-600">
                      @{profile.linkedin_url}
                    </a>
                  ) : (
                    <span className="text-sm text-gray-400">Not added</span>
                  )}
                </div>

                <div className="flex items-center gap-3">
                  <Globe size={20} className="text-gray-400" />
                  {isEditing ? (
                    <input
                      type="text"
                      value={profile.portfolio_url || ''}
                      onChange={(e) => setProfile({ ...profile, portfolio_url: e.target.value })}
                      placeholder="yourportfolio.com"
                      className="flex-1 text-sm border-2 border-gray-200 rounded-lg px-3 py-1"
                    />
                  ) : profile.portfolio_url ? (
                    <a href={`https://${profile.portfolio_url}`} target="_blank" rel="noopener noreferrer" className="text-sm text-gray-700 hover:text-indigo-600">
                      {profile.portfolio_url}
                    </a>
                  ) : (
                    <span className="text-sm text-gray-400">Not added</span>
                  )}
                </div>
              </div>
            </div>

            {/* Interests */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Interests</h2>
              <div className="flex flex-wrap gap-2">
                {profile.interests?.length > 0 ? (
                  profile.interests.map((interest, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-2 bg-purple-100 text-purple-700 rounded-lg text-sm font-medium"
                    >
                      {interest}
                    </span>
                  ))
                ) : (
                  <p className="text-gray-500 text-sm">No interests added yet.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div >
  );
};

export default ProfilePage;
