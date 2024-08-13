'use client';

import { useState } from 'react';

export function LogoutButton() {
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/auth/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        // Redirect to login page or show a success message
        window.location.href = '/login';
      } else {
        console.error('Logout failed');
        // Handle logout failure (optional)
      }
    } catch (error) {
      console.error('An error occurred during logout:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button type="button" onClick={handleLogout} disabled={loading}>
      {loading ? 'Signing Out...' : 'Sign Out'}
    </button>
  );
}
