INSERT INTO user_books (user_id, book_id, status, rating, added_at) 
VALUES ('a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d', '0451524934', 'completed', 5, CURRENT_TIMESTAMP),
       ('a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d', '0345339681', 'reading', NULL, CURRENT_TIMESTAMP),
       ('b2c3d4e5-f6a7-4819-90b1-c2d3e4f5a6b7', '0451524934', 'to_read', NULL, CURRENT_TIMESTAMP),
       ('b2c3d4e5-f6a7-4819-90b1-c2d3e4f5a6b7', '0345339681', 'dropped', 2, CURRENT_TIMESTAMP)
ON CONFLICT DO NOTHING;