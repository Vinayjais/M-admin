import { Link } from 'react-router-dom';
import '../styles/Error.css';

const Unauthorized = () => {
  return (
    <div className="error-container">
      <div className="error-content">
        <h1 className="error-code">403</h1>
        <h2>Access Denied</h2>
        <p>You don't have permission to access this resource.</p>
        <Link to="/dashboard" className="error-link">
          Back to Dashboard
        </Link>
      </div>
    </div>
  );
};

export default Unauthorized;
