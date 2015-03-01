define(['angular'], function (angular) {

  angular.module('app.ui.btn-progress', [])
    .directive('btnProgress', function () {
      return {
        restrict: 'A',
        scope: {
          value: '=btnProgress',
          max: '=btnProgressMax',
          color: '=btnProgressColor'
        },
        link: function (scope, element) {
          var defaultBtnBackgroundColor = element.css('background-color');

          // Render button if any value is changed
          scope.$watchCollection('[value, max, color]', function () {
            if (!scope.value || !scope.max || !scope.color) {
              return;
            }

            var percentage = scope.value / scope.max * 100;

            element[0].style.background = 'linear-gradient(to right, ' + scope.color + ' 0%, ' + scope.color + ' ' + percentage + '%, ' + scope.color + ' ' + percentage + '%, ' + defaultBtnBackgroundColor + ' ' + percentage + '%, ' + defaultBtnBackgroundColor + '100%)';
          });
        }
      }
    });
});