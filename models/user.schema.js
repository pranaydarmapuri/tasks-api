const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'User name is required.'],
  },
  username: {
    type: String,
    required: [true, 'username is required.'],
    unique: [true, 'username already exists'],
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: [true, 'Password is required.'],
    trim: true
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    required: [true, 'username is required.'],
    unique: [true, 'email already exists'],
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
  },
  refreshTokens: [{
    type: String
  }]
}, {
  collection: 'users',
  timestamps: true
})

module.exports = mongoose.model('User', userSchema)