
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from '../components/Login/Login';
import Register from '../components/Register/Register';
import Logout from '../components/Logout/Logout';
import Home from '../pages/Home';

const Root = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/logout" element={<Logout/>} />
        <Route path="/home" element={<Home/>} />
        <Route path="*" element={<Login/>} />
      </Routes>
    </Router>
  );
};

export default Root;
