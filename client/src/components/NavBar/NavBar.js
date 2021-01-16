import React from "react"
import './NavBar.css'
import logo from '../../images/TTWMLogo.svg'

const NavBar = _ => {
  

  return (
    <nav id="nav">
      <img src={logo} alt="logo" />
      <a href="./">Home</a>
      <a href="./standings">Standings</a>
      <p>About</p>
      <a href="javascript:void(0);" class="icon" id="hamburgerMenu">
        <i class="fa fa-bars"></i>
      </a>
    </nav>
  )
}

export default NavBar