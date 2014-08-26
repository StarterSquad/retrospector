define([
  'angular',
  'ngResource'
], function (angular) {
  'use strict';

  return angular.module('app.resources.retrospective', ['ngResource'])

    .service('Retrospective', function ($resource) {
      return $resource('/api/retrospectives/:id/:path', { id: '@_id', path: '@path' });
    });
});
