define(['./module'], function (module) {
  'use strict';

  module.controller('RetrospectivesViewCtrl', function ($scope, retrospective) {
    $scope.retrospective = retrospective;
  });
});
