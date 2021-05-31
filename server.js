require('dotenv').config()

const express = require('express')
const { join } = require('path')
const passport = require('passport')
const { Strategy } = require('passport-local')
const { Strategy: JWTStrategy, ExtractJwt } = require('passport-jwt')

//const db = require('./config')
const app = express()
const http = require('http').Server(app)
const io = require('socket.io')(http)

// Uncomment on Production
app.enable('trust proxy')
app.use((req, res, next) => {
    req.secure ? next() : res.redirect('https://' + req.headers.host + req.url)
})

app.use(express.static(join(__dirname, 'client', 'build'), {extensions: ['html'], dotfiles: 'allow' }))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// userAuth
const { User } = require('./models')
app.use(passport.initialize())
app.use(passport.session())

passport.use(User.createStrategy())
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

passport.use(new JWTStrategy({jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), secretOrKey: process.env.SECRET}, ({ id }, cb) => User.findById(id)
  .then(user => cb(null, user))
  .catch(e => cb(e))))


if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(join(__dirname, 'client/build')))
  // Handle React routing, return all requests to React app
  app.get('*', (request, response) => {
    response.sendFile(join(__dirname, 'client/build', 'index.html'))
  })
}
  
         
require('./routes')(app)

require('./socket')(io)


require('mongoose').connect(process.env.NODE_ENV === 'production' ? process.env.MONGODB_URI : 'mongodb://localhost:27017/trivia_time_with_michael', {
  useCreateIndex: true,
  useFindAndModify: true,
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => http.listen(process.env.PORT || 3001))
  .catch(e => console.log(e))

