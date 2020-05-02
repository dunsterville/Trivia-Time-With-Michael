const { Trivia } = require('../models')

module.exports = app => {
  
  // Get all Trivia (Not sure if we need this if comments are gonna be populated onto the Polls, leaving it in for testing -Michael)
  app.get('/api/trivia', (req, res) => {
    Trivia.find()
      .then(trivia => res.json(trivia))
      .catch(err => console.error(err))
  })

  // Post one Trivia
  app.post('/api/trivia', (req, res) => {
    Trivia.create(req.body)
      .then(() => res.sendStatus(200))
      .catch(err => console.error(err))
  })

  // Update one Trivia
  app.put('/api/trivia/:id', (req, res) => {
    Trivia.findByIdAndUpdate(req.params.id, req.body)
      .then(() => res.sendStatus(200))
      .catch(err => console.error(err))
  })

  // Delete one Trivia
  app.delete('/api/trivia/:id',  (req, res) => {
    Trivia.findByIdAndDelete(req.params.id)
      .then(() => res.sendStatus(200))
      .catch(err => console.error(err))
  })

}