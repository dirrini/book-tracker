const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000/api/v1';

export const authService = {
  /**
   * Exchanges Google ID Token for an application-specific JWT
   */
  loginWithGoogle: async (googleCredential) => {
    try {
      const response = await fetch(`${API_BASE_URL}/google`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ credential: googleCredential }),
      });

      if (!response.ok) {
        throw new Error(`Authentication endpoint rejected token: ${response.status}`);
      }

      const data = await response.json();
      
      // Save your custom app token to localStorage for authenticated requests
      if (data.token) {
        localStorage.setItem('app_token', data.token);
        localStorage.setItem('user_profile', JSON.stringify(data.user));
      }

      return data;
    } catch (error) {
      console.error('OAuth Service execution failed:', error);
      throw error;
    }
  }
};