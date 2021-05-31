import React from 'react'
import NavBar from '../../components/NavBar'
import useSound from 'use-sound'

// Images
import michael from '../../images/michael.png'
import ding from '../../images/ding.svg'
import squaredots from '../../images/squaredots.svg'

// Audio
import jingle from '../../sounds/Trivia Time With Michael.mp3'


const HomePage = () => {
  
  // const handlePlayJingle = () => {
  //   let audio = document.getElementById('audio')
  //   audio.play()
  // }

  const [play, { isPlaying }] = useSound(jingle, {
    volume: 0.5,
  });

  const handlePlayJingle = () => {
    if(!isPlaying) {
      play();
    }
  };


  return (
    <>
      <NavBar />

      <div className="container headline">
        <img className="michael" src={michael} alt="michael" />
        <h1><span className="yellow-text">Trivia time</span><br />with Michael!</h1>
        <img className="ding" id="themeSong" src={ding} alt="ding!" onClick={handlePlayJingle} />
      </div>

      <div className="image-container container">
        <img className="square-dots" src={squaredots} alt="background" />
        <div className="main display-flex">
          <div className="card">
            <h3>Please Sign In or Create an Account</h3>
            <a className="button-yellow" href="/signin">Sign In</a>
            <a className="button-yellow" href="/signup">Create Account</a>
          </div>
        </div>
      </div>
    </>
  )
}

export default HomePage