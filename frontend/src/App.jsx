import React from 'react';
import UserPage from './Page/UserPage';
import AdminPage from './Page/AdminPage';
import Homepage from './Page/Homepage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/*" element={<Homepage />} />
        <Route path="/user/*" element={<UserPage />} />
        <Route path="/admin/*" element={<AdminPage />} />
      </Routes>
    </Router>
  );
};

export default App;
