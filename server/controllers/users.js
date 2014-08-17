var mongoose = require('mongoose'),
  User = mongoose.model('User'),
  _ = require('underscore');

self = this;

/**
 * Check user credentials. Passes into callback fields:
 * @param email
 * @param password
 * @param callback
 * @return undefined - user doesn't exist
 * @return false - incorrect credentials
 * @return User - correct credentials
 */
exports.checkCredentials = function (email, password, callback) {
  User.findOne({ email: email }, function (err, user) {
    if (err) throw new Error(err);

    // If user doesn't exist => undefined
    if (!user) {
      return callback();
    } else {
      user.comparePassword(password, function (err, correctPassword) {
        if (err) throw new Error(err);

        if (correctPassword) {
          callback(user);
        } else {
          callback(false)
        }
      })
    }
  });
};

exports.checkCredentialsFromToken = function (email, hashedPassword, callback) {
  User.findOne({ email: email }, function (err, user) {
    if (err) throw new Error(err);

    var isUserFound = user && (user.password === hashedPassword);
    callback(isUserFound ? user : false);
  });
};

exports.authenticate = function (req, res) {
  var email = req.body.email;
  var password = req.body.password;

  self.checkCredentials(email, password, function (user) {
    if (user) {
      req.session_state.email = email;
      req.session_state.password = user.password;
      req.session_state.isAuthorized = true;

      res.json(user);
    } else {
      var err = new Error('Invalid email or password');
      err.statusCode = 400;

      res.json(err);
    }
  });
};

exports.register = function (req, res) {
  var fullName = req.body.fullName;
  var email = req.body.email;
  var password = req.body.password;

  self.checkCredentials(email, password, function (user) {
    if (user === undefined) {
      var newUser = new User({
        fullName: fullName,
        email: email,
        password: password
      });

      newUser.save(function (err, savedUser) {
        if (err) throw new Error(err);

        // Auto-login right after registration
        req.session_state.email = email;
        req.session_state.password = savedUser.password;
        req.session_state.isAuthorized = true;

        // Return registered user
        res.json(savedUser)
      });
    } else {
      res.statusCode = 400;
      res.json({ message: 'User is already existing' });
    }
  });
};

exports.logout = function (req, res) {
  req.session_state.reset();
  res.end();
};

exports.getCurrent = function (req, res) {
  res.json(req.appData.user);
};