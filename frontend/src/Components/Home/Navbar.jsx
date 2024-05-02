import { useEffect } from 'react';
import {  Link } from 'react-router-dom';
import "./navbar.css";

const Navbar = () => {


 

  return (
    <nav className='nav-container'>
      <Link to={"/"} className="left">Unsplash</Link>

      <div className="right" />
      <ul className='ul-item'>
        <Link to={"/"} className='list-item' >Home</Link>
        <li className='list-item' >About</li>
        <li className='list-item' >Services</li>

        <li className="nav-item dropdown list-item">
          <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Signup
          </a>
          <ul className="dropdown-menu">
            <li><Link className="dropdown-item" to={"/admin-signup"}>Admin</Link></li>
            <li><Link className="dropdown-item" to={"/user-signup"}>User</Link></li>

          </ul>
        </li>

        <li className="nav-item dropdown list-item">
          <a className="nav-link dropdown-toggle"  role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Login
          </a>
          <ul className="dropdown-menu">
            <li><Link className="dropdown-item" to={"/admin-login"}>Admin</Link></li>
            <li><Link className="dropdown-item" to={"/user-login"}>User</Link></li>

          </ul>
        </li>

        {/* <li className='list-item'  onClick={handleLogout}>Log Out</li> */}
      </ul>
    </nav>
  );
}

export default Navbar;
