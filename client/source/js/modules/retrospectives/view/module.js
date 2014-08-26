define([
  'angular',
  'ui.router'
], function (angular) {
  'use strict';

  return angular.module('app.retrospectives.view', [
    'ui.router'
  ])

    .config(function ($stateProvider) {
      $stateProvider.state('retrospectives.view', {
        url: '/:id',
        templateUrl: '/js/modules/retrospectives/view/retrospectives-view.html',
        controller: 'RetrospectivesViewCtrl',
        resolve: {
          retrospective: function ($stateParams, Retrospective) {
            return Retrospective.get({ id: $stateParams.id }).$promise;
          }
        }
      });
    });
});
