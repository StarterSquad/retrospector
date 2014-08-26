define(['../module', 'moment'], function (module, moment) {
  'use strict';

  module.controller('StartNewRetrospectiveCtrl', function ($scope, $state, myTeams, UserManager, Retrospective) {
    /**
     * Init models
     */

    $scope.myTeams = myTeams;
    $scope.selectedTeam = myTeams[0];
    $scope.retrospective = new Retrospective();

    /**
     * Methods
     */

    $scope.createRetro = function () {
      $scope.retrospective.team = $scope.selectedTeam._id;

      $scope.retrospective.$save(function (createdRetrospective) {
        if ($scope.isScheduling) {
          $scope.$close();
        } else {
          $state.go('retrospectives.view', { id: createdRetrospective._id });
        }
      });
    };

    /**
     * Watchers
     */

    $scope.$watchCollection('[selectedTeam, retrospective.date, isScheduling]', function () {
      var dayOfWeek = moment($scope.retrospective.date).format('dddd').toLowerCase();

      $scope.retrospective.name = [dayOfWeek, $scope.selectedTeam.name.toLowerCase(), 'retro'].join('-');
    });
  });
});
