define(['../module'], function (module) {
  'use strict';

  module.controller('StartNewRetrospectiveCtrl', function ($scope, $state, myTeams, UserManager, Retrospective) {
    /**
     * Init models
     */

    $scope.myTeams = myTeams;
    $scope.retrospective = new Retrospective({
      team: myTeams[0]._id,
      leader: UserManager.data._id
    });

    /**
     * Methods
     */

    $scope.createRetro = function () {
      $scope.retrospective.$save(function (createdRetrospective) {
        if ($scope.isScheduling) {
          $scope.$close();
        } else {
          $state.go('retrospectives.view', { id: createdRetrospective._id });
        }
      });
    };
  });
});
