define([
  'angular',
  'ngResource'
], function (angular) {
  'use strict';

  return angular.module('app.resources.user', ['ngResource'])

    .service('User', ['$resource', function ($resource) {
      return $resource('/api/users/:id/:path', { id: '@_id', path: '@path' }, {
        logout: {
          method: 'POST',
          params: {
            path: 'logout'
          }
        }
      });
    }]);
});
