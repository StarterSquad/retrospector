define(['./module'], function (module) {
  'use strict';

  module.controller('DashboardCtrl', ['$scope', 'UserManager', function ($scope, UserManager) {
    $scope.user = UserManager.data;
  }]);
});
