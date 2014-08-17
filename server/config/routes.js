// External deps
var _ = require('underscore');

// Internal deps
var middleware = require('./middleware');
var users = require('../controllers/users');

module.exports = function (server) {
  /**
   * Users
   */
  server.get('/api/users/get-current', [middleware.isLoggedIn], users.getCurrent);
};
