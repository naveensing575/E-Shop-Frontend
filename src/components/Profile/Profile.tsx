import React from 'react';
import { Dropdown } from 'react-bootstrap';
import { BsPersonFill } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';

interface ProfileDropdownProps {
  userName: string;
  userEmail: string;
  onLogoutClick: () => void;
}


const ProfileDropdown: React.FC<ProfileDropdownProps> = ({ userName, userEmail, onLogoutClick }) => {
  const navigate = useNavigate();
  const onOrdersClick = () => {
    navigate('/orders-history')
  };

  return (
    <Dropdown>
      <Dropdown.Toggle
        as="div"
        id="profile-toggle"
      >
        <BsPersonFill size={30} color="#007bff" />
      </Dropdown.Toggle>
      <Dropdown.Menu className="mt-0">
        <Dropdown.Item>
          Hi👋 {userName}
        </Dropdown.Item>
        <Dropdown.Item>
          {userEmail}
        </Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item onClick={onOrdersClick}>Orders</Dropdown.Item>
        <Dropdown.Item onClick={onLogoutClick}>Logout</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default ProfileDropdown;
