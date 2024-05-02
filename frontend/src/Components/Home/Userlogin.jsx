import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import baseUrl from "../api"
import axios from 'axios'
import { Toaster, toast } from 'react-hot-toast';
// import "./login.css"

const Userlogin = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${baseUrl}/user/login`, { email, password });
      // console.log(response);
      // const role =response.data.data.role;
      const userId = response.data.data.userId;
      const token = response.data.data.token;
      if (response.status == 200) {
        localStorage.setItem("token", token);
        localStorage.setItem("userId", userId);
        toast.success("Login success");
        setTimeout(() => {
          navigate("/user")
        }, 1000);
      }
    } catch (error) {
      // console.log(error.response.data.message);
      setError(error.response.data.message);

    }
  }

  return (
    <>
      <div className="login-page">
        <Toaster />
        <div className="form">
          <h3>User Login</h3>

          <form className="login-form">
            <input type="text" placeholder="Email" onChange={(e) => { setEmail(e.target.value) }} />
            <input type="password" placeholder="password" onChange={(e) => { setPassword(e.target.value) }} />
            <button onClick={handleLogin}>login</button>
            {error && <p className="error-message">{error}</p>}
            <p className="message">
              Not registered? <Link to="/user-signup">Create an account</Link>
            </p>
          </form>
        </div>
      </div>

    </>
  )
}

export default Userlogin