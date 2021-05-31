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
  emailAvailable: (user) => axios.post('/api/email', user),
  authorize: (token, email) => axios.post('/api/authorize', {email}, {
    headers: { 'Authorization': 'Bearer ' + token }
  }),
  authorizeAdmin: (token, email) => axios.post('/api/authorize/admin', {email}, {
    headers: { 'Authorization': 'Bearer ' + token }
  })
}

export default TTWMApi