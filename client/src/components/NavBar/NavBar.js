import React from "react"
import './NavBar.css'

import logo from '../../images/TTWMLogo.svg'
import background from '../../images/background.png'
import shoverBenu from '../../images/Shover_Benu.svg'
import xImage from '../../images/x.svg'

const NavBar = _ => {
  
  const handleToggleBurger = () => {
    let x = document.getElementById('nav')
    if (x.className !== 'responsive') {
      x.className = 'responsive'
      document.querySelector('#hamburgerMenu .hamburgerClose').style.display = 'block'
      document.querySelector('#hamburgerMenu .hamburger-text').style.display = 'none'
    } else {
      document.querySelector('#hamburgerMenu .hamburgerClose').style.display = 'none'
      document.querySelector('#hamburgerMenu .hamburger-text').style.display = 'block'
      x.className = ''
    }
  }

  return (
    <>
      <nav id="nav">
      <img src={shoverBenu} alt="hidden" className="hidden" />
        <div className="container">
          {(window.location.pathname === '/') ? <a href="/signin">Sign In</a> : ''}
          {(window.location.pathname === '/')  ? <a href="/signup">Sign Up</a> : ''}
          {(window.location.pathname === '/game' || window.location.pathname === '/admin') ? <a href="/logout">Logout</a> : ''}
          <button onClick={handleToggleBurger} className="icon" id="hamburgerMenu">
            <span className="hamburger-text">🍔</span>
            <img src={xImage} className="hamburgerClose" alt="close" />
          </button>
        </div>
      </nav>
      <img className="desktop-logo-container" src={background} alt="background" />
      <div className="container container-logo">
        <a href="./">
          <img className="logo" src={logo} alt="logo" />
        </a>
      </div>
    </>
  )
}

export default NavBar