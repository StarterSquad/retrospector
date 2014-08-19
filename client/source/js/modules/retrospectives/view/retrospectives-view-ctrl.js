define(['./module'], function (module) {
  'use strict';

  module.controller('RetrospectivesViewCtrl', [
    '$scope',
    'retrospective',
    function ($scope, retrospective) {
      $scope.retrospective = retrospective;
    }]);
});
