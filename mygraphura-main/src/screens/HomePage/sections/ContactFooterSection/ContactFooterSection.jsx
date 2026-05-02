import React from 'react';
import './ContactFooterSection.css';

const footerLinks = {
  solutions: [
    { label: "Web Design", path: "#" },
    { label: "App Development", path: "#" },
    { label: "Branding", path: "#" },
    { label: "UI/UX Design", path: "#" }
  ],
  marketplace: [
    { label: "Featured Projects", path: "#" },
    { label: "New Releases", path: "#" },
    { label: "Collections", path: "#" },
    { label: "Designers", path: "#" }
  ],
  company: [
    { label: "About Us", path: "#" },
    { label: "Our Story", path: "#" },
    { label: "Contact", path: "#" },
    { label: "Manifesto", path: "#" }
  ]
};

export const ContactFooterSection = () => {
  return (
    <footer className="footer-layout">
      {/* Wave Accent */}
      <div className="footer-wave">
        <img src="/wave-1.png" alt="Decoration" className="wave-bg" />
        <div className="wave-overlay">
           <span className="scrolling-logo">GRAPHURA</span>
        </div>
      </div>

      <div className="footer-main-content">
        <div className="footer-headline">
          <p className="sub-tag">GET IN TOUCH</p>
          <h2 className="headline-text">
            Let's build something <span className="gold-text">extraordinary together.</span>
          </h2>
        </div>

        <div className="footer-grid">
          <div className="footer-brand">
            <h3 className="brand-title">GRAPHURA PORTFOLIO</h3>
            <p className="brand-desc">
              Crafting premium digital experiences through innovation and design excellence. Based in India, serving the globe.
            </p>
            <div className="footer-socials">
              <a href="#" className="social-link" title="Instagram">IG</a>
              <a href="#" className="social-link" title="LinkedIn">LN</a>
              <a href="#" className="social-link" title="Twitter">TW</a>
              <a href="#" className="social-link" title="Dribbble">DR</a>
            </div>
          </div>

          <div className="footer-nav-column">
            <h4>SOLUTIONS</h4>
            {footerLinks.solutions.map(link => (
              <a key={link.label} href={link.path}>{link.label}</a>
            ))}
          </div>

          <div className="footer-nav-column">
            <h4>MARKETPLACE</h4>
            {footerLinks.marketplace.map(link => (
              <a key={link.label} href={link.path}>{link.label}</a>
            ))}
          </div>

          <div className="footer-nav-column">
            <h4>COMPANY</h4>
            {footerLinks.company.map(link => (
              <a key={link.label} href={link.path}>{link.label}</a>
            ))}
          </div>
        </div>
      </div>

      <div className="footer-bottom-bar">
        <div className="bottom-container">
          <p className="copyright-text">© 2026 Graphura — Built for Brands That Aim Higher.</p>
          <div className="bottom-links">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <a href="#">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};