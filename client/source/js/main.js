define([
  'require',
  'angular',
  './app'
], function (require, angular) {
  'use strict';

  // You can place operations that need to initialize prior to app start here
  // using the `run` function on the top-level module

  angular.injector(['ng']).invoke(['$http', function ($http) {
    $http.get('/api/users/get-current')
      .success(function (user) {
        window.user = user;
      })
      .finally(function () {
        angular.bootstrap(document, ['app']);
      });
  }]);
});
