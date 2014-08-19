define([
  'angular',
  'ui.router'
], function (angular) {
  'use strict';

  return angular.module('app.retrospectives.list', [
    'ui.router'
  ]).config(['$stateProvider', function ($stateProvider) {
    $stateProvider.state('retrospectives.list', {
      url: '/list',
      templateUrl: '/js/modules/retrospectives/list/retrospectives-list.html',
      controller: 'RetrospectivesListCtrl'
    });
  }]);
});
