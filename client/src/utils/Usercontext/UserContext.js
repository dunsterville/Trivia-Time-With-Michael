import { createContext } from 'react'

const UserContext = createContext({
  username: '',
  password: '',
  sigCanvas: '',
  token: '',
  handleOnSubmit: () => { }
})

export default UserContext