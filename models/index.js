const { model, Schema } = require('mongoose')

const Jeopardy = require('./Jeopardy.js')(model, Schema)
const Score = require('./Score.js')(model, Schema)
const Trivia = require('./Trivia.js')(model, Schema)
const User = require('./User.js')(model, Schema)

module.exports = { Jeopardy, Score, Trivia, User }
