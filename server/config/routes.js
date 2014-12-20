var _ = require('underscore');
var middleware = require('./middleware');
var users = require('../controllers/users');
var teams = require('../controllers/teams');
var retrospectives = require('../controllers/retrospectives');

module.exports = function (server) {
  /*
   * Users
   */
  server.get('/api/users/get-current', [middleware.isLoggedIn], users.getCurrent);
  server.get('/api/users', [middleware.isLoggedIn], users.getList);
  server.post('/api/users/auth', users.authenticate);
  server.post('/api/users', users.register);
  server.post('/api/users/logout', [middleware.isLoggedIn], users.logout);

  /*
   * Teams
   */
  server.get('/api/teams', [middleware.isLoggedIn], teams.getList);
  server.post('/api/teams', [middleware.isLoggedIn], teams.create);
  server.put('/api/teams/:id', [middleware.isLoggedIn], teams.update);

  /*
   * Retrospectives
   */
  server.get('/api/retrospectives', [middleware.isLoggedIn], retrospectives.getList);
  server.get('/api/retrospectives/:id', [middleware.isLoggedIn], retrospectives.get);
  server.post('/api/retrospectives', [middleware.isLoggedIn], retrospectives.create);
};
