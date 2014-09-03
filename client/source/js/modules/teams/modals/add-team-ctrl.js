define(['../module'], function (module) {
  'use strict';

  module.controller('AddTeamCtrl', function ($scope, Team, UserManager, allUsers) {
    /**
     * Init models
     */

    $scope.team = new Team({
      // Add current user to members automatically
      members: [UserManager.data._id]
    });
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
