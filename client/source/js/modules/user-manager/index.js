define([
  'angular',
  'underscore',
  '../resources/user',
  '../common/socket'
], function (angular, _) {
  'use strict';

  return angular.module('app.user-manager', ['app.resources.user', 'app.common.socket'])

    .service('UserManager', function (User, socket) {
      var user = {
        isLoggedIn: false,
        clean: function () {
          user.isLoggedIn = false;

          // Safely clean User object
          _(_(user.data).keys()).each(function (key) {
            user.data[key] = null;
          });
        },
        data: new User(),
        set: function (data) {
          user.isLoggedIn = true;
          angular.extend(user.data, data);
          socket.emit('user:login', data._id);
        }
      };

      return user;
    });
});
