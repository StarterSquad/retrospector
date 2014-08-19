define([
  'angular',
  'ui.router',
  './list/index',
  './view/index'
], function (angular) {
  'use strict';

  return angular.module('app.retrospectives', [
    'ui.router',
    'app.retrospectives.list',
    'app.retrospectives.view'
  ]).config(['$stateProvider', function ($stateProvider) {
    $stateProvider.state('retrospectives', {
      url: '/retrospectives',
      abstract: true,
      template: '<ui-view>'
    });
  }]);
});
