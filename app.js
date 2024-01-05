const cors = require('cors');
const express = require('express');
const passport = require('passport');
require('@controllers/passportController');
const session = require('express-session');
const corsOptions = require('./utils/corsConfig');

require('dotenv').config();

const app = express();

app.use(cors(corsOptions));
app.use(require('morgan')('combined'));
app.use(require('helmet')());
app.use(require('@utils/cspConfig'));

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
    cookie: {
      secure: process.env.NODE_ENV === 'production', // Set to true in production for HTTPS
      maxAge: 86400000, // 1 day
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

// ways to submit data to the server
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// routers
const authRouter = require('@routers/authRouter');
const usersRouter = require('@routers/usersRouter');
const adminRouter = require('@routers/adminRouter');
const apiRouter = require('@routers/apiRouter');

// using the routers
app.use('/auth', authRouter);
app.use('/users', usersRouter);
app.use('/admin', adminRouter);
app.use('/api', apiRouter);

app.use((err, req, res) => {
  if (err) {
    console.error(err.stack);
    return res.status(500).end();
  }

  res.status(404);
});

module.exports = app;
