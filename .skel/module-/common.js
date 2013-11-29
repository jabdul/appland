requirejs.config({
  baseUrl: '../../',
  waitSeconds: 14,
  shim: {
    'Log4javascript': {
      exports: 'log4javascript'
    }
  },
  paths: {
    'jquery': 'core/jquery-loader', /* jQuery Version 1.9.1 */
    'bootstrap': 'lib/bootstrap/bootstrap',
    'hbs': 'lib/hbs/hbs',
    'handlebars': 'lib/handlebars/handlebars',
    'log4javascript': 'lib/log4javascript-amd/log4javascript_uncompressed'
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
  'module-{MODULE-NAME}/controller/index-controller'
],
  function (IndexController) {
    IndexController.init();
  });