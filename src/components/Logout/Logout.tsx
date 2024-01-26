import React from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../contexts/userContext';

const Logout: React.FC = () => {
  const navigate = useNavigate();
  const { logout } = useUser();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="text-center mt-3">
      <Button variant="danger" onClick={handleLogout}>
        Logout
      </Button>
    </div>
  );
};

export default Logout;
