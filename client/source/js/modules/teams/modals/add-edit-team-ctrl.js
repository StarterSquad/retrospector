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

    $scope.addTeam = function () {
      $scope.team.$save(function (createdTeam) {
        $scope.$close(createdTeam);
      })
    };
  });
});
