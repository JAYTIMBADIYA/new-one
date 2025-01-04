export async function refreshToken() {
    try {
      const refreshToken = localStorage.getItem('refreshToken');
  
      const response = await fetch('https://dummyjson.com/auth/refresh', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refreshToken, expiresInMins: 30 }),
        credentials: 'include',
      });
  
      const data = await response.json();
  
      if (response.ok) {
        localStorage.setItem('accessToken', data.accessToken);
        localStorage.setItem('refreshToken', data.refreshToken);
        console.log('Token refreshed successfully');
        return data.accessToken; // Return the new access token
      } else {
        console.error('Failed to refresh token:', data.message);
        throw new Error(data.message);
      }
    } catch (err) {
      console.error('Error refreshing token:', err);
      throw err;
    }
  }