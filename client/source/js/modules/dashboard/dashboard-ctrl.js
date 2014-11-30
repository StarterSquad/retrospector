define(['./module'], function (module) {
  'use strict';

  module.controller('DashboardCtrl', function ($scope, $modal, retrospectives) {
    $scope.retrospectives = retrospectives;
    
    /**
     * Methods
     */

    $scope.openStartNewRetrospectiveModal = function () {
      $modal.open({
        templateUrl: 'js/modules/dashboard/modals/start-new-retrospective.html',
        controller: 'StartNewRetrospectiveCtrl',
        resolve: {
          myTeams: function (Team, UserManager) {
            return Team.query({ member: UserManager.data._id }).$promise;
          }
        },
        size: 'small'
      })
    };
  });
});
