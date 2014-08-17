define([
  'angular',
  'ui.router',
  '../resources/team',
  '../user-manager/index'
], function (angular) {
  'use strict';

  return angular.module('app.teams', [
    'ui.router',
    'app.user-manager',
    'app.resources.team'
  ]).config(['$stateProvider', function ($stateProvider) {
    $stateProvider.state('teams', {
      url: '/teams',
      templateUrl: '/js/modules/teams/teams.html',
      controller: 'TeamsCtrl',
      resolve: {
        myTeams: ['Team', 'UserManager', function (Team, UserManager) {
          return Team.query({ member: UserManager.data._id }).$promise;
        }]
      }
    });
  }]);
});
