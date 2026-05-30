"use client";

import React, { useEffect, useState } from 'react';
import Script from 'next/script';
import { authService } from '../services/authService';

export default function Navbar() {
  const [user, setUser] = useState(null);
  const [scriptLoaded, setScriptLoaded] = useState(false);

  useEffect(() => {
    const savedUser = localStorage.getItem('user_profile');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleGoogleCredentialResponse = async (response) => {
    try {
      const data = await authService.loginWithGoogle(response.credential);
      setUser(data.user);
      props.onAuthChange(); // Notify parent of auth change
    } catch (err) {
      alert('Authentication failed. Please check backend logs.');
    }
  };

  const initializeGoogleAuth = () => {
    setScriptLoaded(true);
    if (window.google && !user) {
      window.google.accounts.id.initialize({
        client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || '',
        callback: handleGoogleCredentialResponse,
      });

      const buttonTarget = document.getElementById('google-signin-btn');
      if (buttonTarget) {
        window.google.accounts.id.renderButton(buttonTarget, { 
          theme: 'outline', 
          size: 'large', 
          text: 'signin_with',
          shape: 'pill'
        });
      }
    }
  };

  // Re-run initialization if the user logs out and the script is already loaded
  useEffect(() => {
    if (scriptLoaded && !user) {
      initializeGoogleAuth();
    }
  }, [user, scriptLoaded]);

  const handleLogout = () => {
    localStorage.removeItem('app_token');
    localStorage.removeItem('user_profile');
    setUser(null);
  };

  return (
    <>
      <Script 
        src="https://accounts.google.com/gsi/client" 
        onLoad={initializeGoogleAuth}
        strategy="afterInteractive"
      />

      <header style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        maxWidth: '1200px',
        margin: '0 auto 3rem auto',
        borderBottom: '2px solid #f1f5f9',
        paddingBottom: '1.5rem'
      }}>
        <h1 style={{ fontSize: '1.6rem', fontWeight: '800', margin: 0, color: '#334155', letterSpacing: '-0.5px' }}>
          📚 <span style={{ color: '#0ea5e9' }}>Book</span>Tracker
        </h1>
        
        <div>
          {user ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.2rem' }}>
              <div style={{
                backgroundColor: '#e0f2fe',
                color: '#0369a1',
                padding: '0.5rem 1rem',
                borderRadius: '20px',
                fontSize: '0.9rem',
                fontWeight: '600'
              }}>
                👋 Hello, {user.displayName}
              </div>
              <button 
                onClick={handleLogout}
                style={{
                  backgroundColor: '#fee2e2',
                  color: '#ef4444',
                  border: 'none',
                  padding: '0.5rem 1.2rem',
                  borderRadius: '8px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'background 0.2s'
                }}
              >
                Logout
              </button>
            </div>
          ) : (
            /* The target container ONLY mounts if there is no logged-in user */
            <div id="google-signin-btn" style={{ minHeight: '40px' }}></div>
          )}
        </div>
      </header>
    </>
  );
}