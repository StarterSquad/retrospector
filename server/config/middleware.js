var users = require('../controllers/users');

// Checks user authorisation
exports.isLoggedIn = function (req, res, next) {
  if (!req.session_state.isAuthorized) {
    res.send(401); // Not-authorized
  }

  users.checkCredentialsFromToken(req.session_state.email, req.session_state.password, function (userFound) {
    if (userFound) {
      req.appData.user = userFound;
      next();
    } else {
      res.send(401); // Bad credentials
    }
  });
};