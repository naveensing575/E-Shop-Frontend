import React from 'react';
import { Dropdown } from 'react-bootstrap';
import { BsPersonFill } from 'react-icons/bs';

interface ProfileDropdownProps {
  userName: string;
  userEmail: string;
  onOrdersClick: () => void;
  onLogoutClick: () => void;
}

const ProfileDropdown: React.FC<ProfileDropdownProps> = ({ userName, userEmail, onOrdersClick, onLogoutClick }) => {
  return (
    <Dropdown>
      <Dropdown.Toggle as="div">
        <div className="profile-icon">
          <BsPersonFill />
        </div>
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item>
          <div>Name: {userName}</div>
        </Dropdown.Item>
        <Dropdown.Item>
          <div>Email: {userEmail}</div>
        </Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item onClick={onOrdersClick}>Orders</Dropdown.Item>
        <Dropdown.Item onClick={onLogoutClick}>Logout</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default ProfileDropdown;
