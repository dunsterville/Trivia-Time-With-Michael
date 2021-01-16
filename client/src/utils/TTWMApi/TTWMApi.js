import axios from 'axios'
// Change out functions
const TTWMApi = {
  // Page Routes

  // Score Routes
  getAllScores: () => axios.get('/api/score'),
  postScore: (score) => axios.post('/api/score', score),
  // Unsure if put & delete routes are necessary
  updateScore: (id, score) => axios.put(`/api/score/${id}`, score),
  deleteScore: (id) => axios.delete(`/api/score/${id}`),
  
  // User Routes
  registerUser: (user) => axios.post('/api/register', user),
  loginUser: (user) => axios.post('/api/login', user),
  usernameAvailable: (user) => axios.post('/api/username', user),
  authorize: (token) => axios.post('/api/authorize', {}, {
    headers: { 'Authorization': 'Bearer ' + token }
  })
}

export default TTWMApi