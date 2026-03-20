import { useEffect, useState, useCallback } from 'react';
import categoryService from '../services/categoryService';
import '../styles/List.css';
import '../styles/ProductModal.css';

const EMPTY_FORM = { name: '', description: '', status: 'active' };

const CategoryModal = ({ category, onClose, onSaved }) => {
  const isEdit = !!category?.id || !!category?._id;
  const [form, setForm] = useState(
    isEdit
      ? { name: category.name, description: category.description || '', status: category.status || 'active' }
      : EMPTY_FORM
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      if (isEdit) {
        await categoryService.update(category._id || category.id, form);
      } else {
        await categoryService.create(form);
      }
      onSaved();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <h2>{isEdit ? 'Edit Category' : 'Add Category'}</h2>
        {error && <p className="modal-error">{error}</p>}
        <form onSubmit={handleSubmit} className="modal-form">
          <label>
            Name
            <input name="name" value={form.name} onChange={handleChange} required />
          </label>
          <label>
            Description
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={3}
              style={{ resize: 'vertical' }}
            />
          </label>
          <label>
            Status
            <select name="status" value={form.status} onChange={handleChange}>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </label>
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

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('');
  const [modal, setModal] = useState(null); // null | 'create' | category object

  const fetchCategories = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await categoryService.getAll();
      console.log("Fetched categories:", res?.data);
      setCategories(res?.data?.categories || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchCategories(); }, [fetchCategories]);

  const [deleteError, setDeleteError] = useState(null);

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this category?')) return;
    setDeleteError(null);
    try {
      await categoryService.delete(id);
      setCategories((prev) => prev.filter((c) => (c._id || c.id) !== id));
    } catch (err) {
      setDeleteError(err.message);
    }
  };

  const handleSaved = () => {
    setModal(null);
    fetchCategories();
  };

  const filtered = categories.filter((c) =>
    c.name?.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="list-container">
      <div className="list-header">
        <h1>Categories</h1>
        <button className="btn btn-primary" onClick={() => setModal('create')}>+ Add Category</button>
      </div>

      <div className="list-filter">
        <input
          type="search"
          placeholder="Search categories..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
      </div>

      {error && <p className="modal-error" style={{ marginBottom: '1rem' }}>{error}</p>}
      {deleteError && <p className="modal-error" style={{ marginBottom: '1rem' }}>{deleteError}</p>}

      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="data-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Description</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length > 0 ? filtered.map((cat, i) => {
              const id = cat._id || cat.id;
              return (
                <tr key={id}>
                  <td>{i + 1}</td>
                  <td>{cat.name}</td>
                  <td>{cat.description || '—'}</td>
                  <td>
                    <span className={`badge badge-${cat.status === 'active' ? 'success' : 'danger'}`}>
                      {cat.status}
                    </span>
                  </td>
                  <td className="actions">
                    <button className="btn btn-sm btn-info" onClick={() => setModal(cat)}>Edit</button>
                    <button className="btn btn-sm btn-danger" onClick={() => handleDelete(id)}>Delete</button>
                  </td>
                </tr>
              );
            }) : (
              <tr><td colSpan="5" className="empty">No categories found</td></tr>
            )}
          </tbody>
        </table>
      )}

      {modal && (
        <CategoryModal
          category={modal === 'create' ? null : modal}
          onClose={() => setModal(null)}
          onSaved={handleSaved}
        />
      )}
    </div>
  );
};

export default Categories;
