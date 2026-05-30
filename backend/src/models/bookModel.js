import { query } from '../config/db.js';

export const BookModel = {
  /**
   * Fetches all books from the database
   */
  getAllBooks: async () => {
    const sql = 'SELECT id, title, author, cover_image_url FROM books';
    const result = await query(sql);
    return result.rows;
  },
  getBook: async (id) => {
    const sql = 'SELECT id, title, author, cover_image_url FROM books WHERE id = $1';
    const result = await query(sql, [id]);
    return result.rows[0];
  }
};