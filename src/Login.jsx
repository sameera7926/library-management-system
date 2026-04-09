import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import { registerUser, loginUser } from './db';
import logoUrl from './assets/logo.jpeg';

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const navigate = useNavigate();

  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    setTimeout(() => setIsVisible(true), 100);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');
    try {
      let user;
      if (isLogin) {
        user = loginUser(email, password);
      } else {
        registerUser(name, email, password);
        user = loginUser(email, password);
      }
      
      if (!user.onboardingCompleted) {
        navigate('/onboarding');
      } else {
        navigate('/dashboard');
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const handleForgotPassword = (e) => {
    e.preventDefault();
    if (!email) {
      setError('Please enter your email address to reset password.');
      return;
    }
    setError('');
    setSuccessMsg(`A password reset link was sent to ${email}`);
  };

  const handleSocialLogin = (provider) => {
    setError(`Mock: Continued with ${provider}`);
  };

  return (
    <div className="login-section page-entrance">
      <div className={`login-card ${isVisible ? 'visible' : ''}`}>
        
        <div className="login-header">
          <img src={logoUrl} alt="Readx Logo" className="login-card-logo" />
          <h2>{isLogin ? 'Login to Readx' : 'Join Readx'}</h2>
          <p>{isLogin ? 'Every login opens a new chapter' : 'Get started with an account on readx'}</p>
        </div>

        <div className="auth-toggle">
          <button 
            type="button"
            className={isLogin ? 'active' : ''} 
            onClick={() => { setIsLogin(true); setError(''); setSuccessMsg(''); }}
          >
            Log in
          </button>
          <button 
            type="button"
            className={!isLogin ? 'active' : ''} 
            onClick={() => { setIsLogin(false); setError(''); setSuccessMsg(''); }}
          >
            Sign up
          </button>
        </div>

        {error && <div className="error-message">{error}</div>}
        {successMsg && <div className="success-message">{successMsg}</div>}

        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input 
                type="text" 
                id="name" 
                className="form-input" 
                placeholder="Enter your name" 
                value={name}
                onChange={e => setName(e.target.value)}
                required 
              />
            </div>
          )}
          
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input 
              type="email" 
              id="email" 
              className="form-input" 
              placeholder="Enter your email" 
              value={email}
              onChange={e => setEmail(e.target.value)}
              required 
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div className="password-wrapper">
              <input 
                type={showPassword ? "text" : "password"} 
                id="password" 
                className="form-input password-input" 
                placeholder="Enter your password" 
                value={password}
                onChange={e => setPassword(e.target.value)}
                required 
              />
              <button 
                type="button" 
                className="password-toggle-btn"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {isLogin && (
            <div className="forgot-password-container">
              <button type="button" onClick={handleForgotPassword} className="forgot-password-btn">
                Forgot your password?
              </button>
            </div>
          )}

          <button type="submit" className="submit-btn" style={{marginTop: '1rem'}}>
            {isLogin ? 'Sign In' : 'Create Account'}
          </button>

          {!isLogin && (
            <div className="signup-footer-links">
               <button type="button" className="text-btn" onClick={() => setIsLogin(true)}>Have any account? Log in</button>
               <a href="#terms" className="text-btn-subdued">Terms and conditions</a>
            </div>
          )}
        </form>

        <div className="social-login-divider">
          <span>or</span>
        </div>

        <div className="social-buttons">
          <button type="button" className="social-btn google-btn" onClick={() => handleSocialLogin('Google')}>
            <svg viewBox="0 0 24 24" width="20" height="20" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Continue with Google
          </button>
          
          <button type="button" className="social-btn apple-btn" onClick={() => handleSocialLogin('Apple')}>
             <svg viewBox="0 0 24 24" width="20" height="20" fill="white" xmlns="http://www.w3.org/2000/svg">
              <path d="M16.142 2.025c1.022-1.258 1.713-2.844 1.526-4.425-1.393.056-3.118.942-4.178 2.2-1.024 1.144-1.854 2.825-1.583 4.417 1.558.12 3.125-.838 4.235-2.192zm-5.064 4.542c-2.046 0-3.69 1.15-4.73 1.15s-2.044-.925-3.414-.925c-1.85 0-3.5 1.346-4.52 3.133-2.067 3.587-.53 8.892 1.487 11.458.985 1.258 2.167 2.68 3.513 2.637 1.306-.042 1.834-.846 3.412-.846 1.577 0 2.046.804 3.432.846 1.408.042 2.45-1.22 3.39-2.508 1.096-1.5 1.545-2.954 1.564-3.033-.038-.016-2.824-1.12-2.862-4.32-.038-2.675 2.112-3.954 2.208-4.01-1.33-1.954-3.39-2.22-4.14-2.28-1.58-.154-3.52 1.09-4.34 1.09z" />
            </svg>
            Continue with Apple
          </button>
        </div>
      </div>
    </div>
  );
}
