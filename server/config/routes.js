// External deps
var _ = require('underscore');

// Internal deps
var middleware = require('./middleware');
var users = require('../controllers/users');
var teams = require('../controllers/teams');

module.exports = function (server) {
  /**
   * Users
   */
  server.get('/api/users/get-current', [middleware.isLoggedIn], users.getCurrent);
  server.post('/api/users/auth', users.authenticate);
  server.post('/api/users', users.register);
  server.post('/api/users/logout', users.logout);

  /**
   * Teams
   */
  server.get('/api/teams', teams.getList);
  server.post('/api/teams', teams.create);
};
