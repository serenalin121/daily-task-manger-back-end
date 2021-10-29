const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const taskSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  dueDate: {
    type: String,
    required: true,
  },
  isComplete: {
    type: Boolean,
    default: false,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

const Task = model("Task", taskSchema);

module.exports = Task;
