const mongoose = require('mongoose')
const User = require('./User')

const taskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  dueDate: {
    type: String,
    required: true
  },
  isComplete: {
    type: Boolean,
    default: false
  },
  users: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }]
})

const Task = mongoose.model('Task', taskSchema)

module.exports = Task
