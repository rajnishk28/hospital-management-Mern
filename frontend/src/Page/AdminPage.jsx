import React from 'react';
import UserDetails from '../Components/Admin/UserDetails/UserDetails';
import Sidebar from '../Components/Admin/Sidebar/Sidebar';
import Home from '../Components/Admin/Home/Home';
import NotFound from '../Components/Admin/NotFound/NotFound';
import AdminProfile from "../Components/Admin/Profile/AdminProfile"
import { Route, Routes } from 'react-router-dom';

const AdminPage = () => {
  return (
    <>

      <Sidebar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/users" element={<UserDetails />} />
        <Route path="/profile" element={<AdminProfile />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default AdminPage;
