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
    'angular-ui-select2': 'vendor/angular-ui-select2/src/select2',
    'select2'       : 'vendor/select2/select2',
    'ngResource'    : 'vendor/angular-resource/angular-resource',
    'ngCookies'     : 'vendor/angular-cookies/angular-cookies',
    'ui.router'     : 'vendor/angular-ui-router/release/angular-ui-router',
    '_'    : 'vendor/underscore/underscore',
    'js-md5'        : 'vendor/js-md5/js/md5'
  },

  shim: {
    'angular': {
      'deps': ['jquery'],
      'exports': 'angular'
    },
    'angular-ui-select2': ['angular', 'select2'],
    'select2': ['jquery'],
    'ngResource': ['angular'],
    'ngCookies': ['angular'],
    'ui.router' : ['angular']
  }
});
