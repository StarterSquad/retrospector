define(['angular'], function (angular) {
  'use strict';

  angular.module('app.common.directives', [])

    .directive('focus', ['$timeout', function ($timeout) {
      return function (scope, element, attrs) {
        var isInsideModal = !!element.parents('.modal-body').length;
        var duration = isInsideModal ? 50 : 0;
        var doSelectText = scope.$eval(attrs.focus);

        $timeout(function () {
          element.focus();

          if (doSelectText) {
            element.get(0).select();
          }
        }, duration, false);
      };
    }])

    .directive('ngEnter', function () {
      return function (scope, element, attrs) {
        element.bind('keydown keypress', function (event) {
          if (event.which === 13) {
            scope.$apply(function () {
              scope.$eval(attrs.ngEnter);
            });

            event.preventDefault();
          }
        });
      };
    });
});
