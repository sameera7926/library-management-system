import React from 'react';
import logoUrl from './assets/logo.jpeg';

export default function Splash({ onScrollDown }) {
  return (
    <div className="splash-container">
      <div className="logo-container">
        <img src={logoUrl} alt="Readx Logo" className="logo-image" />
        <h1 className="welcome-text">Welcome</h1>
        <p className="quote-text">Where knowledge meets intelligence</p>
      </div>
      
      <a 
        href="#login" 
        className="scroll-indicator"
        onClick={(e) => {
          e.preventDefault();
          onScrollDown();
        }}
      >
        <p>Scroll Down</p>
        <svg 
          className="scroll-arrow"
          width="24" 
          height="24" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        >
          <path d="M12 5v14M19 12l-7 7-7-7" />
        </svg>
      </a>
    </div>
  );
}
