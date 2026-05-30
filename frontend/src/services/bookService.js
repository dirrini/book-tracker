const API_BASE_URL = 'http://localhost:5000/api/v1';

// Internal utility to structure secure authorization headers dynamically
const getAuthHeaders = () => {
  const token = localStorage.getItem('app_token');
  return {
    'Content-Type': 'application/json',
    ...(token ? { 'Authorization': `Bearer ${token}` } : {})
  };
};

export const bookService = {
  /**
   * Fetches the seeded books from the Fastify API
   */
    getBooks: async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/books`);
            if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error('Failed to fetch books from infrastructure service:', error);
            throw error;
        }
    },
    getBookReviews: async (bookId) => {
        const response = await fetch(`${API_BASE_URL}/books/${bookId}/reviews`);
        if (!response.ok) throw new Error('Failed to fetch target reviews.');
        return await response.json();
    },
    /**
     * Fetches the raw array list of owned book IDs for the logged-in user context
     */
    getMyBookIds: async () => {
        const response = await fetch(`${API_BASE_URL}/my-books/ids`, {
            method: 'GET',
            headers: getAuthHeaders()
        });
    if (!response.ok) throw new Error('Failed to fetch user collection data maps.');
        return await response.json();
    },

    /**
     * Relates the user context directly with a target catalog asset item block
     */
    addBookToMyCollection: async (bookId) => {
    const response = await fetch(`${API_BASE_URL}/my-books`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({ bookId })
    });
    if (!response.ok) throw new Error('Server rejected collection alteration request.');
        return await response.json();
    }
};