async function refreshAccessToken(refreshToken) {
  try {
    const response = await fetch('http://localhost:3000/api/users/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ refreshToken }),
    });

    if (response.ok) {
      const data = await response.json();
      if (data.accessToken) {
        localStorage.setItem('accessToken', data.accessToken);
        return data.accessToken;
      }
    } else {
      console.log('Failed to refresh access token', response.status);
      return null;
    }
  } catch (error) {
    console.log('Error refreshing access token', error);
    return null;
  }
}

export default refreshAccessToken;