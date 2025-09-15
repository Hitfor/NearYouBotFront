import React from 'react';
import './LoadingPage.css';

const LoadingPage = () => {
  return (
    <div className="loading-page">
      <div className="loading-content">


        <div className="logo-container">
          <svg 
            width="80" 
            height="80" 
            viewBox="0 0 80 80" 
            className="logo"
          >
            {/* Location pin base */}
            <path
              d="M40 10 C50 10 58 18 58 28 C58 45 40 70 40 70 C40 70 22 45 22 28 C22 18 30 10 40 10 Z"
              fill="url(#logoGradient)"
              stroke="#0088cc"
              strokeWidth="2"
            />
            {/* Inner circle for location */}
            <circle
              cx="40"
              cy="28"
              r="8"
              fill="#1a1a1a"
            />
            {/* Community dots inside location pin */}
            <circle cx="36" cy="26" r="2" fill="#ffd700" />
            <circle cx="44" cy="26" r="2" fill="#ffd700" />
            <circle cx="40" cy="30" r="2" fill="#ffd700" />
            
            {/* Gradient definition */}
            <defs>
              <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#0088cc" />
                <stop offset="100%" stopColor="#0066aa" />
              </linearGradient>
            </defs>
          </svg>
        </div>
        
        <h1 className="app-title">NearYou</h1>

        <div className="spinner-container">
          <div className="spinner"></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingPage;