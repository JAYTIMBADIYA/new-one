import React, { useEffect, useState } from 'react';
import { refreshToken } from '../services/authService'; // Import refreshToken function

function Dashboard() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const accessToken = localStorage.getItem('accessToken');

        const response = await fetch('https://dummyjson.com/auth/me', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${accessToken}`,
          },
          credentials: 'include',
        });

        if (response.status === 401) {
          console.log('Access token expired, refreshing...');
          const newAccessToken = await refreshToken();
          return fetchUser(); // Retry fetching user data after refreshing token
        }

        const data = await response.json();

        if (response.ok) {
          setUser(data);
        } else {
          setError(data.message || 'Failed to fetch user data');
        }
      } catch (err) {
        console.error('Error fetching user:', err);
        setError('Something went wrong. Please try again.');
      }
    };

    fetchUser();
  }, []);

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  if (!user) {
    return <p>Loading user data...</p>;
  }

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold">Welcome, {user.firstName}!</h1>
      <p className="mt-4">Username: {user.username}</p>
      <p>Email: {user.email}</p>
    </div>
  );
}

export default Dashboard;