import { useEffect, useState, useCallback } from 'react';
import productService from '../services/productService';
import categoryService from '../services/categoryService';
import '../styles/List.css';
import '../styles/ProductModal.css';

const EMPTY_FORM = { name: '', price: '', stock: '', categoryId: '', status: 'active', image: null };

const ProductModal = ({ product, onClose, onSaved, categories }) => {
  const isEdit = !!product?.id || !!product?._id;
  const [form, setForm] = useState(
    isEdit
      ? { name: product.name, price: product.price, stock: product.stock, categoryId: product.categoryId || product.category?._id || '', status: product.status || 'active', image: null }
      : EMPTY_FORM
  );
  const [preview, setPreview] = useState(product?.image || null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      const file = files[0];
      setForm((f) => ({ ...f, image: file }));
      setPreview(file ? URL.createObjectURL(file) : null);
    } else {
      setForm((f) => ({ ...f, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      if (isEdit) {
        const { image, ...rest } = form;
        await productService.update(product.id, rest);
      } else {
        await productService.create(form);
      }
      onSaved();
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <h2>{isEdit ? 'Edit Product' : 'Add Product'}</h2>
        {error && <p className="modal-error">{error}</p>}
        <form onSubmit={handleSubmit} className="modal-form">
          <label>Name
            <input name="name" value={form.name} onChange={handleChange} required />
          </label>
          <div className="modal-row">
            <label>Price
              <input name="price" type="number" min="0" step="0.01" value={form.price} onChange={handleChange} required />
            </label>
            <label>Stock
              <input name="stock" type="number" min="0" value={form.stock} onChange={handleChange} required />
            </label>
          </div>
          <label>Category
            <select name="categoryId" value={form.categoryId} onChange={handleChange} required>
              <option value="">-- Select Category --</option>
              {categories.map((cat) => (
                <option key={cat._id || cat.id} value={cat._id || cat.id}>{cat.name}</option>
              ))}
            </select>
          </label>
          <label>Status
            <select name="status" value={form.status} onChange={handleChange}>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </label>
          {!isEdit && (
            <label>Image
              <input name="image" type="file" accept="image/*" onChange={handleChange} />
              {preview && <img src={preview} alt="preview" className="img-preview" />}
            </label>
          )}
          <div className="modal-actions">
            <button type="button" className="btn" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'Saving...' : 'Save'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const Products = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');
  const [modal, setModal] = useState(null);

  const fetchCategories = useCallback(async () => {
    try {
      const res = await categoryService.getAll();
      setCategories(res?.data?.categories || []);
    } catch (err) {
      console.error("Error fetching categories:", err);
      setError(err.response?.data?.message || err.message);
    }
  }, []);

  useEffect(() => { fetchCategories(); }, [fetchCategories]);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await productService.getAll();
      setProducts(res?.data?.products || []);
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchProducts(); }, [fetchProducts]);

  // Debounced API search
  useEffect(() => {
    if (!search.trim()) { fetchProducts(); return; }
    const timer = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await productService.search(search.trim());
        setProducts(res?.data?.products || []);
      } catch {
        setProducts([]);
      } finally {
        setLoading(false);
      }
    }, 400);
    return () => clearTimeout(timer);
  }, [search, fetchProducts]);

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this product?')) return;
    try {
      await productService.delete(id);
      setProducts((prev) => prev.filter((p) => p._id !== id && p.id !== id));
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    }
  };

  const handleSaved = () => {
    setModal(null);
    fetchProducts();
  };

  return (
    <div className="list-container">
      <div className="list-header">
        <h1>Products</h1>
        <button className="btn btn-primary" onClick={() => setModal('create')}>+ Add Product</button>
      </div>

      <div className="list-filter">
        <input
          type="search"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {error && <p className="modal-error" style={{ marginBottom: '1rem' }}>{error}</p>}

      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="data-table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.length > 0 ? products.map((p) => {
              const id = p._id || p.id;
              return (
                <tr key={id}>
                  <td>
                    {p?.image
                      ? <img src={p?.image} alt={p.name} className="table-thumb" />
                      : <span className="no-img">—</span>}
                  </td>
                  <td>{p.name}</td>
                  <td>{p.category?.name || '—'}</td>
                  <td>Rs. {parseFloat(p.price || 0).toFixed(2)}</td>
                  <td>{p.stock ?? 0}</td>
                  <td>
                    <span className={`badge badge-${p.status === 'active' ? 'success' : 'danger'}`}>
                      {p?.status}
                    </span>
                  </td>
                  <td className="actions">
                    <button className="btn btn-sm btn-info" onClick={() => setModal(p)}>Edit</button>
                    <button className="btn btn-sm btn-danger" onClick={() => handleDelete(id)}>Delete</button>
                  </td>
                </tr>
              );
            }) : (
              <tr><td colSpan="7" className="empty">No products found</td></tr>
            )}
          </tbody>
        </table>
      )}

      {modal && (
        <ProductModal
          product={modal === 'create' ? null : modal}
          onClose={() => setModal(null)}
          onSaved={handleSaved}
          categories={categories}
        />
      )}
    </div>
  );
};

export default Products;
