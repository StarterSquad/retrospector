define(['./module'], function (module) {
  'use strict';

  module.controller('SigninCtrl', ['$scope', 'Auth', function ($scope, Auth) {
    /**
     * Methods
     */

    $scope.authenticate = function () {
      Auth.login($scope.email, $scope.password);
    };
  }]);
});
