import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="main-footer">
      <div className="footer-top">
        <div className="footer-container">
          <div className="footer-brand-section">
            <h2 className="footer-logo">GRAPHURA</h2>
            <p className="footer-tagline">
              Crafting premium digital experiences through innovation and design excellence.
            </p>
            <div className="footer-socials">
              <a href="#" className="social-icon">Instagram</a>
              <a href="#" className="social-icon">Dribbble</a>
              <a href="#" className="social-icon">Twitter</a>
              <a href="#" className="social-icon">LinkedIn</a>
            </div>
          </div>

          <div className="footer-links-grid">
            <div className="footer-column">
              <h4>Solutions</h4>
              <ul>
                <li><a href="#">Web Design</a></li>
                <li><a href="#">App Development</a></li>
                <li><a href="#">Branding</a></li>
                <li><a href="#">UI/UX Design</a></li>
              </ul>
            </div>

            <div className="footer-column">
              <h4>Marketplace</h4>
              <ul>
                <li><a href="#">Featured</a></li>
                <li><a href="#">New Releases</a></li>
                <li><a href="#">Best Sellers</a></li>
                <li><a href="#">Collections</a></li>
              </ul>
            </div>

            <div className="footer-column">
              <h4>Company</h4>
              <ul>
                <li><a href="#">About Us</a></li>
                <li><a href="#">Manifesto</a></li>
                <li><a href="#">Contact</a></li>
                <li><a href="#">Careers</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-container">
          <p className="copyright">© 2026 Graphura Marketplace. All rights reserved.</p>
          <div className="footer-legal">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <a href="#">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
