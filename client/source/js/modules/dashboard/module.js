define([
  'angular',
  'ui.router',
  '../../config'
], function (angular) {
  'use strict';

  return angular.module('app.dashboard', [
    'app.constants',
    'ui.router'
  ]).config(['$stateProvider', function ($stateProvider) {
    $stateProvider
      .state('dashboard', {
        url: '/',
        templateUrl: 'js/modules/dashboard/dashboard.html',
        controller: 'DashboardCtrl'
      });
  }]);

});
