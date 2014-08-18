define(['./module', 'underscore'], function (module, _) {
  'use strict';

  module.controller('TeamsCtrl', ['$scope', '$modal', 'myTeams', function ($scope, $modal, myTeams) {
    $scope.teams = myTeams;

    /**
     * Methods
     */

    $scope.openAddTeamModal = function () {
      $modal.open({
        templateUrl: 'js/modules/teams/modals/add-team.html',
        controller: 'AddTeamCtrl'
      })
        .result
        .then(function (createdTeam) {
          if (createdTeam) {
            $scope.teams.push(createdTeam);
          }
        })
    };
  }]);
});
