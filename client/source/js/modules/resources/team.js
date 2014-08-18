define([
  'angular',
  'ngResource'
], function (angular) {
  'use strict';

  return angular.module('app.resources.team', ['ngResource'])

    .service('Team', ['$resource', function ($resource) {
      return $resource('/api/teams/:id/:path', { id: '@_id', path: '@path' });
    }]);
});
