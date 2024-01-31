import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from '../components/Login/Login';
import Register from '../components/Register/Register';
import Logout from '../components/Logout/Logout';
import Home from '../pages/Home';
import Product from '../pages/Product';
import NavigationBar from '../components/Navbar/Navbar';
import Categories from '../pages/Categories';
import Cart from '../pages/Cart';
import Checkout from '../pages/Checkout';
import OrdersHistory from '../pages/OrdersHistory';

const isAuthenticated = () => {
  const userInfoString = localStorage.getItem('userInfo');
  if (userInfoString) {
    const userInfo = JSON.parse(userInfoString);
    return !!userInfo.token;
  }
  return false;
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
      <Route path="/products/:id" element={<PrivateRoute element={<Product />} />} />
      <Route path='/categories' element={<PrivateRoute element={<Categories />} />} />
      <Route path='/cart' element={<PrivateRoute element={<Cart />} />} />
      <Route path='/checkout' element={<PrivateRoute element={<Checkout />} />} />
      <Route path='/orders-history' element={<PrivateRoute element={<OrdersHistory />} />} />
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
