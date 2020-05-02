const { User } = require('../models')

module.exports = app => {
  
  // Get all Score (Not sure if we need this if comments are gonna be populated onto the Polls, leaving it in for testing -Michael)
  app.get('/api/User', (req, res) => {
    User.find()
      .populate('score')
      .then(user => res.json(user))
      .catch(err => console.error(err))
  })

  // Post one User
  app.post('/api/user', (req, res) => {
    User.create(req.body)
      .then(() => res.sendStatus(200))
      .catch(err => console.error(err))
  })

  // Update one User
  app.post('/api/user/:id', (req, res) => {
    User.findByIdAndUpdate(req.params.id, req.body)
      .then(() => res.sendStatus(200))
      .catch(err => console.error(err))
  })

  // Delete one User
  app.post('api/user/:id',  (req, res) => {
    User.findByIdAndDelete(req.params.id)
      .then(() => res.sendStatus(200))
      .catch(err => console.error(err))
  })

}