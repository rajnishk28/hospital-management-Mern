import { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import "./nav.css";

const Navbar = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/user-login");
      return;
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    navigate("/");
  }

  return (
    <nav className='container-nav'>
      <div className="left"> <Link to={"/user"} className="left">DashBoard</Link></div>

      <div className="right" />
      <ul className='ul-item'>
        <Link to={"/user"} className='list-item' >Home</Link>
        <li className='list-item' >About</li>
        <li className='list-item' >Services</li>
        <Link to={"/user/profile"} className='list-item'>  Profile</Link>
        {/* <li className='list-item' >Contact Me</li> */}
        <li className='list-item'  onClick={handleLogout}>Log Out</li>
      </ul>
    </nav>
  );
}

export default Navbar;
