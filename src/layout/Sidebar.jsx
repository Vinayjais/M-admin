import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import '../styles/Sidebar.css';

const Sidebar = () => {
  const { user, hasPermission } = useAuth();
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const menuItems = [
    {
      label: 'Dashboard',
      path: '/dashboard',
      icon: '📊',
      permission: 'view_dashboard',
    },
    {
      label: 'Users',
      path: '/users',
      icon: '👥',
      permission: 'manage_users',
    },
    {
      label: 'Products',
      path: '/products',
      icon: '📦',
      permission: 'manage_products',
    },
    {
      label: 'Orders',
      path: '/orders',
      icon: '🛒',
      permission: 'manage_orders',
    },
    {
      label: 'Reports',
      path: '/reports',
      icon: '📈',
      permission: 'view_reports',
    },
    {
      label: 'Settings',
      path: '/settings',
      icon: '⚙️',
      permission: 'manage_settings',
    },
  ];

  const filteredMenuItems = menuItems.filter(
    (item) => !item.permission || hasPermission(item.permission) || user?.role === 'admin'
  );

  return (
    <aside className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-header">
        <button
          className="toggle-btn"
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          ☰
        </button>
      </div>

      <nav className="sidebar-nav">
        <ul>
          {filteredMenuItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={`nav-link ${location.pathname === item.path ? 'active' : ''}`}
              >
                <span className="icon">{item.icon}</span>
                {!isCollapsed && <span className="label">{item.label}</span>}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
