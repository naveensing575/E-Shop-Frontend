import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../contexts/userContext';

const Logout: React.FC = () => {
  const navigate = useNavigate();
  const { logout } = useUser();

  // const handleLogout = async () => {
  //   try {
  //     const token = localStorage.getItem('authToken');
  //     const response = await fetch('http://localhost:4000/logout', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //         'Authorization': `Bearer ${token}`,
  //       },
  //     });

  //     if (response.ok) {

  //       logout();
  //       navigate('/login');
  //     } else {
  //       // Handle error cases
  //       console.error('Logout failed:', response.statusText);
  //     }
  //   } catch (error) {
  //     console.error('Logout error:', error);
  //   }
  // };

  const handleLogout=()=>{
    logout();
    navigate('/login');
  }
  return (
    <div>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Logout;
