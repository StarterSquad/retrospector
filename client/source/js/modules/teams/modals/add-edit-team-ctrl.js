define(['../module', 'angular', 'underscore'], function (module, angular, _) {
  'use strict';

  module.controller('AddEditTeamCtrl', function ($scope, Team, UserManager, allUsers, team) {
    /**
     * Init models
     */

    $scope.team = angular.copy(team);
    $scope.team.members = _($scope.team.members).pluck('_id');
    $scope.allUsers = allUsers;

    /**
     * Methods
     */

    $scope.saveTeam = function () {
      $scope.team[$scope.team._id ? '$update' : '$save'](function (savedTeam) {
        $scope.$close(savedTeam);
      })
    };
  });
});
