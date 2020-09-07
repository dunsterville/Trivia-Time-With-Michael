import { createContext } from 'react'

const UserContext = createContext({
  username: '',
  password: '',
  signature: '',
  token: '',
  handleOnSubmit: () => { }
})

export default UserContext