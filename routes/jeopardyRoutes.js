const { Jeopardy } = require('../models')

module.exports = app => {
  
  // Get all Jeopardy (Not sure if we need this if comments are gonna be populated onto the Polls, leaving it in for testing -Michael)
  app.get('/api/jeopardy', (req, res) => {
    Jeopardy.find()
      .then(jeopardy => res.json(jeopardy))
      .catch(err => console.error(err))
  })

  // Post one Jeopardy
  app.post('/api/jeopardy', (req, res) => {
    Jeopardy.create(req.body)
      .then(() => res.sendStatus(200))
      .catch(err => console.error(err))
  })

  // Update one Jeopardy
  app.put('/api/jeopardy/:id', (req, res) => {
    Jeopardy.findByIdAndUpdate(req.params.id, req.body)
      .then(() => res.sendStatus(200))
      .catch(err => console.error(err))
  })

  // Delete one Jeopardy
  app.delete('/api/jeopardy/:id',  (req, res) => {
    Jeopardy.findByIdAndDelete(req.params.id)
      .then(() => res.sendStatus(200))
      .catch(err => console.error(err))
  })

}