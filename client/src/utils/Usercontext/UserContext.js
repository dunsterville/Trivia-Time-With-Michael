import { createContext } from 'react'

const UserContext = createContext({
  email: '',
  password: '',
  sigCanvas: '',
  token: '',
  handleOnSubmit: () => { }
})

export default UserContext