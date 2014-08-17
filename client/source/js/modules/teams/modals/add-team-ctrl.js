define(['../module', 'underscore'], function (module, _) {
  'use strict';

  module.controller('AddTeamCtrl', ['$scope', 'Team', 'UserManager', function ($scope, Team, UserManager) {
    /**
     * Init models
     */

    $scope.team = new Team({
      // Add current user to members automatically
      members: [UserManager.data._id]
    });

    /**
     * Methods
     */

    $scope.addTeam = function () {
      $scope.team.$save(function (createdTeam) {
        $scope.$close(createdTeam);
      })
    };

    $scope.parseEmails = function () {
      var emails = _($scope.membersInvitations.split(',')).compact();

      emails = _(emails).filter(function (email) {
        var regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        return regex.test(email);
      });

      $scope.validInvitedMembersEmails = emails
    };
  }]);
});
