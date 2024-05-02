import React from 'react'
import "./banner.css"
import image from "./image.jpg"

const Banner = () => {
  return (
    <>
      <section className="ban_sec">
  <div className="container-sec">
    <div className="ban_img">
      <img src={image} alt="banner" border={0} />
      <div className="ban_text">
        <strong>
          <span>Meeting current</span>
          <br /> needs now
        </strong>
        <p>
          You can prioritize a child’s mental, emotional, <br />
          behavioral, and physical health{" "}
        </p>
        <a href="#">Lend a hand</a>
      </div>
    </div>
  </div>
</section>
    </>
  )
}

export default Banner