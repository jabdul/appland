requirejs.config({
  baseUrl: '../../',
  waitSeconds: 14,
  paths: {
    'jquery': 'core/jquery-loader', /* See file for version. */
    'bootstrap': 'lib/bootstrap',
    'hbs': 'lib/require-handlebars-plugin/hbs',
    'log4javascript': 'lib/log4javascript-amd/log4javascript_uncompressed'
  },
  shim: {
    'bootstrap' :  {
      deps: ["jquery"]
    },
    'Log4javascript' :  {
      exports :  'log4javascript'
    }
  },
  hbs: {
    disableI18n: true,    // This disables the i18n helper and
                          // doesn't require the json i18n files (e.g. en_us.json)
                          // (false by default)

    disableHelpers: true, // When true, won't look for and try to automatically load
                          // helpers (false by default)

    i18n: false,          // false by default

    helpers: true,        // true by default

    helperPathCallback:       // Callback to determine the path to look for helpers
      function (name) {       // ('/template/helpers/'+name by default)
        return 'module-appland/view/helpers/' + name;
      },

    templateExtension: "tmpl",  // Set the extension automatically appended to templates
                                // ('hbs' by default)

    partialsUrl: 'module-appland/view/tmpl', // base url for loading partials.

    compileOptions: {}        // options object which is passed to Handlebars compiler
  }
});

require([
  'module-appland/controller/index-controller'
],
  function (IndexController) {
    IndexController.init();
  });