import React, { useEffect, useState } from 'react';
import axios from 'axios';
import baseUrl from "../../api";
import "./index.css";
import { useNavigate } from 'react-router-dom';

const UserDetails = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [updatedUser, setUpdatedUser] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
  });
  const [editField, setEditField] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const userId = localStorage.getItem("userId");

        if (!token) {
          navigate("/user-login");
          return;
        }

        const response = await axios.get(`${baseUrl}/user/findone/${userId}`, {
          headers: {
            token: `Bearer ${token}`,
          },
        });

        setUser(response.data.user);
      } catch (error) {
        console.error(error);
        if (error.response && error.response.status === 403) {
          // Unauthorized access, token is not valid
          navigate("/user-login");
        }
      }
    };

    fetchData();
  }, [navigate]);

  const handleUpdateUser = async () => {
    try {
      const userId = localStorage.getItem("userId");
      const token = localStorage.getItem("token");

      const response = await axios.put(
        `${baseUrl}/user/update/${userId}`,
        updatedUser,
        {
          headers: {
            token: `Bearer ${token}`,
          },
        }
      );

      setUser(response.data.user);
      setEditField(null);
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const handleEditClick = (field) => {
    if (editField === field) {
      // If clicking on the same field, cancel editing
      setEditField(null);
    } else {
      setEditField(field);
      setUpdatedUser({ ...updatedUser, [field]: user[field] });
    }
  };

  const handleSaveClick = () => {
    if (editField) {
      // If in editing mode, save changes
      handleUpdateUser();
    }
    setEditField(null);
  };

  return (
    <div className='user-container'>
      <h2>User Details</h2>
      {user ? (
        <div className='user-item'>
          <p>
            <strong>Full Name:</strong>{' '}
            {editField === 'fullName' ? (
              <input
                type="text"
                value={updatedUser.fullName}
                onChange={(e) =>
                  setUpdatedUser({ ...updatedUser, fullName: e.target.value })
                }
              />
            ) : (
              <span>{user.fullName}</span>
            )}
            <button onClick={handleEditClick.bind(null, 'fullName')}>
              {editField === 'fullName' ? 'Cancel' : 'Edit'}
            </button>
          </p>
          <p>
            <strong>Email:</strong>{' '}
            {editField === 'email' ? (
              <input
                type="email"
                value={updatedUser.email}
                onChange={(e) =>
                  setUpdatedUser({ ...updatedUser, email: e.target.value })
                }
              />
            ) : (
              <span>{user.email}</span>
            )}
            <button onClick={handleEditClick.bind(null, 'email')}>
              {editField === 'email' ? 'Cancel' : 'Edit'}
            </button>
          </p>
          <p>
            <strong>Phone Number:</strong>{' '}
            {editField === 'phoneNumber' ? (
              <input
                type="tel"
                value={updatedUser.phoneNumber}
                onChange={(e) =>
                  setUpdatedUser({ ...updatedUser, phoneNumber: e.target.value })
                }
              />
            ) : (
              <span>{user.phoneNumber}</span>
            )}
            <button onClick={handleEditClick.bind(null, 'phoneNumber')}>
              {editField === 'phoneNumber' ? 'Cancel' : 'Edit'}
            </button>
          </p>
          <button onClick={handleSaveClick} disabled={!editField}>
            Save
          </button>
        </div>
      ) : (
        <p>Loading user details...</p>
      )}
    </div>
  );
};

export default UserDetails;
