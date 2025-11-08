// /client/src/components/Profile.jsx

import React, { useState, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth.jsx'; 
import Input from './input.jsx';
import Button from './button.jsx';
import LoadingSpinner from './loadingspinner.jsx';

function Profile() {
  const { currentUser, loadingUser, updateUserProfile } = useAuth();
  
  const [formData, setFormData] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState('');

  // Sync internal state with context state
  useEffect(() => { 
    if (currentUser) {
        setFormData(currentUser);
    }
  }, [currentUser]);

  if (loadingUser) return <LoadingSpinner text="Loading profile details..." />;
  if (!currentUser) return <div className="alert alert-warning">No user data available. Please log in.</div>;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleBioChange = (e) => {
    setFormData(prev => ({ ...prev, bio: e.target.value }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    setSaveError('');
    try {
      const updateData = {
          name: formData.name,
          college: formData.college,
          bio: formData.bio,
          // Note: Add logic here to handle skills array conversion from a comma-separated string if needed
          skills: formData.skills, 
      };
      await updateUserProfile(updateData);
      setIsEditing(false);
    } catch (error) {
      setSaveError(error.message || "Failed to save profile changes.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="profile-component card p-4 shadow-lg">
      <h2 className="mb-4">{isEditing ? 'Edit Profile' : 'Your Profile Information'}</h2>
      
      <form onSubmit={handleSave}>
        <Input 
          label="Full Name" 
          name="name" 
          value={formData.name || ''} 
          onChange={handleChange} 
          disabled={!isEditing} 
        />
        {/* ... (Other inputs: email, college, bio) ... */}
        
        <div className="mb-3">
          <label className="form-label">Bio</label>
          <textarea 
            className="form-control" 
            name="bio"
            value={formData.bio || ''}
            onChange={handleBioChange}
            disabled={!isEditing}
            rows="3"
          />
        </div>

        {saveError && <div className="alert alert-danger">{saveError}</div>}
        
        <div className="d-flex gap-3 mt-4">
          {isEditing ? (
            <>
              <Button type="submit" className="btn-primary" disabled={isSaving}>
                {isSaving ? 'Saving...' : 'Save Changes'}
              </Button>
              <Button type="button" className="btn-outline-secondary" onClick={() => { setIsEditing(false); setFormData(currentUser); }}>
                Cancel
              </Button>
            </>
          ) : (
            <Button type="button" className="btn-primary" onClick={() => setIsEditing(true)}>
              Edit Profile
            </Button>
          )}
        </div>
      </form>
    </div>
  );
}

export default Profile;