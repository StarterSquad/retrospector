define([
  'angular',
  'underscore',
  './socket'
], function (angular, _) {
  'use strict';

  angular.module('app.common.reset-idle', ['app.common.socket'])

    .directive('resetIdle', function ($document, socket) {
      return {
        restrict: 'A',
        scope: false,
        link: function (scope, element, attrs) {
          // TODO active and finish directive
          return;

          var retrospectiveId = attrs.resetIdle;

          if (!retrospectiveId) {
            return console.error('Syntax Error: resetIdle directive requires room id passed as a value "reset-idle=\"[room_id]\""');
          }

          var resetIdle = _.throttle(function () {
            socket.emit('user:resetIdle', retrospectiveId);
          }, 1000);

          $document.on('mousemove', resetIdle);

          scope.$on('$destroy', function () {
            $document.off('mousemove', resetIdle);
          })
        }
      };
    });
});
