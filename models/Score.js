module.exports = (model, Schema) => {

  const Score = new Schema({
    score: { type: Number, required: true },
    date: { type: Date, default: Date.now},
    user: { type: Schema.Types.ObjectId, ref: 'User'},
  }, {timestamps: {createdAt: 'createdAt', updatedAt: 'updatedAt'}})

  return model('Score', Score)
}