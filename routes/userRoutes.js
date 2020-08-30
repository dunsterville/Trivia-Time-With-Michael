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
    // Generate gravatar img link
    // const hash = crypto.createHash('md5').update(req.body.email).digest("hex")
    // const avatar = `https://www.gravatar.com/avatar/${hash}?s=100&d=https%3A%2F%2Fs3.amazonaws.com%2F37assets%2Fsvn%2F765-default-avatar.png`
    const { username, avatar } = req.body
    User.register(new User({ username, avatar }),
      req.body.password, (err, user) => {
        if(err) {
          console.error(err)
        }
        res.json(user ? {
          username: user.username,
          avatar: user.avatar,
          userId: user._id,
          token: jwt.sign({ id: user._id },
          process.env.SECRET)
        } : user)
      })
  })

  // Login User
  app.post('/api/login', (req, res) => {
    User.authenticate()(req.body.username, req.body.password, (err, user) => {
      if(err) {
        console.error(err)
      }

      res.json(user ? {
        username: user.username,
        avatar: user.avatar,
        userId: user._id,
        token: jwt.sign({ id: user._id },
        process.env.SECRET)
      } : user)
    })
  })

  // Check if username is available
  app.post('/api/username', (req,res) => {
    User.findOne({username: req.body.username})
      .then((err, user) => {
        if (err) {
          if (e.username === req.body.username) {
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
    User.findOne({username: req.body.username})
      .then((err, user) => {
        if (err)  {
          if (err.username) {
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