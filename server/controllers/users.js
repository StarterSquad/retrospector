var mongoose = require('mongoose'),
  User = mongoose.model('User'),
  _ = require('underscore');

self = this;

/**
 * Check user credentials. Passes into callback fields:
 * @param name
 * @param password
 * @param callback
 * @return undefined - user doesn't exist
 * @return false - incorrect credentials
 * @return User - correct credentials
 */
exports.checkCredentials = function (name, password, callback) {
  User.getByNamePassword(name, password, function (err, user) {
    if (!user) {
      return callback();
    } else if (!user.checkPassword(password)) {
      return callback(false);
    } else {
      return callback(user);
    }
  });
};

exports.checkCredentialsFromToken = function (name, hashedPassword, callback) {
  User.getByNameHashedPassword(name, hashedPassword, function (err, user) {
    var userFound = user && (user.hashed_password === hashedPassword);
    callback(userFound ? user : false);
  });
};

exports.authenticate = function (req, res) {
  var name = req.body.name;
  var password = req.body.password;

  self.checkCredentials(name, password, function (user) {
    if (user) {
      req.session_state.name = name;
      req.session_state.password = User.encryptPassword(password);
      req.session_state.isAuthorized = true;
      prepareAndReturnUser(user, res);
    } else {
      res.statusCode = 401;
      res.json({ error: 'Invalid name or password' });
    }
  });
};

exports.logout = function (req, res) {
  req.session_state.reset();
  res.json({error: 'You have no permission, please login.'});
};

exports.getCurrent = function (req, res) {
  res.json(req.appData.user);
};