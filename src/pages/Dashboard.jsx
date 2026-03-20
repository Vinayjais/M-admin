import { useEffect, useState } from 'react';
import dashboardService from '../services/dashboardService';
import '../styles/Dashboard.css';

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        // const response = await dashboardService.getStats();
        // setStats(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading)
    return <div className="dashboard">Loading...</div>;
  if (error)
    return <div className="dashboard error">{error}</div>;

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>

      <div className="stats-grid">
        <div className="stat-card">
          <h3>Total Orders</h3>
          <p className="stat-value">{stats?.totalOrders || 0}</p>
          <span className="stat-change">+12% from last month</span>
        </div>

        <div className="stat-card">
          <h3>Total Revenue</h3>
          <p className="stat-value">${(stats?.totalRevenue || 0).toFixed(2)}</p>
          <span className="stat-change">+8% from last month</span>
        </div>

        <div className="stat-card">
          <h3>Total Products</h3>
          <p className="stat-value">{stats?.totalProducts || 0}</p>
          <span className="stat-change">+5% from last month</span>
        </div>

        <div className="stat-card">
          <h3>Total Users</h3>
          <p className="stat-value">{stats?.totalUsers || 0}</p>
          <span className="stat-change">+15% from last month</span>
        </div>
      </div>

      <div className="dashboard-section">
        <h2>Recent Orders</h2>
        <p className="placeholder">Recent orders data will be displayed here</p>
      </div>

      <div className="dashboard-section">
        <h2>Top Products</h2>
        <p className="placeholder">Top products data will be displayed here</p>
      </div>
    </div>
  );
};

export default Dashboard;
