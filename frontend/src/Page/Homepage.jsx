import React from 'react';
import Navbar from '../Components/Home/Navbar';
import Header from '../Components/Home/Header';
import Footer from '../Components/Home/Footer';
import AdminSignup from "../Components/Home/AdminSignup"
import AdminLogin from "../Components/Home/AdminLogin"

import { Route, Routes } from 'react-router-dom';

const Homepage = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Header />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/admin-signup" element={<AdminSignup />} />
      </Routes>
      <Footer />
    </>
  );
};

export default Homepage;
