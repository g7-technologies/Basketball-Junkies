
import React from 'react'


function Navbar() {
  


function handleClick(){
  const linkNav = document.querySelector('.navLi');
  let mobileModal = document.querySelector('.modal');
  mobileModal.style.display="none";
}
  return (
<div className="header">
    <div className="container">
      <nav className="navbar navbar-expand-lg navbar-light ">
        <div className="logo"><a href="#"><img src="images/logo.png"  alt=""/></a></div>
        <ul className="navbar-nav ml-auto  d-md-block d-none">
          <li><a href="#benefits">BENEFITS</a></li>
          <li><a href="#ROADMAP">ROAD MAP</a></li>
          <li><a href="#MINTNOW">MINT NOW</a></li>
        </ul>
      </nav>
    </div>
    <div className="mobileheader d-md-none d-block">
      <button type="button" className="btn " data-toggle="modal" data-target="#exampleModal">
        <span className="material-icons">
          menu
          </span>
      </button>
    </div>
    <div className="modal hidden modal-right fade" id="exampleModal"  aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
    
   <div className="modal-header">
         
    <button type="button" className="close modalButton" data-dismiss="modal" aria-label="Close">
      <span className="material-icons">
        close
        </span>
    </button>
   </div>
     
      <div className="modal-body header">
        <ul className="navbar-nav mr-auto  d-md-none d-block">
          <li className="navLi"  onClick={handleClick}><a href="#benefits"   className="benfites" >BENEFITS</a></li>
          <li className="navLi"  onClick={handleClick}><a href="#ROADMAP" className="benfites" >ROAD MAP</a></li>
          <li className="navLi"  onClick={handleClick}><a href="#MINTNOW" className="benfites" >MINT NOW</a></li>
          </ul>
      </div>
   
    </div>
  </div>
</div>
</div>




  )
}

export default Navbar