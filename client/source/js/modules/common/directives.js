define(['angular'], function (angular) {
  'use strict';

  angular.module('app.common.directives', [])

    .directive('stayFocus', function () {
      return function (scope, element) {
        element.on('blur', function () {
          element.focus();
        });
      };
    });
});
