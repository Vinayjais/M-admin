import { useEffect, useState } from 'react';
import userService from '../services/userService';
import '../styles/List.css';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const response = await userService.getAll();
        setUsers(response?.data || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure?')) {
      try {
        await userService.delete(id);
        setUsers(users.filter((u) => u.id !== id));
      } catch (err) {
        setError(err.message);
      }
    }
  };

  const filteredUsers = users.filter(
    (user) =>
      user.name?.toLowerCase().includes(filter.toLowerCase()) ||
      user.email?.toLowerCase().includes(filter.toLowerCase())
  );

  if (loading)
    return <div className="list-container">Loading...</div>;
  if (error)
    return <div className="list-container error">{error}</div>;

  return (
    <div className="list-container">
      <div className="list-header">
        <h1>Users Management</h1>
        <a href="/users/new" className="btn btn-primary">
          Add User
        </a>
      </div>

      <div className="list-filter">
        <input
          type="search"
          placeholder="Search users..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
      </div>

      <table className="data-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user) => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  <span className={`badge badge-${user.role}`}>{user.role}</span>
                </td>
                <td>
                  <span
                    className={`badge badge-${user.status === 'active' ? 'success' : 'danger'}`}
                  >
                    {user.status}
                  </span>
                </td>
                <td className="actions">
                  <a href={`/users/${user.id}`} className="btn btn-sm btn-info">
                    Edit
                  </a>
                  <button
                    onClick={() => handleDelete(user.id)}
                    className="btn btn-sm btn-danger"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="empty">
                No users found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
