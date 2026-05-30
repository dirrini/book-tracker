import { query } from '../config/db.js';

export const ReviewModel = {
  /**
   * Fetches all reviews linked to a specific book ID
   */
  getReviewsByBookId: async (bookId) => {
    const sql = `
      SELECT id, user_name, rating, comment, created_at 
      FROM reviews 
      WHERE book_id = $1 
      ORDER BY created_at DESC
    `;
    const result = await query(sql, [bookId]);
    return result.rows;
  }
};