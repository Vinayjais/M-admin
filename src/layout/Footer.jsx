import '../styles/Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="admin-footer">
      <div className="footer-container">
        <p>&copy; {currentYear} E-Commerce Admin. All rights reserved.</p>
        <div className="footer-links">
          <a href="#privacy">Privacy Policy</a>
          <a href="#terms">Terms of Service</a>
          <a href="#contact">Contact</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
