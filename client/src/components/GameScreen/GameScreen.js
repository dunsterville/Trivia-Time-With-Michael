import React, { useContext } from 'react'
import UserContext from '../../utils/Usercontext'

const GameScreen = _ => {

  const { email, avatar, handleBuzzIn, renderChat } = useContext(UserContext)


  //const onSubmit = data => console.log(data, userState.sigCanvas.getTrimmedCanvas().toDataURL('image/svg+xml'))

  return (
    <div>
      
    </div>
  )
}

export default GameScreen
