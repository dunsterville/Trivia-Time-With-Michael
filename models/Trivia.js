module.exports = (model, Schema) => {

  const Trivia = new Schema({
    trivia: { type: String, required: true },
    answer: { type: String, required: true},
    date: { type: Date, default: Date.now},
  }, {timestamps: {createdAt: 'createdAt', updatedAt: 'updatedAt'}})

  return model('Trivia', Trivia)
}