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
          return User.save({ path: 'logout' }, null, function () {
            UserManager.clean();
            $location.path('/');
          }, function (result) {
            $location.path('/');
          });
        },
        register: function (fullName, email, password) {
          console.log(arguments);
        }
      };

      return service;
    }]);
});
