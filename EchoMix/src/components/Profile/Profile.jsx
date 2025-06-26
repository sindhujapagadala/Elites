import React, { useState, useEffect } from 'react';
import { useUser } from '../../UserContext/UserContext';
import './Profile.css';
import { useNavigate } from 'react-router';

const Profile = () => {
  const { user } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/');
    }
  }, [user, navigate]);

  const imageId = user?.imgId;
  const profilePicSrc = imageId
    ? `http://localhost:8080/user/image/${imageId}`
    : 'https://avatar.iran.liara.run/public/boy?username=Ash';

  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: user?.userName || '',
    bio: 'Music lover. Frontend enthusiast. Developer at heart.',
    genre: 'Pop, Lo-fi, Indie',
    image: profilePicSrc,
    preferences: ['Lo-fi', 'Indie', 'K-Pop'],
  });

  const listeningHistory = [
    { title: 'Blinding Lights', artist: 'The Weeknd' },
    { title: 'Snowfall', artist: 'Oneheart' },
    { title: 'Until I Found You', artist: 'Stephen Sanchez' },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({ ...prev, [name]: value }));
  };

  const handleToggleEdit = () => {
    setIsEditing((prev) => !prev);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileData((prev) => ({ ...prev, image: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <header className="profile-header">
        <div className="header-title">EchoMix</div>
      </header>

      <div className="profile-container">
        <div className="profile-card">
          <div className="image-wrapper">
            <img className="profile-image" src={profileData.image} alt="Profile" />
            {isEditing && (
              <label className="upload-btn">
                Change
                <input type="file" onChange={handleImageChange} accept="image/*" hidden />
              </label>
            )}
          </div>

          {isEditing ? (
            <>
              <input name="name" value={profileData.name} onChange={handleChange} className="profile-input" />
              <textarea name="bio" value={profileData.bio} onChange={handleChange} className="profile-textarea" />
              <input name="genre" value={profileData.genre} onChange={handleChange} className="profile-input" />
            </>
          ) : (
            <>
              <h2 className="profile-name">{profileData.name}</h2>
              <p className="profile-bio">{profileData.bio}</p>
              <p className="profile-genre">🎧 {profileData.genre}</p>
            </>
          )}

          <button onClick={handleToggleEdit} className="profile-button">
            {isEditing ? 'Save Changes' : 'Edit Profile'}
          </button>

          <div className="preferences-section">
            <h3 className="section-title">Music Preferences</h3>
            <div className="tags">
              {profileData.preferences.map((tag, idx) => (
                <span className="tag" key={idx}>{tag}</span>
              ))}
            </div>
          </div>

          <div className="history-section">
            <h3 className="section-title">Recently Played</h3>
            <div className="history-list">
              {listeningHistory.map((track, idx) => (
                <div className="track-card" key={idx}>
                  <div className="track-icon">🎵</div>
                  <div className="track-info">
                    <span className="track-title">{track.title}</span>
                    <span className="track-artist"> — {track.artist}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </>
  );
};

export default Profile;
