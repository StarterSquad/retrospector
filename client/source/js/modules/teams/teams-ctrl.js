define(['./module', 'underscore'], function (module, _) {
  'use strict';

  module.controller('TeamsCtrl', function ($scope, $modal, myTeams) {
    $scope.teams = myTeams;

    /**
     * Methods
     */

    $scope.openAddEditTeamModal = function (team) {
      $modal.open({
        templateUrl: 'js/modules/teams/modals/add-edit-team.html',
        controller: 'AddEditTeamCtrl',
        resolve: {
          allUsers: function (User) {
            return User.query().$promise;
          },
          team: function (Team, UserManager) {
            return team || new Team({
              // Add current user to members automatically
              members: [UserManager.data._id]
            });
          }
        },
        size: 'small'
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
