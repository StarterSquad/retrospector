define(['./module'], function (module) {
  'use strict';

  module.service('Auth', function ($cookies, $rootScope, $state, $location, User, UserManager, socket) {
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
          socket.emit('user:logout');
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
  });
});
