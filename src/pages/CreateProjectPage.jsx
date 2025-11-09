import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus, X } from 'lucide-react';
import { MyContext } from '../App.jsx';
import { createProject } from '../utils/api.js';

const CreateProjectPage = () => {
  const navigate = useNavigate();
  const context = useContext(MyContext);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'Idea',
    tags: [],
    required_skills: []
  });

  const [currentTag, setCurrentTag] = useState('');
  const [currentSkill, setCurrentSkill] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const statusOptions = ['Idea', 'Hiring', 'In Progress', 'Completed'];
  
  const suggestedTags = [
    'AI/ML', 'Web Dev', 'Mobile Dev', 'Blockchain', 
    'IoT', 'Research', 'Design', 'Data Science',
    'Cloud Computing', 'Cybersecurity'
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const addTag = (tag) => {
    if (tag && !formData.tags.includes(tag)) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, tag]
      }));
      setCurrentTag('');
    }
  };

  const removeTag = (tagToRemove) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const addSkill = () => {
    if (currentSkill && !formData.required_skills.includes(currentSkill)) {
      setFormData(prev => ({
        ...prev,
        required_skills: [...prev.required_skills, currentSkill]
      }));
      setCurrentSkill('');
    }
  };

  const removeSkill = (skillToRemove) => {
    setFormData(prev => ({
      ...prev,
      required_skills: prev.required_skills.filter(skill => skill !== skillToRemove)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!formData.title.trim()) {
      context.openAlertBox('error', 'Please enter a project title');
      return;
    }

    if (!formData.description.trim()) {
      context.openAlertBox('error', 'Please enter a project description');
      return;
    }

    if (formData.required_skills.length === 0) {
      context.openAlertBox('error', 'Please add at least one required skill');
      return;
    }

    try {
      setIsSubmitting(true);
      const res = await createProject(formData);

      if (res.success) {
        context.openAlertBox('success', 'Project created successfully!');
        navigate(`/projects/${res.data._id}`);
      } else {
        context.openAlertBox('error', res.message || 'Failed to create project');
      }
    } catch (err) {
      console.error('Error creating project:', err);
      context.openAlertBox('error', 'An unexpected error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-indigo-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => navigate('/projects')}
          className="mb-6 flex items-center gap-2 text-indigo-600 hover:text-indigo-700 font-semibold transition-colors"
        >
          <ArrowLeft size={20} />
          Back to Projects
        </button>

        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Create New Project</h1>
          <p className="text-gray-600">
            Share your project idea and find collaborators to bring it to life
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Project Title *
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="Enter your project title..."
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all"
              maxLength={100}
            />
            <p className="text-sm text-gray-500 mt-1">
              {formData.title.length}/100 characters
            </p>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Project Description *
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Describe your project, its goals, and what makes it unique..."
              rows="6"
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all"
              maxLength={1000}
            />
            <p className="text-sm text-gray-500 mt-1">
              {formData.description.length}/1000 characters
            </p>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Project Status *
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all"
            >
              {statusOptions.map(status => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Project Tags
            </label>
            
            <div className="mb-3">
              <p className="text-xs text-gray-600 mb-2">Quick add:</p>
              <div className="flex flex-wrap gap-2">
                {suggestedTags.map(tag => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => addTag(tag)}
                    disabled={formData.tags.includes(tag)}
                    className={`px-3 py-1 rounded-full text-sm font-medium transition-all ${
                      formData.tags.includes(tag)
                        ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                        : 'bg-indigo-100 text-indigo-700 hover:bg-indigo-200'
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-2 mb-3">
              <input
                type="text"
                value={currentTag}
                onChange={(e) => setCurrentTag(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag(currentTag))}
                placeholder="Add custom tag..."
                className="flex-1 px-4 py-2 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none"
              />
              <button
                type="button"
                onClick={() => addTag(currentTag)}
                className="px-4 py-2 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 transition-all flex items-center gap-2"
              >
                <Plus size={16} />
                Add
              </button>
            </div>

            {formData.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {formData.tags.map(tag => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium flex items-center gap-2"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => removeTag(tag)}
                      className="hover:text-indigo-900"
                    >
                      <X size={14} />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className="mb-8">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Required Skills *
            </label>
            
            <div className="flex gap-2 mb-3">
              <input
                type="text"
                value={currentSkill}
                onChange={(e) => setCurrentSkill(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill())}
                placeholder="e.g., React, Python, UI/UX Design..."
                className="flex-1 px-4 py-2 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none"
              />
              <button
                type="button"
                onClick={addSkill}
                className="px-4 py-2 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 transition-all flex items-center gap-2"
              >
                <Plus size={16} />
                Add
              </button>
            </div>

            {formData.required_skills.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {formData.required_skills.map(skill => (
                  <span
                    key={skill}
                    className="px-3 py-1 bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-700 rounded-full text-sm font-medium flex items-center gap-2"
                  >
                    {skill}
                    <button
                      type="button"
                      onClick={() => removeSkill(skill)}
                      className="hover:text-indigo-900"
                    >
                      <X size={14} />
                    </button>
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-500">No skills added yet</p>
            )}
          </div>

          <div className="flex gap-4">
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="flex-1 py-3 px-6 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-bold hover:from-indigo-700 hover:to-purple-700 transition-all transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isSubmitting ? 'Creating Project...' : 'Create Project'}
            </button>
            <button
              onClick={() => navigate('/projects')}
              className="px-6 py-3 border-2 border-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-all"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateProjectPage;