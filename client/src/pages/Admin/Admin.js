import React, { useEffect, useState } from 'react'
import { io } from 'socket.io-client'

const socket = io()

const Admin = _ => {

  const [userState, userSetState] = useState({
    email: '',
    avatar: '',
    disabled: false
  })

  const [chat, setChat] = useState([])

  const [gameState, setGameState] = useState({
    questionStatus: false
  })

  gameState.finishedQuestion = e => {
    setChat([])
    socket.emit('updateQuestionStatus', {questionStatus: true})
    setGameState({...gameState, questionStatus: true})
  }

  gameState.resetQuestion = e => {
    setChat([])
    socket.emit('updateQuestionStatus', {questionStatus: false})
    setGameState({...gameState, questionStatus: false})
  }

  userState.renderChat = e => {
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
    socket.on('userBuzzedIn', user => {
      setChat([...chat, {email: user.buzzedIn.email, avatar: user.buzzedIn.avatar }])
    })
  }, [])


  return (
    <div className="container">
      <h2>Welcome Admin: <span>{JSON.parse(sessionStorage.getItem('userInfo')).email}</span></h2>
      <button type="button" onClick={gameState.finishedQuestion}>Finished Question</button>
      <button type="button" onClick={gameState.resetQuestion}>Reset Question</button>
      <div id="questionStatus">Buzzers Open: {gameState.questionStatus + ''}</div>
      <div id="buzzedIn">{userState.renderChat()}</div>
    </div>
  )
}

export default Admin