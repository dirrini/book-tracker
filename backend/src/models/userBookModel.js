import { query } from '../config/db.js';

export const UserBookModel = {
  /**
   * Checks if a specific relation pair exists
   */
  hasBook: async (userId, bookId) => {
    const sql = 'SELECT 1 FROM user_books WHERE user_id = $1 AND book_id = $2';
    const result = await query(sql, [userId, bookId]);
    return result.rows.length > 0;
  },

  /**
   * Relates a user with a book
   */
  addBookToUser: async (userId, bookId) => {
    const sql = `
      INSERT INTO user_books (user_id, book_id, status, rating, added_at) 
      VALUES ($1, $2, 'to_read', NULL, CURRENT_TIMESTAMP) 
      ON CONFLICT DO NOTHING
    `;
    await query(sql, [userId, bookId]);
    return { success: true };
  },

  /**
   * Fetches all book IDs owned by a specific user to optimize frontend state syncing
   */
  getUserBookIds: async (userId) => {
    const sql = 'SELECT book_id FROM user_books WHERE user_id = $1';
    const result = await query(sql, [userId]);
    return result.rows.map(row => row.book_id);
  }
};