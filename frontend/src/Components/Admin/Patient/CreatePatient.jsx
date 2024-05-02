import React, { useState } from 'react';
import axios from 'axios';
import './index.css';
import { Toaster,toast  } from 'react-hot-toast';
import baseUrl from "../../api";

const CreatePatient = () => {
  const [fullName, setFullName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState("Male");
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const[message,setMessage]=useState('')

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${baseUrl}/patient/create`,
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
      // console.log(response.data); 
      toast.success(response.data.message);
      
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
      <h2>Create Patient Record</h2>
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
        <button onClick={handleSubmit}>Create Record</button>
      </form>
    </div>
  );
};

export default CreatePatient;
