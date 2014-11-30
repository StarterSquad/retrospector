define(['./module', 'underscore'], function (module, _) {
  'use strict';

  module.controller('TeamsCtrl', function ($scope, $modal, myTeams) {
    $scope.teams = myTeams;

    /**
     * Methods
     */

    $scope.openAddTeamModal = function () {
      $modal.open({
        templateUrl: 'js/modules/teams/modals/add-edit-team.html',
        controller: 'AddEditTeamCtrl',
        resolve: {
          allUsers: function (User) {
            return User.query().$promise;
          },
          team: function (Team, UserManager) {
            // Create new Team instance on resolve-phase to have compatibility with Edit modal
            return new Team({
              // Add current user to members automatically
              members: [UserManager.data._id]
            });
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

    $scope.openEditTeamModal = function (team) {
      $modal.open({
        templateUrl: 'js/modules/teams/modals/add-edit-team.html',
        controller: 'AddEditTeamCtrl',
        resolve: {
          allUsers: function (User) {
            return User.query().$promise;
          },
          team: function () {
            return team
          }
        }
      });
    };
  });
});
