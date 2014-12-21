define([
  'angular',
  'ui.router',
  '../../resources/retroscpective',
  '../../user-manager/index',
  '../../ui/fullscreen/index'
], function (angular) {
  'use strict';

  return angular.module('app.retrospectives.view', [
    'app.ui.fullscreen',
    'app.resources.retrospective',
    'app.user-manager',
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
