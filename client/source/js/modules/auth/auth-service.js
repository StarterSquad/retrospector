define(['./module'], function (module) {
  'use strict';

  module.service('Auth', [
    '$cookies',
    '$rootScope',
    '$state',
    '$location',
    'User',
    'UserManager',
    function ($cookies, $rootScope, $state, $location, User, UserManager) {
      var service = {
        goToLogin: function () {
          $state.go('signin');
        },
        login: function (email, password) {
          var payload = { email: email, password: password };

          return User.save({ path: 'auth' }, payload, function (user) {
            UserManager.set(user);
            $location.path('/');
          }, function (result) {
            // Error
          });
        },
        logout: function () {
          User.logout(function () {
            UserManager.clean();
            $state.go('signin');
          });
        },
        register: function (fullName, email, password) {
          User.save({
            fullName: fullName,
            email: email,
            password: password
          }, function (user) {
            UserManager.set(user);
            $location.path('/');
          });
        }
      };

      return service;
    }]);
});
