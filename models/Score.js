module.exports = (model, Schema) => {

  const Score = new Schema({
    score: { type: Number, required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User'},
  }, {timestamps: {createdAt: 'createdAt', updatedAt: 'updatedAt'}})

  return model('Score', Score)
}