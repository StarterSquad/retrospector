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

    .config(function ($stateProvider) {
      $stateProvider
        .state('signin', {
          url: '/signin',
          templateUrl: 'js/modules/auth/signin.html',
          controller: 'SigninCtrl',
          onEnter: function ($stateParams, $location, UserManager) {
            if (UserManager.isLoggedIn) {
              $location.path('/');
            }
          }
        })
        .state('signup', {
          url: '/signup',
          templateUrl: 'js/modules/auth/signup.html',
          controller: 'SignupCtrl',
          onEnter: function ($stateParams, $location, UserManager) {
            if (UserManager.isLoggedIn) {
              $location.path('/');
            }
          }
        });
    });
});
