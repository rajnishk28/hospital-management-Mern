import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import baseUrl from "../api"
import axios from 'axios'
import "./adminlogin.css"
import { Toaster,toast  } from 'react-hot-toast';

const AdminLogin = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${baseUrl}/admin/login`, { email, password });
      // console.log(response);
      const role =response.data.data.role;
      const userId =response.data.data.id;
      const  token  = response.data.data.token
      console.log(token)

      if (response.status == 200 && role =="admin") {
        const  token  = response.data.data.token;
        localStorage.setItem('token', token);
        localStorage.setItem('userId', userId);
        toast.success("Login success")

        setTimeout(()=>{
          navigate('/admin');
        },1000)
      }


    } catch (error) {
      console.log(error.response.data.error);
      setError(error.response.data.error);

    }
  }

  return (
    <>
      <div className="login-page">
        <Toaster/>
        <div className="form">
        <h3>Doctor Login</h3>

          <form className="login-form">
            <input type="text" placeholder="Email" onChange={(e) => { setEmail(e.target.value) }} />
            <input type="password" placeholder="password" onChange={(e) => { setPassword(e.target.value) }} />
            <button onClick={handleLogin}>login</button>
            {error && <p className="error-message">{error}</p>}
            <p className="message">
              Not registered? <Link to="/admin-signup">Create an account</Link>
            </p>
          </form>
        </div>
      </div>

    </>
  )
}

export default AdminLogin