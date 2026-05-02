import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Auth.css';

const ForgotPasswordView = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleReset = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    try {
      const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';
      const response = await fetch(`${API_URL}/auth/forgot-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.message || 'Failed to send reset link');
      }

      setIsSubmitted(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <img 
            src="/images/img_image_2.png" 
            alt="Graphura" 
            className="auth-logo" 
            onClick={() => navigate('/')}
          />
          <h2>Reset Password</h2>
          <p>
            {isSubmitted 
              ? "Check your email for instructions" 
              : "Enter your email to receive a reset link"}
          </p>
          {error && <div style={{ color: '#ff6b6b', marginTop: '10px', fontSize: '0.9rem' }}>{error}</div>}
        </div>
        
        {isSubmitted ? (
          <div style={{ textAlign: 'center', marginBottom: '30px' }}>
            <div style={{
              width: '64px',
              height: '64px',
              backgroundColor: 'rgba(10, 179, 156, 0.1)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 20px',
              color: '#0ab39c',
              fontSize: '24px'
            }}>
              ✓
            </div>
            <p style={{ color: '#cdd4f2', lineHeight: '1.6', fontSize: '0.95rem' }}>
              We've sent a password reset link to <strong>{email}</strong>. 
              Please check your inbox and spam folder.
            </p>
            <button 
              className="auth-button" 
              onClick={() => navigate('/login')}
              style={{ width: '100%', marginTop: '24px' }}
            >
              Return to Login
            </button>
          </div>
        ) : (
          <form className="auth-form" onSubmit={handleReset}>
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input 
                id="email"
                type="email" 
                placeholder="admin@graphura.in" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required 
              />
            </div>
            
            <button type="submit" className="auth-button" disabled={isLoading}>
              {isLoading ? 'Sending...' : 'Send Reset Link'}
            </button>
          </form>
        )}
        
        {!isSubmitted && (
          <div className="auth-footer" style={{ marginTop: '32px' }}>
            Remembered your password? <Link to="/login">Sign in</Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default ForgotPasswordView;
