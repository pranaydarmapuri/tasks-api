const mongoose = require('mongoose')

const todoSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    // required: [true, 'User for todo is required.']
  },
  title: {
    type: String,
    required: [true, 'title is required for todo.']
  },
  isDone: {
    type: Boolean,
    default: false
  },
  num: {
    type: Number
  }
}, {
  collection: 'todos',
  timestamps: true
})

module.exports = mongoose.model('Todo', todoSchema)