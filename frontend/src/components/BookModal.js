"use client";

import React, { useEffect, useState } from 'react';
import { bookService } from '../services/bookService';

export default function BookModal({ book, onClose }) {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (book) {
      setLoading(true);
      bookService.getBookReviews(book.id)
        .then((data) => {
          setReviews(data);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  }, [book]);

  if (!book) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      backgroundColor: 'rgba(15, 23, 42, 0.4)', // Blurred dark overlay backdrop
      backdropFilter: 'blur(4px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      padding: '1rem'
    }}>
      <div style={{
        backgroundColor: '#ffffff',
        borderRadius: '24px',
        maxWidth: '600px',
        width: '100%',
        maxHeight: '85vh',
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        border: '1px solid #e2e8f0'
      }}>
        {/* Modal Header */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'start',
          padding: '1.5rem 2rem',
          borderBottom: '1px solid #f1f5f9',
          backgroundColor: '#f8fafc'
        }}>
          <div>
            <h3 style={{ margin: '0 0 0.25rem 0', fontSize: '1.4rem', fontWeight: '800', color: '#1e293b' }}>
              {book.title}
            </h3>
            <p style={{ margin: 0, color: '#64748b', fontSize: '0.95rem' }}>by {book.author}</p>
          </div>
          <button 
            onClick={onClose}
            style={{
              background: '#e2e8f0',
              border: 'none',
              borderRadius: '50%',
              width: '32px',
              height: '32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              fontWeight: 'bold',
              color: '#475569'
            }}
          >
            ✕
          </button>
        </div>

        {/* Modal Body Contents */}
        <div style={{ padding: '2rem', overflowY: 'auto', flex: 1 }}>
          <h4 style={{ margin: '0 0 1rem 0', color: '#334155', fontSize: '1.1rem', fontWeight: '700' }}>
            Reader Reviews
          </h4>

          {loading ? (
            <p style={{ color: '#94a3b8', fontSize: '0.95rem' }}>Loading community notes...</p>
          ) : reviews.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '2rem 0', color: '#94a3b8' }}>
              <span style={{ fontSize: '2rem' }}>💭</span>
              <p style={{ margin: '0.5rem 0 0 0', fontSize: '0.95rem' }}>No reviews posted yet. Be the first!</p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {reviews.map((review) => (
                <div key={review.id} style={{
                  backgroundColor: '#f8fafc',
                  padding: '1.25rem',
                  borderRadius: '16px',
                  border: '1px solid #edf2f7'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <span style={{ fontWeight: '700', color: '#475569', fontSize: '0.9rem' }}>
                      {review.user_name}
                    </span>
                    <span style={{ color: '#eab308', fontWeight: '700', fontSize: '0.9rem' }}>
                      {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}
                    </span>
                  </div>
                  <p style={{ margin: 0, color: '#334155', fontSize: '0.95rem', lineHeight: '1.5' }}>
                    "{review.comment}"
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}