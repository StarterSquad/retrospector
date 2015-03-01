define([
  'angular',
  './button-choicebox/index',
  './btn-progress/index',
  './fullscreen/index',
  './menu/index',
  './modal/index',
  './transition/index'
], function (angular) {
  'use strict';

  return angular.module('app.ui', [
    'app.ui.btn-progress',
    'app.ui.button-choicebox',
    'app.ui.fullscreen',
    'app.ui.menu',
    'app.ui.modal'
  ]);
});
