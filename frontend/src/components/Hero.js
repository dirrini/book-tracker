import React from 'react';

export default function Hero() {
  return (
    <div style={{ marginBottom: '4rem', textAlign: 'center', padding: '2rem 1rem' }}>
      <h2 style={{ fontSize: '2.8rem', fontWeight: '800', color: '#1e293b', marginBottom: '0.75rem', letterSpacing: '-1px' }}>
        Your Ultimate Reading Space
      </h2>
      <p style={{ color: '#64748b', fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto', lineHeight: '1.6' }}>
        Track your shelf, write detailed reviews, and seamlessly log your reading progress.
      </p>
    </div>
  );
}