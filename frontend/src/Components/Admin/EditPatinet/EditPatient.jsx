import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import baseUrl from "../../api";
import { Toaster,toast  } from 'react-hot-toast';

const EditPatient = () => {
  const { id } = useParams(); // Move useParams inside the component

  const [fullName, setFullName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState("Male");
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${baseUrl}/patient/getone/${id}`, {
          headers: {
            'token': `Bearer ${localStorage.getItem('token')}`
          }
        });
        // console.log(id, response.data);
        const { fullName, age, gender, email, phone, address } = response.data;
        setFullName(fullName);
        setAge(age);
        setGender(gender);
        setEmail(email);
        setPhone(phone);
        setAddress(address);
      } catch (error) {
        console.error('Error fetching patient data:', error);
      }
    };

    fetchData(); 
  }, [id]); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `${baseUrl}/patient/update/${id}`,
        {
          fullName,
          age,
          gender,
          email,
          phone,
          address
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'token': `Bearer ${localStorage.getItem('token')}`
          }
        }
      );
    //   console.log(response.data); 
        toast.success("Patient record updated successfully")
      
      setFullName('');
      setAge('');
      setGender('Male');
      setEmail('');
      setPhone('');
      setAddress('');
    } catch (error) {
      console.error('Error submitting form:', error);
      setMessage(error.response.data.message)
    }
  };

  return (
    <div className="create-patient">
        <Toaster/>
      <h2>Update Patient Record</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="patientName">Patient Full Name:</label>
          <input
            type="text"
            id="patientName"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Enter patient name"
          />
        </div>
        <div className="form-group">
          <label htmlFor="age">Age:</label>
          <input
            type="number"
            id="age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            placeholder="Enter patient age"
          />
        </div>
        <div className="form-group">
          <label htmlFor="gender">Gender:</label>
          <select
            id="gender"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          >
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter patient email"
          />
        </div>
        <div className="form-group">
          <label htmlFor="phone">Phone:</label>
          <input
            type="tel"
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Enter patient phone number"
          />
        </div>
        <div className="form-group">
          <label htmlFor="address">Address:</label>
          <textarea
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Enter patient address"
          ></textarea>
        </div>
        {message && <p>{message}</p>}
        <button onClick={handleSubmit}>Save</button>
      </form>
    </div>
  );
};

export default EditPatient;
