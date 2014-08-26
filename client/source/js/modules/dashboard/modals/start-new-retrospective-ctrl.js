define(['../module', 'moment'], function (module, moment) {
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

    /**
     * Watchers
     */

    $scope.$watchCollection('[retrospective.team, retrospective.date, isScheduling]', function () {
      var dayOfWeek = moment($scope.retrospective.date).format('dddd').toLowerCase();
      var teamName = _(myTeams).findWhere({ _id: $scope.retrospective.team }).name.toLowerCase();

      $scope.retrospective.name = [dayOfWeek, teamName, 'retro'].join('-');
    });
  });
});
