import useAuth from '../hooks/useAuth';
import '../styles/Profile.css';

const Profile = () => {
  const { user } = useAuth();

  const avatar = user?.name?.charAt(0).toUpperCase();

  return (
    <div className="profile-page">
      <div className="profile-card">
        <div className="profile-avatar">{avatar}</div>
        <h2 className="profile-name">{user?.name}</h2>
        <span className="profile-badge">Admin</span>

        <div className="profile-info">
          <div className="profile-info-row">
            <span className="info-label">Email</span>
            <span className="info-value">{user?.email}</span>
          </div>
          <div className="profile-info-row">
            <span className="info-label">User ID</span>
            <span className="info-value">{user?.id}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
