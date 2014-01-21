requirejs.config({
  baseUrl: '../../',
  waitSeconds: 14,
  paths: {
    'jquery': 'core/jquery-loader', /* See file for version. */
    'bootstrap': 'lib/bootstrap/bootstrap',
    'hbs': 'lib/require-handlebars-plugin/hbs',
    'json': 'lib/requirejs/json',
    'underscore': 'lib/underscore-amd/underscore',
    "signals": "lib/js-signals/dist/signals",
    "crossroads": "lib/crossroads/dist/crossroads",
    "hasher": "lib/hasher/dist/js/hasher",
    'log4javascript': 'lib/log4javascript-amd/log4javascript_uncompressed'
  },
  shim: {
    'crossroads': {
      //These script dependencies should be loaded before loading
      //crossroads.js
      deps: ['hasher','signals'],
      //Once loaded, use the global 'crossroads' as the
      //module value.
      exports: 'crossroads'
    },
    'underscore': {
        exports: '_'
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
        return 'core/helpers/' + name;
      },

    templateExtension: "tmpl",  // Set the extension automatically appended to templates
    // ('hbs' by default)

    partialsUrl: 'module-demo-web-app/view/tmpl', // base url for loading partials.

    compileOptions: {}        // options object which is passed to Handlebars compiler
  }
});

require([
  'module-demo-web-app/routes'
],
  function (Routes) {
    var routes = new Routes();
    console.log(routes);
    routes.init();
  });