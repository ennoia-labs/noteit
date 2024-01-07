const { User } = require('@models/User');
const passport = require('passport');
const getSubObject = require('@utils/getSubObject');
const { signToken } = require('@utils/jwtConfig');
const { feServer } = require('@utils/getServer');

exports.root = async (req, res) => {
  const responsePrototype = {
    isAuthenticated: false,
    isNewUser: false,
    accessToken: null,
  };

  if (!req.isAuthenticated()) {
    res.status(401);
    return res.json(responsePrototype);
  }

  try {
    console.log('sending user data...');
    const propertiesToReturn = [
      '_id',
      'email',
      'firstName',
      'lastName',
      'faculty',
      'semester',
      'joinedOn',
      'sessionCount',
      'picture',
      'savedNotes',
    ];
    const payload = getSubObject(req.user, propertiesToReturn);

    const signedToken = signToken({ payload });
    responsePrototype.isAuthenticated = true;
    responsePrototype.accessToken = signedToken;

    if (!req.user.faculty || !req.user.semester) {
      responsePrototype.isNewUser = true;
    }

    return res.status(200).json(responsePrototype);
  } catch (error) {
    console.log(error);

    return res.status(500);
  }
};

exports.google = passport.authenticate('google', {
  scope: ['profile', 'email'],
});

exports.facebook = passport.authenticate('facebook');

exports.callback = (req, res) => res.redirect(feServer);

exports.logout = (req, res) => {
  console.log('logging out');
  User.prototype
    .sessionCountHandler(req.user._id, 'decrement')
    .then(() => {
      req.logout();
      req.session = null;
      req.user = null;
      res.status(204).end();
    })
    .catch((err) => console.log('from logout: ' + err));
};
