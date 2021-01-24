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
      <button class="icon" id="hamburgerMenu">
        <i class="fa fa-bars"></i>
      </button>
    </nav>
  )
}

export default NavBar