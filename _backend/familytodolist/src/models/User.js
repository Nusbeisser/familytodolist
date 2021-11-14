const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const { Schema } = mongoose;

const UserSchema = new Schema({
  parentID: {
    type: String,
    default: null,
  },
  name: {
    type: String,
    default: null,
  },
  accessLevel: {
    type: Number,
    default: 1,
  },
  childAccs: {
    type: Array,
    default: [],
  },
  points: {
    type: Number,
    default: 0,
  },
  tasksDone: {
    type: Number,
    default: 0,
  },
  activeTasks: {
    type: Number,
    default: 0,
  },
  events: {
    type: Array,
    default: [],
  },
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('users', UserSchema);
