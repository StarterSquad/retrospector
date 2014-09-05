define(['angular'], function (angular) {
  angular.module('app.ui.fullscreen', [])

    .service('fullscreen', function ($rootScope, $document) {
      var service = {
        isEntered: false,

        toggle: function (element) {
          if (!service.isEntered) {
            element = element || document.documentElement;

            if (element.requestFullscreen) {
              element.requestFullscreen();
            } else if (element.mozRequestFullScreen) {
              element.mozRequestFullScreen();
            } else if (element.webkitRequestFullscreen) {
              element.webkitRequestFullscreen();
            } else if (element.msRequestFullscreen) {
              element.msRequestFullscreen();
            }
          } else {
            if (document.exitFullscreen) {
              document.exitFullscreen();
            } else if (document.msExitFullscreen) {
              document.msExitFullscreen();
            } else if (document.mozCancelFullScreen) {
              document.mozCancelFullScreen();
            } else if (document.webkitExitFullscreen) {
              document.webkitExitFullscreen();
            }
          }
        }
      };

      // Detecting fullscreen state
      $document.on('mozfullscreenchange webkitfullscreenchange fullscreenchange', function () {
        service.isEntered = !service.isEntered;
        $rootScope.$digest();
      });

      return service;
    });
});
