import { Link } from 'react-router-dom';
import '../styles/Error.css';

const NotFound = () => {
  return (
    <div className="error-container">
      <div className="error-content">
        <h1 className="error-code">404</h1>
        <h2>Page Not Found</h2>
        <p>The page you're looking for doesn't exist.</p>
        <Link to="/dashboard" className="error-link">
          Back to Dashboard
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
