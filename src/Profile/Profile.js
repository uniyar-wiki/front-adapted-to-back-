import React from 'react';

const Profile = ({ user }) => {
  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.replace('/');
  };
  return (
    <div className="profile">
      <img src={user.avatar} alt="Avatar" className="profile-avatar" />
      <div className="profile-info">
        <p>Email: {user.email}</p>
        <p>First Name: {user.first}</p>
        <p>Last Name: {user.last}</p>
        <p>Course Number: {user.courseNum}</p>
        <p>Group: {user.group}</p>
        <button className="profile-button" onClick={handleLogout}>LogOut</button>
      </div>
    </div>
  );
};

export default Profile;