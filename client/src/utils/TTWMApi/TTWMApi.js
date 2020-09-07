import axios from 'axios'
// Change out functions
const TTWMApi = {
  // Page Routes

  // Element Routes
  
  // User Routes
  registerUser: (user) => axios.post('/api/register', user),
  loginUser: (user) => axios.post('/api/login', user),
  usernameAvailable: (user) => axios.post('/api/username', user),
  authorize: (token) => axios.post('/api/authorize', {}, {
    headers: { 'Authorization': 'Bearer ' + token }
  })
}

export default TTWMApi