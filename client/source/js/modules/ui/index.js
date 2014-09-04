define([
  'angular',
  './button-choicebox/index',
  './menu/index',
  './modal/index',
  './transition/index'
], function (angular) {
  'use strict';

  return angular.module('app.ui', [
    'app.ui.button-choicebox',
    'app.ui.menu',
    'app.ui.modal'
  ]);
});
