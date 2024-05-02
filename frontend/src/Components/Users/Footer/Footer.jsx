import React from 'react'
import "./foot.css"

const Footer = () => {
  return (
    <footer className='footer-main'>
    <div className="top-footer">
    </div>
   
      <p>Follow me</p>
    <div className="footer-social-icons">
      <div className="icon">
        <a
          target="_blank"
          href="https://www.instagram.com/rajnishk17"
          className="uil uil-instagram"
        />
      </div>
      <div className="icon">
        <a
          target="_blank"
          href="https://www.linkedin.com/in/rajnish17"
          className="uil uil-linkedin-alt"
        />
      </div>
      <div className="icon">
        <a
          target="_blank"
          href="https://t.me/rajnisharyan12"
          className="uil uil-telegram"
        />
      </div>
      {/* <div className="icon">
        <a
          target="_blank"
          href="https://wa.me/7361085100"
          className="uil uil-whatsapp"
        />
      </div> */}
      <div className="icon">
        <a
          target="_blank"
          href="https://github.com/rajnish17"
          className="uil uil-github-alt"
        />
      </div>
      {/* <div className="icon">
        <a
          target="_blank"
          href="https://twitter.com/Rajnisharyan01"
          className="uil uil-twitter"
        />
      </div> */}
    </div>
    <div className="bottom-footer">
      <p>
        Copyright ©
        <a href="#home" style={{ textDecoration: "none" }}>
          Rajnish Aryan
        </a> 
        - All rights reserved
      </p>
    </div>
  </footer>
  
  )
}

export default Footer