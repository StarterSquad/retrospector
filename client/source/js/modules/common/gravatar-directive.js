define(['angular', 'js-md5'], function (angular, md5) {
  'use strict';

  angular.module('ngGravatar', []).directive('ngGravatar', ['$location', function ($location) {
    return {
      template: '<img src="https://secure.gravatar.com/avatar/{{ imgHash }}?s={{ imgSize }}" alt="gravatarImg" width="{{ imgSize }}px">',
      replace: true,
      restrict: 'E',
      scope: {
        email: '@'
      },
      link: function (scope, element, attrs) {
        scope.emailHash = md5(scope.email);
        scope.imgHash = attrs.hash || scope.emailHash;
        scope.imgSize = attrs.size || '300';
      }
    };
  }]);
});
