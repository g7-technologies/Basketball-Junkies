import React from 'react';

function Banner() {
  return (
    <div className="banner">
      <div className="d-flex">
        <div className="banner-img full-img-gif">
          <img src="images/intro.gif" alt=""/>
        </div>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-lg-5">
            <h1>WELCOME TO <strong>BASKETBALL JUNKIES</strong></h1>
            <p>For the online leaders, you lead and the world follows.</p>
            <div className="row no-gutters">
              <div className="col-6 full-img mt-4">
                <img src="images/banner_img1.png" alt=""/>
              </div>
              <div className="col-6 full-img mt-4">
                <img src="images/banner_img2.png" alt=""/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Banner