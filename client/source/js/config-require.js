if (typeof define !== 'function') {
  // to be able to require file from node
  var define = require('amdefine')(module);
}

define({
  baseUrl: '.',
  // Here paths are set relative to `/source` folder
  paths: {
    'angular'       : 'vendor/angular/angular',
    'async'         : 'vendor/requirejs-plugins/src/async',
    'jquery'        : 'vendor/jquery/dist/jquery',
    'moment'        : 'vendor/moment/min/moment.min',
    'ngResource'    : 'vendor/angular-resource/angular-resource',
    'ngCookies'     : 'vendor/angular-cookies/angular-cookies',
    'ui.router'     : 'vendor/angular-ui-router/release/angular-ui-router',
    'underscore'    : 'vendor/underscore/underscore',
    'js-md5'        : 'vendor/js-md5/js/md5'
  },

  shim: {
    'angular': {
      'deps': ['jquery'],
      'exports': 'angular'
    },
    'ngResource': ['angular'],
    'ngCookies': ['angular'],
    'ui.router' : ['angular']
  }
});
