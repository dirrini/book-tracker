import React from 'react';
import { bookService } from '../services/bookService';

export default function BookCard({ book, showAction, isOwned, onAddSuccess, onCardClick }) {
  const hasCover = book.cover_image_url && book.cover_image_url.startsWith('http');

  const handleActionClick = async (event) => {
    // CRITICAL: Stop propagation so clicking the add button doesn't trigger the card's open modal view
    event.stopPropagation();

    if (isOwned) return;

    try {
      await bookService.addBookToMyCollection(book.id);
      onAddSuccess();
    } catch (err) {
      alert('Failed to register collection update maps.');
    }
  };

  return (
    <div 
      onClick={onCardClick}
      style={{
        backgroundColor: '#ffffff',
        borderRadius: '16px',
        padding: '1.5rem',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
        border: '1px solid #e2e8f0',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        position: 'relative', // Allows absolute alignment layout placement internally
        cursor: 'pointer'
      }}
    >
      {/* Top Left Corner Action Floating Asset Node */}
      {showAction && (
        <button
          onClick={handleActionClick}
          style={{
            position: 'absolute',
            top: '12px',
            left: '12px',
            zIndex: 10,
            border: 'none',
            borderRadius: '50%',
            width: '36px',
            height: '36px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: isOwned ? 'default' : 'pointer',
            boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)',
            backgroundColor: isOwned ? '#dcfce7' : '#f0f9ff', // Light pastel green vs clean pastel blue
            color: isOwned ? '#15803d' : '#0369a1',
            transition: 'transform 0.1s ease'
          }}
        >
          {isOwned ? '✓' : '＋'}
        </button>
      )}

      <div>
        <div style={{ width: '100%', height: '240px', backgroundColor: '#f1f5f9', borderRadius: '12px', marginBottom: '1.2rem', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
          {hasCover ? (
            <img src={book.cover_image_url} alt={book.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          ) : (
            <span style={{ fontSize: '3.5rem' }}>📖</span>
          )}
        </div>
        <h4 style={{ margin: '0 0 0.4rem 0', fontSize: '1.2rem', fontWeight: '700', color: '#1e293b' }}>{book.title}</h4>
        <p style={{ margin: 0, color: '#64748b', fontSize: '0.95rem' }}>by {book.author}</p>
      </div>
      
      <div style={{ marginTop: '1.5rem' }}>
        <span style={{ backgroundColor: '#f0f9ff', color: '#0284c7', padding: '0.3rem 0.6rem', borderRadius: '6px', fontSize: '0.8rem', fontWeight: '700' }}>
          ISBN-10: {book.id}
        </span>
      </div>
    </div>
  );
}