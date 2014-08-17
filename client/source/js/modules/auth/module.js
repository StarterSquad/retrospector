define([
  'angular',
  'ngCookies',
  '../resources/user',
  '../user-manager/index'
], function (angular) {
  'use strict';

  return angular.module('app.auth', [
    'app.resources.user',
    'app.user-manager',
    'ui.router',
    'ngCookies'
  ])

    .config(['$stateProvider', function ($stateProvider) {
      $stateProvider

        .state('signin', {
          url: '/signin',
          templateUrl: 'js/modules/auth/signin.html',
          controller: 'SigninCtrl',
          onEnter: ['$stateParams', '$location', 'UserManager', function ($stateParams, $location, UserManager) {
            if (UserManager.isLoggedIn) {
              $location.path('/');
            }
          }]
        })

        .state('signup', {
          url: '/signup',
          templateUrl: 'js/modules/auth/signup.html',
          controller: 'SignupCtrl',
          onEnter: ['$stateParams', '$location', 'UserManager', function ($stateParams, $location, UserManager) {
            if (UserManager.isLoggedIn) {
              $location.path('/');
            }
          }]
        })
    }]);
});
