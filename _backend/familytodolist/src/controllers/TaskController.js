const mongoose = require('mongoose');
require('../models/User');
require('../models/Task');
require('../models/AllDayTask');

const User = mongoose.model('users');
const Task = mongoose.model('tasks');
const AllDayTask = mongoose.model('alldaytasks');

const task = {
  deleteTask: async (req, res) => {
    console.log(req.body.params.taskId);
    const taskId = mongoose.mongo.ObjectID(req.body.params.taskId);
    User.findByIdAndUpdate(
      req.body.params.shownAccId,
      { $pull: { events: { _id: taskId } } },
      { multi: true },
      (err, result) => {
        if (err) {
          console.log(err);
          return res.sendStatus(500);
        }
        return res.sendStatus(201);
      },
    );
  },

  taskDone: (req, res) => {
    console.log(req.body);
    console.log(req.user);
    const userId = mongoose.mongo.ObjectID(req.user.id);
    const taskId = mongoose.mongo.ObjectID(req.body.params.taskId);
    User.findOneAndUpdate(
      { _id: userId, 'events._id': taskId },
      { $set: { 'events.$.color': 'red' } },
      { multi: true, useFindAndModify: false },
      (err, result) => {
        console.log(result);
        if (err) {
          console.log(`Błąd do kurwy nędzy ${err}`);
          return res.sendStatus(500);
        }
        return res.sendStatus(201);
      },
    );
  },

  taskImprove: (req, res) => {
    const userId = mongoose.mongo.ObjectID(req.body.params.shownAccId);
    const taskId = mongoose.mongo.ObjectID(req.body.params.taskId);
    User.findOneAndUpdate(
      { _id: userId, 'events._id': taskId },
      { $set: { 'events.$.color': '' } },
      { multi: true, useFindAndModify: false },
      (err, result) => {
        console.log(result);
        if (err) {
          console.log(`Błąd do kurwy nędzy ${err}`);
          return res.sendStatus(500);
        }
        return res.sendStatus(201);
      },
    );
  },

  confirmDoneTask: async (req, res) => {
    const taskId = mongoose.mongo.ObjectID(req.body.params.taskId);
    const user = await User.findOne({ _id: req.body.params.shownAccId }).exec();
    const taskPoints = user.events.filter((el) => el._id == req.body.params.taskId)[0];
    console.log(taskPoints.points);

    User.findByIdAndUpdate(
      req.body.params.shownAccId,
      { $inc: { points: taskPoints.points, tasksDone: 1 } },
      { multi: true },
      (err, result) => {
        if (err) {
          console.log(err);
        }
        console.log(result);
      },
    );
    User.findByIdAndUpdate(
      req.body.params.shownAccId,
      { $pull: { events: { _id: taskId } } },
      { multi: true },
      (err, result) => {
        if (err) {
          console.log(err);
          return res.sendStatus(500);
        }
        return res.sendStatus(201);
      },
    );
  },

  addTask: async (req, res) => {
    console.log(req);
    let newTask;
    if (req.body.start === '' || req.body.end.end === '') {
      const newTaskContent = {
        title: req.body.title,
        date: req.body.date,
        points: req.body.points,
        userID: req.body.userID,
      };
      newTask = new AllDayTask(newTaskContent);
    } else {
      const newTaskContent = {
        title: req.body.title,
        date: req.body.date,
        start: `${req.body.date}T${req.body.start}`,
        end: `${req.body.date}T${req.body.end}`,
        points: req.body.points,
        userID: req.body.userID,
      };
      newTask = new Task(newTaskContent);
    }

    console.log(newTask);
    User.findByIdAndUpdate(
      req.body.userID,
      { $push: { events: newTask } },
      { new: true },
      (err, result) => {
        if (err) {
          console.log(err);
          return res.sendStatus(500);
        }
        console.log(result);
        return res.send(newTask);
      },
    );
  },
};

module.exports = task;
