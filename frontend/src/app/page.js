"use client";

import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import BookCard from '../components/BookCard';
import BookModal from '../components/BookModal';
import { bookService } from '../services/bookService';

export default function HomePage() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBook, setSelectedBook] = useState(null);
  
  // Track user ownership context mapping arrays cleanly
  const [myBookIds, setMyBookIds] = useState([]);
  const [userLoggedIn, setUserLoggedIn] = useState(false);

  // Core execution state tracker sequence hook
  const syncDashboardData = () => {
    const token = localStorage.getItem('app_token');
    const isLogged = !!token;
    setUserLoggedIn(isLogged);

    bookService.getBooks()
      .then((data) => {
        setBooks(data);
        if (isLogged) {
          // If a token exists, sync the collection database map arrays asynchronously
          return bookService.getMyBookIds();
        }
        return [];
      })
      .then((ownedIds) => {
        setMyBookIds(ownedIds);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => {
    syncDashboardData();
    
    // Set up a window event listener to catch updates when users click Login/Logout on the Navbar
    window.addEventListener('storage', syncDashboardData);
    return () => window.removeEventListener('storage', syncDashboardData);
  }, []);

  const handleBookAdded = (bookId) => {
    // Optimistic UI update: instantly append the ID locally to eliminate network lag presentation
    setMyBookIds((prev) => [...prev, bookId]);
  };

  return (
    <div style={{ backgroundColor: '#f8fafc', color: '#334155', minHeight: '100vh', fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      {/* Pass down data refresh triggers to respond quickly to Navbar actions */}
      <Navbar onAuthChange={syncDashboardData} />
      
      <main style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <Hero />

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', borderBottom: '2px solid #e2e8f0', paddingBottom: '0.5rem' }}>
          <h3 style={{ fontSize: '1.4rem', fontWeight: '700', margin: 0, color: '#475569' }}>Discover Your Library</h3>
          <span style={{ backgroundColor: '#f0fdf4', color: '#16a34a', padding: '0.25rem 0.75rem', borderRadius: '12px', fontSize: '0.85rem', fontWeight: '600' }}>
            {books.length} Books Available
          </span>
        </div>

        {loading ? (
          <p style={{ color: '#64748b', textAlign: 'center', marginTop: '3rem' }}>Loading your bookshelf...</p>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '2rem' }}>
            {books.map((book) => {
              const isOwned = myBookIds.includes(book.id);
              return (
                <BookCard 
                  key={book.id} 
                  book={book} 
                  showAction={userLoggedIn}
                  isOwned={isOwned}
                  onAddSuccess={() => handleBookAdded(book.id)}
                  onCardClick={() => setSelectedBook(book)}
                />
              );
            })}
          </div>
        )}
      </main>

      {selectedBook && (
        <BookModal book={selectedBook} onClose={() => setSelectedBook(null)} />
      )}
    </div>
  );
}