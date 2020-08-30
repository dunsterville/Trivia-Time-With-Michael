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
let buzzedIn = false

io.on('connection', (socket) => {
  console.log('a user connected')
  socket.on('buzzed in', (user) => {
    console.log(`${user} Buzzed In`)
    if (!buzzedIn) {
      //buzzedIn = true
      io.emit('userBuzzedIn', { user })
    }
  })
})


app.use(express.static(join(__dirname, 'public'), {extensions: ['html'], dotfiles: 'allow' }))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// userAuth
const { User } = require('./models')
app.use(passport.initialize())
app.use(passport.session())

passport.use(new Strategy(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

passport.use(new JWTStrategy({jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), secretOrKey: process.env.SECRET}, ({ id }, cb) => User.findById(id)
  .then(user => cb(null, user))
  .catch(e => cb(e))))


require('./routes')(app)

require('mongoose').connect(process.env.NODE_ENV === 'production' ? process.env.MONGODB_URI : 'mongodb://localhost:27017/trivia_time_with_michael', {
  useCreateIndex: true,
  useFindAndModify: true,
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => http.listen(process.env.PORT || 3000))
  .catch(e => console.log(e))
