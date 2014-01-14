requirejs.config({
  baseUrl: '../../src/',
  waitSeconds: 14,
  paths: {
    'jquery': 'lib/jquery-1-9-1/jquery', /* jQuery Version 1.9.1 */
    'bootstrap': 'lib/bootstrap/bootstrap',
    'hbs': 'lib/hbs/hbs',
    'handlebars': 'lib/handlebars/handlebars',
    'json': 'lib/requirejs/json',
    'underscore': 'lib/underscore-amd/underscore',
    'log4javascript': 'lib/log4javascript-amd/log4javascript_uncompressed'
  },
  shim: {
    'underscore': {
        exports: '_'
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