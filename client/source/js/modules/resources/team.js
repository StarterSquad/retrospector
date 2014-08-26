define([
  'angular',
  'ngResource'
], function (angular) {
  'use strict';

  return angular.module('app.resources.team', ['ngResource'])

    .service('Team', function ($resource) {
      return $resource('/api/teams/:id/:path', { id: '@_id', path: '@path' });
    });
});
