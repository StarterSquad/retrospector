define(['./module'], function (module) {
  'use strict';

  module.controller('TeamsCtrl', function ($scope, $modal, myTeams) {
    $scope.teams = myTeams;

    /**
     * Methods
     */

    $scope.openAddTeamModal = function () {
      $modal.open({
        templateUrl: 'js/modules/teams/modals/add-team.html',
        controller: 'AddTeamCtrl',
        resolve: {
          allUsers: function (User) {
            return User.query().$promise;
          }
        }
      })
        .result
        .then(function (createdTeam) {
          if (createdTeam) {
            $scope.teams.push(createdTeam);
          }
        })
    };
  });
});
