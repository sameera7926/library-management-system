import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import { registerUser, loginUser } from './db';

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const cardRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.3 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }
    return () => {
      if (cardRef.current) observer.unobserve(cardRef.current);
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    try {
      if (isLogin) {
        loginUser(email, password);
      } else {
        registerUser(name, email, password);
        loginUser(email, password);
      }
      // Assuming redirect to dashboard on success
      navigate('/dashboard');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="login-section" id="login">
      <div 
        ref={cardRef} 
        className={`login-card ${isVisible ? 'visible' : ''}`}
      >
        <div className="auth-toggle">
          <button 
            type="button"
            className={isLogin ? 'active' : ''} 
            onClick={() => { setIsLogin(true); setError(''); }}
          >
            Existing User
          </button>
          <button 
            type="button"
            className={!isLogin ? 'active' : ''} 
            onClick={() => { setIsLogin(false); setError(''); }}
          >
            New User
          </button>
        </div>

        {error && <div className="error-message">{error}</div>}

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

          <button type="submit" className="submit-btn" style={{marginTop: '1.5rem'}}>
            {isLogin ? 'Sign In' : 'Create Account'}
          </button>
        </form>

        {isLogin && (
          <a href="#forgot" className="forgot-password">
            Forgot your password?
          </a>
        )}
      </div>
    </div>
  );
}
