CREATE TABLE IF NOT EXISTS user_books (
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  book_id VARCHAR(255) REFERENCES books(id) ON DELETE CASCADE,
  status VARCHAR(50) NOT NULL CHECK (status IN ('reading', 'completed', 'dropped', 'to_read')),
  rating INT CHECK (rating >= 1 AND rating <= 5),
  added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (user_id, book_id)
);