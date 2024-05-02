import React, { useEffect, useState } from 'react';
import axios from 'axios';
import baseUrl from "../../api";
import "./profile.css";
import { useNavigate } from 'react-router-dom';
import { Toaster,toast } from 'react-hot-toast';


const AdminProfile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [message,setMessage]=useState(null);
  const [updatedUser, setUpdatedUser] = useState({
    name: "",
    email: "",
  });
  const [editField, setEditField] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const userId = localStorage.getItem("userId");

        if (!token) {
          navigate("/admin-login");
          return;
        }

        const response = await axios.get(`${baseUrl}/admin/findone/${userId}`, {
          headers: {
            token: `Bearer ${token}`,
          },
        });
        // console.log(response)
        setUser(response.data.admin);
      } catch (error) {
        console.error(error);
        if (error.response && error.response.status === 403) {
          // Unauthorized access, token is not valid
          navigate("/admin-login");
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
        `${baseUrl}/admin/update/${userId}`,
        updatedUser,
        {
          headers: {
            token: `Bearer ${token}`,
          },
        }
      );
      // console.log(response);

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
      toast.success("update success")
    }
    setEditField(null);
  };


  const handleDeleteAdmin = async() => {
    try {
      const userId = localStorage.getItem("userId");
      const token = localStorage.getItem("token");

      const response = await axios.delete(
        `${baseUrl}/admin/delete/${userId}`,
        {
          headers: {
            token: `Bearer ${token}`,
          },
        }
        );
        // console.log(response);
        // setMessage(response.data.message)
        toast.success(response.data.message)

          setTimeout(() => {
            if(response.status==200){
              localStorage.removeItem("token");
              localStorage.removeItem("userId");
              navigate("/admin-login");
              return;
            }
          }, 1000);
    } catch (error) {
      console.error("Error updating user:", error);
    }
  }

  return (
    <div className='user-container'>
      <Toaster/>
      <h2>User Details</h2>
      {user ? (

        <div className='user-item'>
          <p>
            <strong>Name:</strong>
            {editField === 'name' ? (
              <input
                type="text"
                value={updatedUser.name}
                onChange={(e) =>
                  setUpdatedUser({ ...updatedUser, name: e.target.value })
                }
              />
            ) : (
              <span>{user.name}</span>
            )}
            <button onClick={handleEditClick.bind(null, 'name')}>
              {editField === 'name' ? 'Cancel' : 'Edit'}
            </button>
          </p>

          <p>
            <strong>Email:</strong>

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

          <button onClick={handleSaveClick} disabled={!editField}>
            Save
          </button>
          <div className='delete-admin'>
            <h3>Delete Your Account</h3>
            <button onClick={handleDeleteAdmin}>
              Delete
            </button>
          </div>
        </div>

      ) : (
        <p>Loading user details...</p>
      )}
    </div>
  );
};

export default AdminProfile;
