require('dotenv').config()
const express = require('express')
const { join } = require('path')

//const db = require('./config')
const app = express()

app.use(express.static(join(__dirname, 'public'), {extensions: ['html']}))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

require('./routes')(app)

require('mongoose').connect(process.env.NODE_ENV === 'production' ? process.env.MONGODB_URI : 'mongodb://localhost:27017/trivia_time_with_michael', {
  useCreateIndex: true,
  useFindAndModify: true,
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => app.listen(process.env.PORT))
  .catch(e => console.log(e))
