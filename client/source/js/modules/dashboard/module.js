define([
  'angular',
  'ui.router',
  '../common/gravatar-directive',
  '../user-manager/index',
  '../resources/retroscpective',
  '../resources/team'
], function (angular) {
  'use strict';

  return angular.module('app.dashboard', [
    'ngGravatar',
    'ui.router',
    'app.resources.retrospective',
    'app.resources.team',
    'app.user-manager'
  ])

    .config(function ($stateProvider) {
      $stateProvider.state('dashboard', {
        url: '/',
        templateUrl: 'js/modules/dashboard/dashboard.html',
        controller: 'DashboardCtrl'
      });
    });
});
