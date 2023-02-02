const express = require('express');
const passport = require('passport');
require('@controllers/passportController');
const cookieSession = require('cookie-session');
const path = require('path');

const app = express();

app.use(require('morgan')('combined'));
app.use(require('helmet')());
app.use(require('@utils/cspConfig'));

app.use(
  cookieSession({
    name: 'userSession',
    maxAge: 24 * 60 * 60 * 1000,
    keys: [process.env.SESSION_SECRET],
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

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).sendFile(path.resolve(__dirname, './500.html'));
});

module.exports = app;
