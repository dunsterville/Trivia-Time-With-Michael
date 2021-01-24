module.exports = (model, Schema) => {

  const User = new Schema({
    email: String,
    avatar: String,
    admin: {type: Boolean, default: false}
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

  User.plugin(require('passport-local-mongoose'))


  return model('User', User)
}