define(['../module', 'underscore'], function (module, _) {
  'use strict';

  module.controller('AddEditTeamCtrl', function ($scope, Team, UserManager, allUsers, team) {
    /**
     * Init models
     */

    $scope.team = team;
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
