const mongoose = require('mongoose')
const Task = require('./Task')

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  tasks:[{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Task'
  }]
})

const User = mongoose.model('User', userSchema)

module.exports = User
