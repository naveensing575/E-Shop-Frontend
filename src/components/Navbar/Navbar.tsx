// NavigationBar.tsx
import React from 'react';
import { Navbar, Nav, Form, FormControl, Button, Container } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { BsFillBagFill } from 'react-icons/bs';
import ProfileDropdown from '../Profile/Profile';
import { useUser } from '../../contexts/userContext';

const NavigationBar: React.FC = () => {
  const { user, logout } = useUser();
  const navigate = useNavigate();

  const handleOrdersClick = () => {
    // Add logic for handling orders click
    console.log('Orders clicked');
  };

  const handleLogoutClick = () => {
    // Add logic for handling logout click
    logout();
    navigate('/login');
  };

  return (
    <Container fluid>
      <Navbar bg="light" expand="lg">
        <Navbar.Brand as={Link} to="/home">
          E-Shop
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link as={Link} to="/categories">
              Categories
            </Nav.Link>
          </Nav>
          <Form className="mr-sm-2">
            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
            <Button variant="outline-success">Search</Button>
          </Form>
          <Nav className="ml-auto">
            <Nav.Link as={Link} to="/cart">
              <BsFillBagFill /> Cart
            </Nav.Link>
            {user && user.email ? (
              <ProfileDropdown
                userName={user.name || ''}
                userEmail={user.email}
                onOrdersClick={handleOrdersClick}
                onLogoutClick={handleLogoutClick}
              />
            ) : (
              <Button onClick={handleLogoutClick} variant="outline-primary">
                Login
              </Button>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </Container>
  );
};

export default NavigationBar;
