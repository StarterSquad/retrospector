define([
  'angular',
  'ui.router',
  '../common/gravatar-directive'
], function (angular) {
  'use strict';

  return angular.module('app.dashboard', [
    'ngGravatar',
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
