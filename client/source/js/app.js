/**
 * loads sub modules and wraps them up into the main module.
 * This should be used for top-level module definitions only.
 */
define([
  'angular',
  'ui.router',
  'angular-ui-select2',
  './config',
  './modules/common/socket',
  './modules/common/reset-idle-directive',
  './modules/auth/index',
  './modules/dashboard/index',
  './modules/retrospectives/index',
  './modules/teams/index',
  './modules/ui/index'
], function (angular) {
  'use strict';

  return angular.module('app', [
    'app.auth',
    'app.common.socket',
    'app.common.reset-idle',
    'app.constants',
    'app.dashboard',
    'app.retrospectives',
    'app.teams',
    'app.ui',
    'ui.router',
    'ui.select2'
  ])

    .config(function ($httpProvider) {
      var logoutUserOn401 = ['$q', function ($q) {
        var success = function (response) {
          return response;
        };

        var error = function (response) {
          if (response.status === 401 && response.config.url !== '/api/users/get-current') {
            // Redirect them back to login page
            location.href = '/#/signin';

            return $q.reject(response);
          } else {
            if (response.data.message) {
              alert(response.data.message);
            }

            return $q.reject(response);
          }
        };

        return function (promise) {
          return promise.then(success, error);
        };
      }];

      $httpProvider.responseInterceptors.push(logoutUserOn401);
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
