const mongoose = require('mongoose')

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
})

const Task = mongoose.model('Task', taskSchema)

module.exports = Task
