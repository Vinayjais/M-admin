import { useEffect, useState } from 'react';
import productService from '../services/productService';
import '../styles/List.css';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await productService.getAll();
        setProducts(response?.data || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure?')) {
      try {
        await productService.delete(id);
        setProducts(products.filter((p) => p.id !== id));
      } catch (err) {
        setError(err.message);
      }
    }
  };

  const filteredProducts = products.filter(
    (product) =>
      product.name?.toLowerCase().includes(filter.toLowerCase()) ||
      product.sku?.toLowerCase().includes(filter.toLowerCase())
  );

  if (loading)
    return <div className="list-container">Loading...</div>;
  if (error)
    return <div className="list-container error">{error}</div>;

  return (
    <div className="list-container">
      <div className="list-header">
        <h1>Products Management</h1>
        <a href="/products/new" className="btn btn-primary">
          Add Product
        </a>
      </div>

      <div className="list-filter">
        <input
          type="search"
          placeholder="Search products..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
      </div>

      <table className="data-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>SKU</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <tr key={product.id}>
                <td>{product.name}</td>
                <td>{product.sku}</td>
                <td>${product.price?.toFixed(2) || 0}</td>
                <td>{product.stock || 0}</td>
                <td>
                  <span
                    className={`badge badge-${product.status === 'active' ? 'success' : 'danger'}`}
                  >
                    {product.status}
                  </span>
                </td>
                <td className="actions">
                  <a href={`/products/${product.id}`} className="btn btn-sm btn-info">
                    Edit
                  </a>
                  <button
                    onClick={() => handleDelete(product.id)}
                    className="btn btn-sm btn-danger"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="empty">
                No products found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Products;
