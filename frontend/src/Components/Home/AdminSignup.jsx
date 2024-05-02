import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
// import "./signup.css"
import baseUrl from "../api"
import { Toaster,toast  } from 'react-hot-toast';



const AdminSignup = () => {
  const navigate = useNavigate();

  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState('');

  const handleSignup = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.post(`${baseUrl}/admin/signup`, { name, email,password });
       console.log(response);
      if (response.status == 201) {
        toast.success('Account created')
        setTimeout(()=>{
          navigate('/admin-login');
        },2000)
      }

    } catch (error) {
      // console.log(error);
      setError(error.response.data.error);

    }
  }

  return (
    <>
      <div className="login-page">
        <Toaster/>
        <div className="form">
        <h3>Admin Signup</h3>

          <form className="login-form">
            <input type="text" placeholder="Name" onChange={(e) => { setName(e.target.value) }} />
            <input type="email" placeholder="Email" onChange={(e) => { setEmail(e.target.value) }} />
            <input type="password" placeholder="Password" onChange={(e) => { setPassword(e.target.value) }} />
            <button onClick={handleSignup}>Signup</button>
            {error && <p className="error-message">{error}</p>}
            <p className="message">
              Already registered? <Link to="/admin-login">Login Here</Link>
            </p>
          </form>
        </div>
      </div>

    </>
  )
}

export default AdminSignup