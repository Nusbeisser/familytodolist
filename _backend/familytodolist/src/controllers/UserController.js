/* eslint-disable no-plusplus */
const mongoose = require('mongoose');
const passport = require('passport');
require('../models/User');

const User = mongoose.model('users');

const user = {
  userLogin: (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.sendStatus(403);
      }

      req.logIn(user, (err) => {
        if (err) {
          return next(err);
        }
        user.salt = 'nope';
        user.hash = 'dope';
        return res.send(user);
      });
    })(req, res, next);
  },
  userLogout: (req, res) => {
    req.logout();
    res.sendStatus(200);
  },

  deleteChild: (req, res) => {
    console.log(req.body.userID);
    const childId = mongoose.mongo.ObjectID(req.body.id);
    User.findByIdAndUpdate(
      req.body.userID,
      { $pull: { childAccs: { _id: childId } } },
      { multi: true },
      (err, result) => {
        if (err) {
          console.log(err);
          return res.sendStatus(500);
        }
      },
    );
    User.findByIdAndRemove(req.body.id, (err, result) => {
      if (err) {
        console.log(err);
        return res.sendStatus(500);
      }
      console.log(result);
      return res.sendStatus(201);
    });
  },

  userRegister: (req, res) => {
    console.log(req.body.username, req.body.password, req.body.accessLevel, req.body.userID);
    User.register(
      new User({
        username: req.body.username,
        name: req.body.name,
        accessLevel: req.body.accessLevel,
        parentID: req.body.userID,
      }),
      req.body.password,
      (err, user) => {
        if (req.body.userID) {
          User.findByIdAndUpdate(
            req.body.userID,
            { $push: { childAccs: user } },
            { new: true },
            (err, result) => {},
          );
        }
        if (err) {
          console.log(err);
          return res.sendStatus(500);
        }
        passport.authenticate('local')(req, res, () => {
          if (req.body.userID) res.send(user);
          res.sendStatus(201);
        });
      },
    );
  },
  fetchChilds: (req, res) => {
    console.log(req.query.id);
    console.log('reqUser');
    console.log(req.user);
    const childAccs = [];
    async function gatherChilds() {
      const promises = req.query.id.map((id) =>
        User.findById(id).then((results) => childAccs.push(results)),
      );
      const test = await Promise.all(promises);
      return childAccs;
    }
    gatherChilds().then((childAccs) => res.send(childAccs));
    // req.query.id.map((id) => User.findById(id).then((results) => childAccs.push(results)));
  },
};

module.exports = user;
