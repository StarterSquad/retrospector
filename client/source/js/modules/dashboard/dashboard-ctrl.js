define(['./module'], function (module) {
  'use strict';

  module.controller('DashboardCtrl', [
    '$scope',
    '$modal',
    function ($scope, $modal) {
      /**
       * Methods
       */

      $scope.openStartNewRetrospectiveModal = function () {
        $modal.open({
          templateUrl: 'js/modules/dashboard/modals/start-new-retrospective.html',
          controller: 'StartNewRetrospectiveCtrl',
          resolve: {
            myTeams: ['Team', 'UserManager', function (Team, UserManager) {
              return Team.query({ member: UserManager.data._id }).$promise;
            }]
          }
        })
      };
  }]);
});
