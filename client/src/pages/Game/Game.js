import React, { useEffect, useState } from 'react'
// import GameScreen from '../../components/GameScreen'
// import UserContext from '../../utils/Usercontext'
import { io } from 'socket.io-client'
import NavBar from '../../components/NavBar'

const socket = io()

const Game = _ => {

  // const [userState, userSetState] = useState({
  //   email: '',
  //   avatar: '',
  // })

  const [chat, setChat] = useState([])

  const [gameState, setGameState] = useState({
    questionStatus: false,
    emitTimout: false,
    buzzInDisabled: false,
    userBuzedIn: false,
    buzzInText: 'Buzz In',
    buzzedInEmail: ''
  })

  gameState.handleBuzzIn = e => {
    // If question is not open, disable button
    if (gameState.questionStatus === false) {
      setGameState({...gameState, buzzInDisabled: true, buzzInText: 'Wait To Buzz In'})
    }
    
    // If question is open and no timeout, emit event
    if (gameState.questionStatus === true) {
      socket.emit('send', {email: JSON.parse(sessionStorage.getItem('userInfo')).email, avatar: JSON.parse(sessionStorage.getItem('userInfo')).avatar})
    }
  }

  chat.renderChat = e => {
    return chat.map(({ email, avatar }, index) => (
      <div key={index}>
        <h3 className="center-text">
          {email}
          <img src={avatar} alt="avatar"></img>
        </h3>
      </div>
    ))
  }
  

  useEffect(() => {
    socket.emit('joining', socket.id)
    // Connection check
    socket.on('connect', () => {
      console.log('connected')
      console.log(socket.id); // 'G5p5...'
    })

    socket.on('userJoined', (user, finishedQuestion) => {
      setGameState({...gameState, questionStatus: finishedQuestion})
      if (Object.keys(user.buzzedIn).length !== 0) {
        console.log('did it reach here')
        setGameState({...gameState, userBuzedIn: true, buzzedInEmail: user.buzzedIn.email})
      }
      setChat([...chat, {email: user.buzzedIn.email, avatar: user.buzzedIn.avatar }])
    })

    // Somone has Buzzed in
    socket.on('userBuzzedIn', user => {
      setGameState({...gameState, userBuzedIn: true, buzzedInEmail: user.buzzedIn.email})
      setChat([...chat, {email: user.buzzedIn.email, avatar: user.buzzedIn.avatar }])
    })

    // Question Status Update
    socket.on('questionStatusUpdate', status => {
      setChat([])
      setGameState({...gameState, questionStatus: status.questionStatus, userBuzedIn: false, buzzedInEmail: ''})
      // Re-enable Button if disabled
      if (gameState.buzzInDisabled === true) {
        setTimeout(() => {
          setGameState({...gameState, buzzInDisabled: false, buzzInText: 'Buzz In'})
        }, 500)
      }
    })

  }, [])


  return (
    <>
      <NavBar />
      <div className="container headline">
        <h4 className="center-text">Welcome</h4>
        <h3 className="center-text mt-10">{JSON.parse(sessionStorage.getItem('userInfo')) ? JSON.parse(sessionStorage.getItem('userInfo')).email : 'test'}</h3>
        <div className="card flip">
          <div className={gameState.userBuzedIn ? "content revealed" : "content"}>
            <div className="front">
              <button id="buzzIn" className="button-yellow buzzer" type="button" disabled={gameState.buzzInDisabled} onClick={gameState.handleBuzzIn}>{gameState.buzzInText}</button>
            </div>
            <div className={gameState.buzzedInEmail !== JSON.parse(sessionStorage.getItem('userInfo')).email ? "back sorry" : "back" }>
              <div id="buzzedIn">{chat.renderChat()}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Game