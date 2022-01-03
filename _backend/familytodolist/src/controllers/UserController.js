/* eslint-disable prefer-const */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-shadow */
/* eslint-disable no-return-assign */
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
    console.log('logout');
    req.logout();
    res.sendStatus(200);
  },

  addPrize: (req, res) => {
    console.log('addPrize');
    const id = mongoose.Types.ObjectId();
    const prize = { _id: id, ...req.body.params.prize };
    User.findByIdAndUpdate(
      req.user.id,
      { $push: { prizes: prize } },
      { new: true },
      (err, result) => {},
    );
    res.send(prize);
  },

  // must do some points >= cost checker before and prob best way will be inc points by cost from database
  purchasePrize: (req, res) => {
    console.log('purchasePrize');
    console.log(req.body);
    console.log(req.user);
    req.body.params.ownerId = req.user.id;
    req.body.params.ownerName = req.user.username;
    req.body.params._id = mongoose.Types.ObjectId();
    const userID = mongoose.mongo.ObjectID(req.user.id);
    User.findByIdAndUpdate(
      userID,
      { $push: { purchasedPrizes: req.body.params }, $inc: { points: -req.body.params.cost } },
      { multi: true, useFindAndModify: false },
      (err, result) => {
        if (err) {
          console.log(err);
          return res.sendStatus(500);
        }
        console.log(result);
        res.sendStatus(200);
      },
    );
  },

  prizeRealized: (req, res) => {
    console.log(req.body);
    const prizeID = mongoose.mongo.ObjectID(req.body.params.id);
    User.findOneAndUpdate(
      { _id: req.body.params.ownerId },
      {
        $pull: { purchasedPrizes: { _id: prizeID } },
      },
      { multi: true },
      (err, result) => {
        console.log(result);
        if (err) {
          console.log(err);
          return res.sendStatus(500);
        }
        res.sendStatus(200);
      },
    );
  },

  deletePrize: (req, res) => {
    if (req.user.accessLevel > 0) {
      const prizeID = mongoose.mongo.ObjectID(req.body.params.id);
      User.findByIdAndUpdate(
        req.user.id,
        { $pull: { prizes: { _id: prizeID } } },
        { multi: true },
        (err, result) => {
          if (err) {
            console.log(err);
            return res.sendStatus(500);
          }
        },
      );
      return res.sendStatus(201);
    }
    return res.sendStatus(500);
  },

  fetchPrizes: async (req, res) => {
    console.log('fetchPrizes');
    if (req.user.id && !req.user.parentID) {
      console.log('(req.user.id && !req.user.parentID)');
      const results = await User.findById(req.user.id);
      if (results) {
        console.log(results.prizes);
        const obj = {};
        obj.prizes = results.prizes;
        res.send(obj);
      }
    } else if (req.user.parentID) {
      console.log(req.user.parentID);
      console.log('req.user.parentID');
      const obj = { prizes: 0, points: 0 };
      User.findById(req.user.id).then((results) => (obj.points = results.points));
      const results = await User.findById(req.user.parentID);
      if (results) {
        console.log(results.prizes);
        obj.prizes = results.prizes;
        res.send(obj);
      }
    } else {
      res.sendStatus(500);
    }
  },

  fetchPurchasedPrizes: async (req, res) => {
    let prizes = {};
    console.log(req.user.id);
    console.log(req.user);
    if (req.user.accessLevel > 0) {
      const childAccs = [];
      const gatherChilds = await User.findById(req.user.id).then((results) =>
        results.childAccs.map((x) => childAccs.push(x._id)),
      );

      function sendGatheredPrizes() {
        res.send(prizes);
      }
      if (gatherChilds) {
        const gatherPrizes = childAccs.map((x) =>
          User.findById(x).then((results) => {
            prizes = { ...prizes, [results.name]: results.purchasedPrizes };
          }),
        );

        Promise.all(gatherPrizes).then((res) => {
          sendGatheredPrizes();
        });
      }
    } else {
      User.findById(req.user.id).then((results) => res.send(results.purchasedPrizes));
    }
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
  fetchEvents: (req, res) => {
    User.findById(req.user.id, (err, docs) => {
      if (err) {
        console.log(err);
        return res.sendStatus(500);
      }
      return res.send(docs.events);
    });
  },

  fetchChilds: (req, res) => {
    let ids;
    console.log(req.query.id);
    console.log('reqUser');
    console.log(req.user);

    const childAccs = [];
    async function gatherChilds() {
      const promises = ids.map((id) =>
        User.findById(id).then((results) => childAccs.push(results)),
      );
      const test = await Promise.all(promises);
      console.log(childAccs);
      return childAccs;
    }

    async function gatherIds() {
      User.findById(req.user.id, (err, docs) => {
        if (err) {
          console.log(err);
        } else {
          ids = docs.childAccs.map((obj) => obj._id);
          gatherChilds().then((childAccs) => res.send(childAccs));
        }
      });
    }
    gatherIds();
    // req.query.id.map((id) => User.findById(id).then((results) => childAccs.push(results)));
  },
};

module.exports = user;
