-- Seed Mock Users (Saves hardcoded UUIDs so we can reference them safely below)
INSERT INTO users (id, oauth_provider, oauth_id, email, display_name)
VALUES 
  ('a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d', 'google', 'google-123456', 'mockuser@gmail.com', 'John Doe'),
  ('b2c3d4e5-f6a7-4819-90b1-c2d3e4f5a6b7', 'google', 'google-654321', 'mockuser2@gmail.com', 'Jane Smith')
ON CONFLICT (oauth_id) DO NOTHING;

-- Seed Mock Books
INSERT INTO books (id, title, author, cover_image_url, published_date)
VALUES 
  ('9780141439518', 'Pride and Prejudice', 'Jane Austen', '', '1813-01-28'),
  ('0451524934', '1984', 'George Orwell', '', '1949-06-08'),
  ('9780743273565', 'The Great Gatsby', 'F. Scott Fitzgerald', '', '1925-04-10'),
  ('0345339681', 'The Hobbit', 'J.R.R. Tolkien', '', '1937-09-21')
ON CONFLICT (id) DO NOTHING;