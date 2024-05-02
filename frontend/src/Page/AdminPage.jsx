import React from 'react';
import PatientDetails from "../Components/Admin/PatientDetails/PatinetDetails"
import Sidebar from '../Components/Admin/Sidebar/Sidebar';
import Home from '../Components/Admin/Home/Home';
import NotFound from '../Components/Admin/NotFound/NotFound';
import AdminProfile from "../Components/Admin/Profile/AdminProfile"
import CreatePatient from "../Components/Admin/Patient/CreatePatient"
import EditPatient from '../Components/Admin/EditPatinet/EditPatient';
import { Route, Routes } from 'react-router-dom';

const AdminPage = () => {
  return (
    <>

      <Sidebar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/patient" element={<PatientDetails />} />
        <Route path="/profile" element={<AdminProfile />} />
        <Route path="/create" element={<CreatePatient />} />
        <Route path="/edit-patient/:id" element={<EditPatient />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default AdminPage;
