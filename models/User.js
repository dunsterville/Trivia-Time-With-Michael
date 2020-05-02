module.exports = (model, Schema) => {

  const User = new Schema({
    name: { type: String, required: true }
  }, 
  { 
    toJSON: { virtuals: true },
    timestamps: {createdAt: 'createdAt', updatedAt: 'updatedAt'}
  })

  User.virtual('scores', {
    ref: 'Score',
    localField: '_id',
    foreignField: 'user'
  })


  return model('User', User)
}