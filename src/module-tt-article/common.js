requirejs.config({
  baseUrl: '../../',
  waitSeconds: 14,
  paths: {
    'jquery': 'core/jquery-loader', /* See file for version. */
    'hbs': 'lib/hbs/hbs',
    'handlebars': 'lib/handlebars/handlebars',
    'json': 'lib/requirejs/json',
    'angular': 'lib/angular/angular',
    'log4javascript': 'lib/log4javascript-amd/log4javascript_uncompressed',
    'angular-route': 'lib/angular-route/angular-route'
    /*'app': 'module-tt-article/controller/index-controller',
    'routes': 'module-tt-article/route/routes' */
  },
  shim: {
    'angular': {
      exports: 'angular'
    },
    'angular-route': {
      deps: ['angular']
    },
    'Log4javascript' :  {
      exports :  'log4javascript'
    }
  },
  hbs: {
    disableI18n: true,        // This disables the i18n helper and
    // doesn't require the json i18n files (e.g. en_us.json)
    // (false by default)

    disableHelpers: false,    // When true, won't look for and try to automatically load
    // helpers (false by default)

    helperPathCallback:       // Callback to determine the path to look for helpers
      function (name) {       // ('/template/helpers/'+name by default)
        return 'core/helpers/' + name;
      },

    templateExtension: "tmpl",// Set the extension automatically appended to templates
    // ('hbs' by default)

    compileOptions: {}        // options object which is passed to Handlebars compiler
  }
});

require([
  'module-tt-article/controller/index-controller',
  'angular-route'
],
  function (IndexController, angularRoute) {
   IndexController.init();
  });
/*
define([
  'require',
  'angular',
  'app',
  'routes'
], function (require, ng) {
  'use strict';

  require(['lib/requirejs/domReady!'], function (document) {
    ng.bootstrap(document, ['app']);
  });
}); */