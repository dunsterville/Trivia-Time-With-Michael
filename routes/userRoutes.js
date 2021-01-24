const { User } = require('../models')
const jwt = require('jsonwebtoken')
const passport = require('passport')
const crypto = require('crypto')

module.exports = app => {
  
  // Get all Scores
  app.get('/api/user', (req, res) => {
    User.find()
      .populate({path: 'scores'})
      .then(user => res.json(user))
      .catch(err => console.error(err))
  })

  // Register User
  app.post('/api/register', (req, res) => {
    const { email, avatar } = req.body
    User.register(new User({ email, avatar }),
      req.body.password, (err, user) => {
        if(err) {
          console.error(err)
        }
        res.json(user ? {
          email: user.email,
          avatar: user.avatar,
          userId: user._id,
          token: jwt.sign({ id: user._id },
          process.env.SECRET)
        } : user)
      })
  })

  // Login User
  app.post('/api/login', (req, res) => {
    User.authenticate()(req.body.email, req.body.password, (err, user) => {
      if(err) {
        console.error(err)
      }

      res.json(user ? {
        email: user.email,
        avatar: user.avatar,
        userId: user._id,
        token: jwt.sign({ id: user._id },
        process.env.SECRET)
      } : user)
    })
  })

  // Check if email is available
  app.post('/api/email', (req,res) => {
    User.findOne({email: req.body.email})
      .then((err, user) => {
        if (err) {
          if (e.email === req.body.email) {
            res.sendStatus(409)
          } else {
            console.error(err)
          }
        } else {
          res.sendStatus(200)
        }
      })
      .catch(err => console.error(err))
  })

  // Check if user is authorized
  app.post('/api/authorize', passport.authenticate('jwt'), (req,res) => {
    User.findOne({email: req.body.email})
      .then((err, user) => {
        if (err)  {
          if (err.email) {
            res.json({ admin: err.admin})
          } else {
            console.log(err)
            res.sendStatus(401)
          }
        } else {
          console.log(err)
          res.sendStatus(401)
        }
      })
      .catch(err => console.error(err))
  })

}