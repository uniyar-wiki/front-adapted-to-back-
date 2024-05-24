import React, { useState, useEffect } from 'react';
import Profile from './Profile';
import EditProfile from './EditProfile';
import './UserProfile.css';

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);

  const handleUpdate = (updatedUser) => {
    setUser(updatedUser);
    setEditMode(false);
  };
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('Token not found');
        }

        const response = await fetch('http://localhost:5000/api/Auth/profileInfo', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({ token })
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setUser(data);
      } catch (error) {
        console.error('Fetch error:', error);
      }
    };

    fetchUserProfile();
  }, []);

  if (!user) {
    return <div>Loading...</div>;
  }
  return (
    <div className="user-profile-container">
      <div className="profile-container">
        <label className="toggle-switch">
          <input type="checkbox" checked={editMode} onChange={() => setEditMode(!editMode)} />
          <span className="slider">
            <span className="slider-text">{editMode ? "Edit Profile" : "Show Profile"}</span>
          </span>
        </label>
        {editMode ? (
          <EditProfile user={user} onUpdate={handleUpdate} />
        ) : (
          <Profile user={user} />
        )}
      </div>
    </div>
  );
};

export default UserProfile;