/* eslint-disable no-unused-vars */
const dotenv = require('dotenv').config();
const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const morgan = require('morgan');
const cors = require('cors');
const LocalStrategy = require('passport-local').Strategy;
const cookieParser = require('cookie-parser');
const routes = require('./routes');
const User = require('./models/User');

const PORT = process.env.PORT || 9000;

const NETLIFY = 'https://familytodolist.netlify.app';
const LOCALHOST = 'http://localhost:3000';

const app = express();
app.use(bodyParser.json());
app.use(morgan('combined'));
app.use(
  cors({
    credentials: true,
    origin: NETLIFY,
  }),
);
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser((user, done) => {
  console.log(user._id);
  done(null, user._id);
});

passport.deserializeUser((id, done) => {
  User.findOne({ _id: id }, (err, user) => {
    const userInformation = {
      username: user.username,
      id: user._id,
      accessLevel: user.accessLevel,
      parentID: user.parentID,
    };
    done(err, userInformation);
  });
});
app.set('trust proxy', 1);
app.use(
  session({
    secret: 'wonttellyou',
    resave: false,
    saveUninitialized: true,
    // off on localhost, needed on netlify
    cookie: {
      sameSite: 'none',
      secure: 'true',
    },
  }),
);
app.use(cookieParser('wonttellyou'));
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(passport.session());

mongoose.connect(
  'mongodb+srv://admin:admin@favnote.knxaw.mongodb.net/FavNote?retryWrites=true&w=majority',
  { useNewUrlParser: true, useUnifiedTopology: true },
);

const conn = mongoose.connection;
conn.on('error', console.error.bind(console, 'connection error:'));
conn.once('open', () => {
  console.log('Connected to mlab database!');
  app.listen(PORT, () => console.log(`App is listening on port ${PORT}!`));
  app.use('/api', routes);
});
