const mongoose = require('mongoose');

const { Schema } = mongoose;

const TaskSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  start: {
    type: String,
    required: false,
    default: '',
  },
  end: {
    type: String,
    required: false,
    default: '',
  },
  points: {
    type: Number,
    default: 0,
  },
  userID: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    default: '',
  },
});

mongoose.model('tasks', TaskSchema);

export default TaskSchema;
