import Header from './Header';
import Sidebar from './Sidebar';
import Footer from './Footer';
import '../styles/AdminLayout.css';

const AdminLayout = ({ children }) => {
  return (
    <div className="admin-layout">
      <Header />
      <div className="layout-container">
        <Sidebar />
        <main className="main-content">
          {children}
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default AdminLayout;
