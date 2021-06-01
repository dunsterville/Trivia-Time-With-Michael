import React, { useEffect, useState } from 'react'
// import GameScreen from '../../components/GameScreen'
// import UserContext from '../../utils/Usercontext'
import io from 'socket.io-client'
import NavBar from '../../components/NavBar'

const socket = io.connect('wss://dev.triviatimewithmichael.com/')

const Game = _ => {

  const [userState, userSetState] = useState({
    email: '',
    avatar: '',
  })

  const [chat, setChat] = useState([])

  const [gameState, setGameState] = useState({
    questionStatus: false,
    emitTimout: false,
    buzzInDisabled: false,
  })

  gameState.handleBuzzIn = e => {
    // If question is not open, disable button
    if (gameState.questionStatus === false) {
      setGameState({...gameState, buzzInDisabled: true})
    }
    
    // If question is open and no timeout, emit event
    if (gameState.questionStatus === true  && gameState.emitTimout === false) {
      setGameState({...gameState, emitTimout: true})
      console.log('inside send')
      socket.emit('send', {email: JSON.parse(sessionStorage.getItem('userInfo')).email, avatar: JSON.parse(sessionStorage.getItem('userInfo')).avatar})
      setTimeout(() => {
        setGameState({...gameState, emitTimout: false})
      }, 300)
    }
  }

  chat.renderChat = e => {
    return chat.map(({ email, avatar }, index) => (
      <div key={index}>
        <h3>
          User {email}:
          <img src={avatar} alt="avatar"></img>
        </h3>
      </div>
    ))
  }

  

  useEffect(() => {
    // Connection check
    socket.on('connect', () => {
      console.log('connected')
      console.log(socket.id); // 'G5p5...'
    })

    // Somone has Buzzed in
    socket.on('userBuzzedIn', user => {
      console.log(user)
      setChat([...chat, {email: user.buzzedIn.email, avatar: user.buzzedIn.avatar }])
      console.log(chat)
    })

    // Question Status Update
    socket.on('questionStatusUpdate', status => {
      setChat([])
      setGameState({...gameState, questionStatus: status.questionStatus})
      // Re-enable Button if disabled
      if (gameState.buzzInDisabled === true) {
        setTimeout(() => {
          setGameState({...gameState, buzzInDisabled: false})
        }, 500)
      }
    })

  }, [])


  return (
    <>
      <NavBar />
      <div className="container headline">
        <h2>Welcome: <span>{JSON.parse(sessionStorage.getItem('userInfo')) ? JSON.parse(sessionStorage.getItem('userInfo')).email : 'test'}</span></h2>
        <button className="button-yellow" type="button" disabled={gameState.buzzInDisabled} onClick={gameState.handleBuzzIn}>Buzz In</button>
        <div id="buzzedIn">{chat.renderChat()}</div>
      </div>
    </>
  )
}

export default Game