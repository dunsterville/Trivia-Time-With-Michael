const { Score } = require('../models')

module.exports = app => {
  
  // Get all Score (Not sure if we need this if comments are gonna be populated onto the Polls, leaving it in for testing -Michael)
  app.get('/api/score', (req, res) => {
    Score.find()
      .populate('user')
      .then(score => res.json(score))
      .catch(err => console.error(err))
  })

  // Post one Score
  app.post('/api/score', (req, res) => {
    Score.create(req.body)
      .then(() => res.sendStatus(200))
      .catch(err => console.error(err))
  })

  // Update one Score
  app.put('/api/score/:id', (req, res) => {
    Score.findByIdAndUpdate(req.params.id, req.body)
      .then(() => res.sendStatus(200))
      .catch(err => console.error(err))
  })

  // Delete one Score
  app.delete('/api/score/:id',  (req, res) => {
    Score.findByIdAndDelete(req.params.id)
      .then(() => res.sendStatus(200))
      .catch(err => console.error(err))
  })

}