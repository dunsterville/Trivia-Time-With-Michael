module.exports = app => {
  require('./jeopardyRoutes.js')(app)
  require('./scoreRoutes.js')(app)
  require('./triviaRoutes.js')(app)
  require('./userRoutes.js')(app)
}