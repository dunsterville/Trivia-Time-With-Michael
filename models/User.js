module.exports = (model, Schema) => {

  const User = new Schema({
    name: { type: String, required: true },
    score: [{ type: Schema.Types.ObjectId, ref: 'Score'}],
  }, {timestamps: {createdAt: 'createdAt', updatedAt: 'updatedAt'}})

  return model('User', User)
}