module.exports = (model, Schema) => {

  const Jeopardy = new Schema({
    category: { type: String, required: true },
    answer: { type: String, required: true},
    question: { type: String, required: true},
    amount: { type: String, required: true},
    date: { type: Date, default: Date.now},
  }, {timestamps: {createdAt: 'createdAt', updatedAt: 'updatedAt'}})

  return model('Jeopardy', Jeopardy)
}