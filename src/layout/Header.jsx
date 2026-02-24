import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import '../styles/Header.css';

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="admin-header">
      <div className="header-container">
        <div className="header-left">
          <h1 className="logo">E-Commerce Admin</h1>
        </div>

        <div className="header-right">
          <div className="user-menu">
            <button
              className="user-profile-btn"
              onClick={() => setShowDropdown(!showDropdown)}
            >
              <span className="avatar">{user?.name?.charAt(0).toUpperCase()}</span>
              <span className="user-name">{user?.name}</span>
            </button>

            {showDropdown && (
              <div className="dropdown-menu">
                <a href="/profile">Profile</a>
                <a href="/settings">Settings</a>
                <button onClick={handleLogout} className="logout-btn">
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
