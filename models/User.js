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

  User.plugin(require('passport-local-mongoose'), {usernameField: 'email', limitAttempts: true, maxAttempts: 10})


  return model('User', User)
}