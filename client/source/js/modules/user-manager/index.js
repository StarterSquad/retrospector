define(['angular', 'underscore', '../resources/user'], function (angular, _) {
  'use strict';

  return angular.module('app.user-manager', ['app.resources.user'])

    .service('UserManager', function (User) {
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
        }
      };

      return user;
    });
});
