module.exports = io => {
  let buzzedIn = {}
  let finishedQuestion = false

  io.on('connection', (socket) => {

    socket.on('joining', (socketid) => {
      io.to(socketid).emit('userJoined', { buzzedIn }, finishedQuestion)
    })

    socket.on('updateQuestionStatus', ({questionStatus}) => {
      finishedQuestion = questionStatus
      buzzedIn = {}
      io.emit('questionStatusUpdate', {questionStatus})
    })


    socket.on('send', (user) => {
      if (Object.keys(buzzedIn).length === 0 && finishedQuestion) {
        buzzedIn = user
        io.emit('userBuzzedIn', { buzzedIn })
      }
    })
  })
}