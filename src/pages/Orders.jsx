import { useEffect, useState } from 'react';
import orderService from '../services/orderService';
import '../styles/List.css';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const response = await orderService.getAll();
        setOrders(response?.data || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleStatusChange = async (id, newStatus) => {
    try {
      await orderService.updateStatus(id, newStatus);
      setOrders(
        orders.map((order) =>
          order.id === id ? { ...order, status: newStatus } : order
        )
      );
    } catch (err) {
      setError(err.message);
    }
  };

  const filteredOrders = orders.filter(
    (order) =>
      order.id?.toString().includes(filter) ||
      order.customerName?.toLowerCase().includes(filter.toLowerCase())
  );

  if (loading)
    return <div className="list-container">Loading...</div>;
  if (error)
    return <div className="list-container error">{error}</div>;

  return (
    <div className="list-container">
      <div className="list-header">
        <h1>Orders Management</h1>
      </div>

      <div className="list-filter">
        <input
          type="search"
          placeholder="Search orders..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
      </div>

      <table className="data-table">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Customer</th>
            <th>Total</th>
            <th>Status</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredOrders.length > 0 ? (
            filteredOrders.map((order) => (
              <tr key={order.id}>
                <td>#{order.id}</td>
                <td>{order.customerName}</td>
                <td>${order.total?.toFixed(2) || 0}</td>
                <td>
                  <select
                    value={order.status}
                    onChange={(e) => handleStatusChange(order.id, e.target.value)}
                    className="status-select"
                  >
                    <option value="pending">Pending</option>
                    <option value="processing">Processing</option>
                    <option value="shipped">Shipped</option>
                    <option value="delivered">Delivered</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </td>
                <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                <td className="actions">
                  <a href={`/orders/${order.id}`} className="btn btn-sm btn-info">
                    View
                  </a>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="empty">
                No orders found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Orders;
