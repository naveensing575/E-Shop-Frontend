import React, { useState } from 'react';
import { Navbar, Nav, Form, FormControl, Button, Container } from 'react-bootstrap';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { MdSearch } from 'react-icons/md';
import { BsCartPlus } from 'react-icons/bs';
import ProfileDropdown from '../Profile/Profile';
import { useUser } from '../../contexts/userContext';

const NavigationBar: React.FC = () => {
  const { logout } = useUser();
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get('search') || '';
  const [searchValue, setSearchValue] = useState(searchQuery);
  const userInfo = localStorage.getItem('userInfo');
  const userName = userInfo ? JSON.parse(userInfo).name : 'Guest';
  const userEmail = userInfo ? JSON.parse(userInfo).email : 'Guest@gmail.com';
  const token = userInfo ? JSON.parse(userInfo).token : null;

  const handleOrdersClick = () => {
    console.log('Orders clicked');
  };

  const handleLogoutClick = () => {
    logout();
    navigate('/login');
  };

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
    queryParams.set('search', e.target.value);
    navigate(`${location.pathname}?${queryParams.toString()}`);
  };

  return (
    <Container fluid>
      <Navbar bg="light" expand="lg" className="px-3">
        <Navbar.Brand as={Link} to="/home" className="font">
          E-Shop
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link as={Link} to="/categories" className="font">
              Categories
            </Nav.Link>
          </Nav>
          <Form className="mx-auto d-flex">
            <FormControl 
              type="text" 
              placeholder="Search" 
              className="px-4 rounded-pill border-0" 
              value={searchValue}
              onChange={handleSearchInputChange}
            />
            <Button variant="outline-primary" className="mx-2 rounded-pill border-0">
              <MdSearch size={20}/>
            </Button>
          </Form>
          <Nav className="ml-auto">
            <Nav.Link as={Link} to="/cart" className="cart">
              <BsCartPlus size={20} /> Cart
            </Nav.Link>
            {token ? (
              <ProfileDropdown
                userName={ userName }
                userEmail={ userEmail }
                onOrdersClick={handleOrdersClick}
                onLogoutClick={handleLogoutClick}
              />
            ) : (
              <Button onClick={handleLogoutClick} variant="outline-primary" className="rounded-pill border-0 font text-blue">
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
