define(['../module', 'angular', 'jquery'], function (module, angular, $) {
  'use strict';

  module.controller('StartNewRetrospectiveCtrl', function ($scope, $state, $timeout, myTeams, UserManager, Retrospective) {
    /**
     * Init models
     */

    $scope.myTeams = myTeams;
    $scope.retrospective = new Retrospective({
      team: myTeams[0]._id,
      leader: UserManager.data._id,
      questions: [{}]
    });

    /**
     * Methods
     */

    $scope.createRetrospective = function () {
      $scope.retrospective.$save(function (createdRetrospective) {
        if ($scope.isScheduling) {
          $scope.$close();
        } else {
          $state.go('retrospectives.view', { id: createdRetrospective._id });
        }
      });
    };

    $scope.addQuestion = function () {
      if ($.trim(angular.element('.questions input:nth-last-child(2)').val()).length) {
        $scope.retrospective.questions.push({});
      }

      // Auto-focus on added option
      $timeout(function () {
        angular.element('.questions input:nth-last-child(2)').focus().select();
      });
    }
  });
});
