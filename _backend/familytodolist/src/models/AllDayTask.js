const mongoose = require('mongoose');

const { Schema } = mongoose;

const AllDayTaskSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
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

mongoose.model('alldaytasks', AllDayTaskSchema);

module.exports = mongoose.model('alldaytasks', AllDayTaskSchema);
// export default AllDayTaskSchema; 05.01.2022
