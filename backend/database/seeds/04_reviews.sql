-- Seed Mock Reviews for Books
INSERT INTO reviews (book_id, user_name, rating, comment) VALUES
('0451524934', 'Anya Vance', 5, 'An absolute masterpiece of dystopian fiction. Scarier now than when it was written.'),
('0451524934', 'Marcus Brody', 4, 'Incredibly atmospheric, though the final act is deliberately depressing.'),
('0345339681', 'Lyra Belacqua', 5, 'The perfect comfort read. Tolkien’s world-building shines right from the opening sentence.')
ON CONFLICT DO NOTHING;