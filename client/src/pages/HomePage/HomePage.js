import React from 'react'
import NavBar from '../../components/NavBar'


const HomePage = _ => {


  return (
    <>
      <NavBar />
      <div class="container">
        <h2>Welcome: <span id="userUsername"></span></h2>
        <div id="buzzedIn"></div>
      </div>
    </>
  )
}

export default HomePage