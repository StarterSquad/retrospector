/**
 * loads sub modules and wraps them up into the main module.
 * This should be used for top-level module definitions only.
 */
define([
  'angular',
  'ui.router',
  'angular-ui-select2',
  './config',
  './modules/common/directives',
  './modules/common/socket',
  './modules/common/reset-idle-directive',
  './modules/auth/index',
  './modules/dashboard/index',
  './modules/retrospectives/index',
  './modules/teams/index',
  './modules/ui/index',
  './modules/user-manager/index'
], function (angular) {
  'use strict';

  return angular.module('app', [
    'app.auth',
    'app.common.directives',
    'app.common.socket',
    'app.common.reset-idle',
    'app.constants',
    'app.dashboard',
    'app.retrospectives',
    'app.teams',
    'app.ui',
    'app.user-manager',
    'ui.router',
    'ui.select2'
  ])

    .config(function ($httpProvider, $provide) {
      $provide.factory('logoutUserOn401', function ($q, $location) {
        return {
          response: function (response) {
            return response;
          },
          responseError: function (response) {
            var notAtAuthPage = $location.path() !== '/signin' && $location.path() !== '/signup' && $location.path().indexOf('/reset-password') === -1;

            if (response.status === 401 && notAtAuthPage) {
              // Redirect them back to login page
              location.href = '/#/signin';
            } else if (response.data.message && notAtAuthPage) {
              alert(response.data.message);
            }

            return $q.reject(response);
          }
        };
      });

      $httpProvider.interceptors.push('logoutUserOn401');
    })

    .config(function ($urlRouterProvider) {
      $urlRouterProvider.otherwise('/');
    })

    .run(function ($location, $rootScope, $state, $modalStack, Auth, UserManager, fullscreen) {
      if (window.user) {
        UserManager.set(window.user);
        delete window.user;
      }

      $rootScope.$on('$stateChangeStart', function (event, to, toParams, from, fromParams) {
        if (!UserManager.isLoggedIn && to.name !== 'signin' && to.name !== 'signup') {
          event.preventDefault();

          $state.go('signup');
        }

        $modalStack.dismissAll();
      });

      $rootScope.fullscreen = fullscreen;
    })

    .controller('HeaderCtrl', function ($scope, Auth, UserManager) {
      $scope.UserManage = UserManager;

      $scope.logout = Auth.logout;
    });
});
