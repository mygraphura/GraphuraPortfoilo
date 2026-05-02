import React from 'react';
import './CallToActionSection.css';

export const CallToActionSection = () => {
  return (
    <section className="cta-lux-container">
      <div className="cta-card">
        {/* Decorative elements */}
        <div className="cta-bg-glow"></div>
        <div className="cta-grid-pattern"></div>
        
        <div className="cta-inner-content">
          <div className="cta-text-wrapper">
             <span className="cta-badge">PERFECTION AT SCALE</span>
             <h2 className="cta-main-title">Like our <span className="gold-text">Work?</span></h2>
             <p className="cta-description">
               Let's collaborate to transform your vision into a digital masterpiece that sets you apart from the competition.
             </p>
          </div>

          <div className="cta-actions">
             <button className="cta-primary-btn">
                LET'S TALK
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg>
             </button>
             <p className="cta-sublink">Or send us a brief directly at <span>hello@graphura.cc</span></p>
          </div>
        </div>

        {/* Floating abstract image */}
        <div className="cta-visual-element">
           <img src="/group-2087324129.png" alt="Visual Detail" className="visual-img" />
        </div>
      </div>
    </section>
  );
};