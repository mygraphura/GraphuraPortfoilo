import React from 'react';
import { useNavigate } from 'react-router-dom';
import './NotFoundPage.css';

export const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="not-found-container">
      <div className="not-found-bg">
        <div className="glow-orb g-1"></div>
        <div className="glow-orb g-2"></div>
      </div>
      
      <div className="not-found-content">
        <div className="error-code-wrap">
          <h1 className="error-code">404</h1>
          <div className="error-divider"></div>
        </div>
        
        <h2 className="error-title">BEYOND THE <span className="gold-text">HORIZON</span></h2>
        <p className="error-desc">
          The page you are looking for has drifted into deep space. 
          It might have been removed, renamed, or never existed in this dimension.
        </p>

        <div className="error-actions">
          <button onClick={() => navigate('/')} className="return-btn">
            <span className="btn-line"></span>
            <span className="btn-text">RETURN TO ARCHIVE</span>
            <span className="btn-icon">→</span>
          </button>
        </div>
      </div>

      <div className="not-found-footer">
        <span className="coord-text">LAT: 0.00 / LON: 0.00</span>
        <span className="brand-tag">GRAPHURA STUDIO</span>
      </div>
    </div>
  );
};
