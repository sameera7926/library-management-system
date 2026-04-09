import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logoUrl from './assets/logo.jpeg';

export default function Splash() {
  const navigate = useNavigate();
  const [fadingOut, setFadingOut] = useState(false);

  useEffect(() => {
    // Start fade out at 2 seconds
    const fadeOutTimer = setTimeout(() => {
      setFadingOut(true);
    }, 2000);

    // Navigate at 2.5 seconds (allowing 0.5s for fade animation)
    const navTimer = setTimeout(() => {
      navigate('/login');
    }, 2500);

    return () => {
      clearTimeout(fadeOutTimer);
      clearTimeout(navTimer);
    };
  }, [navigate]);

  return (
    <div className={`splash-container ${fadingOut ? 'splash-fade-out' : ''}`}>
      <div className="logo-container">
        <img src={logoUrl} alt="Readx Logo" className="logo-image" />
        <h1 className="welcome-text">Welcome</h1>
        <p className="quote-text">Where knowledge meets intelligence</p>
      </div>
    </div>
  );
}
