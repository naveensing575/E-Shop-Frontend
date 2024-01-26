import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from '../components/Login/Login';
import Register from '../components/Register/Register';
import Logout from '../components/Logout/Logout';
import Home from '../pages/Home';
import ProductList from '../pages/ProductList';
import Product from '../pages/Product';
import NavigationBar from '../components/Navbar/Navbar';

// Sample authentication check
const isAuthenticated = () => {
  // Add your authentication logic here
  // For example, check if the user is logged in by verifying a token in local storage
  const token = localStorage.getItem('authToken');
  return !!token; // Return true if authenticated, false otherwise
};

const PrivateRoute: React.FC<{ element: React.ReactNode }> = ({ element }) => {
  return isAuthenticated() ? (
    <>{element}</>
  ) : (
    <Navigate to="/login" replace state={{ from: window.location.pathname }} />
  );
};

const AuthenticatedRoutes: React.FC = () => (
  <>
    <NavigationBar />
    <Routes>
      <Route path="/home" element={<PrivateRoute element={<Home />} />} />
      <Route path="/products" element={<PrivateRoute element={<ProductList />} />} />
      <Route path="/product/:id" element={<PrivateRoute element={<Product />} />} />
      <Route path="*" element={<Navigate to="/home" />} />
    </Routes>
  </>
);

const Root = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/logout" element={<Logout />} />
        <Route
          path="/*"
          element={<PrivateRoute element={<AuthenticatedRoutes />} />}
        />
      </Routes>
    </Router>
  );
};

export default Root;
