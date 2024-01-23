import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../contexts/userContext';

const Logout: React.FC = () => {
  const navigate = useNavigate();
  const { uid, clearUserInfo } = useUser();

  const handleLogout = async () => {
    try {

      const response = await fetch('http://localhost:4000/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ uid }),
      });

      if (response.ok) {
        // Logout successful, clear user info and navigate to the login page
        console.log('Loggged out successfully');
        clearUserInfo();
        navigate('/login');
      } else {
        // Handle error cases
        console.error('Logout failed:', response.statusText);
      }
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <div>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Logout;
