import { query } from '../config/db.js';

export const UserModel = {
  /**
   * Finds a user by their unique Google OAuth ID
   */
  findByOauthId: async (oauthId) => {
    const sql = 'SELECT id, email, display_name FROM users WHERE oauth_id = $1';
    const result = await query(sql, [oauthId]);
    return result.rows[0] || null;
  },

  /**
   * Registers a new user into the database upon their first OAuth login
   */
  createUser: async ({ oauthProvider, oauthId, email, displayName }) => {
    const sql = `
      INSERT INTO users (oauth_provider, oauth_id, email, display_name)
      VALUES ($1, $2, $3, $4)
      RETURNING id, email, display_name
    `;
    const result = await query(sql, [oauthProvider, oauthId, email, displayName]);
    return result.rows[0];
  }
};