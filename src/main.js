// **main.js** is the central object in the Appland development framework and is sometimes
// referred to as **App** (when extended). It is the object that is used to abstract access to common
// and popular libraries. By default, it currently requires jQuery, Log4JavaScript, and Douglas Crockford's
// JSON-js libraries. You can of course extend it in your bootstrap file `app.js` to configure your module
// and extend other libraries for your particular application.
// It is also the layer that facilitates communication between modules; thereby reducing potential for tight
// coupling and strong dependency.
//
// ## Usage
//
// `main.js` is commonly extended in the `app.js` bootstrap file. To use, simply define in AMD fashion as follows:
//
// ```js
// define([ 'main', ...], function (App, ...) {
//   ...
// });
// ```
//
// From here on you can reference `app` in your defines for the files in your module to access its features.
//
// See an example here in the demo [demo-backbone](https://github.com/jabdul/appland/blob/demo/backbone/src/module-demo-backbone/app.js)
//
// ## Key features
// `main.js` provides these features:
//
//  - **Utility functions**: a small set of functions for use in your projects.
//
//  - **Logger**: a facade multi-purpose logging framework based on [log4javascript](http://log4javascript.org/)
//
//  - **Module configuration**: holds configuration for your instantiated modules.
//
//  - **AJAX**: sets up connection for jQuery's AJAX communications.
//
//  - **ENV**: detects and sets your development environment.
//
//  - **GTM and GA**: for your Google Analytics needs.
//
//
// And now the API!

// ## Requires
// Include all the necessary files.
define([
  'lib/json2/json2',
  'lib/requirejs/i18n!nls/conf',
  'jquery',
  'core/util',
  'log4javascript'
],
function (JSON, AppConfig, $, Util, Log4j) {

  function App() {
    /**
     * Connection method handler.
     * @type {Object}
     * @private
     */
    var connection = null;
    /**
     * Environment.
     * DEVELOPMENT | TESTING | PRODUCTION
     * @type {string}
     * @private
     */
    var ENV = '';
    /**
     * Log4javascript console appender.
     * @type {Object}
     * @private
     */
    var LogAppender = null;
    /**
     * Enable or disable logging.
     * @type {boolean}
     * @private
     */
    var isLoggingEnabled = true;
    /**
     * Module or project' configuration.
     * @type {*}
     * @private
     */
    var config = {
      /**
       * Project's name.
       * @type {string} projectName_
       */
      projectName_: '',
      /**
       * Libraries required by project.
       * @type {Object.<string>}
       */
      libs_: {},
      /**
       * Global configuration data.
       * The configuration setup is in /src/nls/ according to locale. Changes 
       * in the configuration file will affect all module instances.
       * @type {Object.<string>}
       */
      mainConfig_: AppConfig,
      /**
       * Module specific configuration data. The configuration for each module
       * can be setup in /src/module-?/nls/ files.
       * @type {Object.<string>}
       */
      modules_: {}
    };

    /**
     * ## init
     *
     * App's Bootstrapping.
     * Need only be called once (via the public API below) in your bootstrap
     * file and ideally before DOM Ready.
     * @private
     */
    function init() {
      setEnv();
      setLogAppender();
    }
    /**
     * ## setLogAppender
     *
     * Console logger.
     * Create a console appender that is inherited by all loggers (modules).
     * Once the logger is setup in the module during App bootstrapping. You can
     * initiate the logging by the following example:
     * ```js
     *  var Log = App.getModuleConfig('module-my-app').Log;
     *
     *  Log.trace('Hello World');
     *  Log.debug('Hello World');
     *  Log.info('Hello World');
     *  Log.error('Hello World');
     *  Log.warn('Hello World');
     *  Log.fatal('Hello World');
     * ```
     * @see stackoverflow.com/questions/4872505/how-to-use-logging-mechanizm-efficiently
     * @private
     */
    function setLogAppender() {
      // To prevent multiple popup windows appearing,
      // use the existing window instance.
      if (LogAppender && isLoggingEnabled) {
        LogAppender.setUseOldPopUp(true);
        return;
      }
      
      // Create new popup console
      LogAppender = new Log4j.PopUpAppender();
 
      // Change the desired configuration options
      // LogAppender.setThreshold(Log4j.Level.ALL);
      LogAppender.setFocusPopUp(true);
      LogAppender.setNewestMessageAtTop(true);
      
      // Limit the number of messages displayed in the console at any one time.
      LogAppender.setMaxMessages(2000);
      Log4j.getRootLogger().addAppender(LogAppender);
      
      // Enable all log levels for the "MyApp.Components"
      // logger and all its descendants 
      // (including "Apl.Modules.Module1" and
      // "Apl.Modules.Module2" ...)
      Log4j.getLogger("Apl.Modules").setLevel(Log4j.Level.ALL);
      
      // Enable or disable logging.
      Log4j.setEnabled( isLoggingEnabled );
    }
    /**
     * ## setEnv
     *
     * Detect current environment.
     * Appland's dev environment uses ports 9010-9013.
     * @returns {undefined}
     * @private
     */
    function setEnv() {
      var host = document.location.host;
      switch (true) {
        case /(^127\.0\.0\.[0-9]|^localhost):901[0-9]/.test(host):
          ENV = 'DEVELOPMENT';
          break;
        case /(^localhost)/.test(host):
          ENV = 'TESTING';
          break;
        default:
          ENV = 'PRODUCTION';
          break;
      }
    }

    // Start the App.
    init();

    /**
     * # Public API
     *
     * @type {Object}
     */
    var publicMethods = {
      /**
       * ## Util API
       *
       * Function Helpers.
       * @type {object}
       * @export
       * @see [core/util.js] (/core/util.js.html)
       */
      Util: Util,
      /**
       * ## $
       *
       * jQuery API.
       * @type {object}
       * @export
       */
      $: $,
      /**
       * ## setConfig
       *
       * Application-wide configuration properties.
       * @param {Object.<string>} configObject
       * @returns {boolean} True if successfully updated, False otherwise.
       */
      setConfig: function (configObject) {
        var prop_,
            prop;

        if (Util.getDataType(configObject) != "[object Object]") {
          return false;
        }

        for (prop in configObject) {
          prop_ = prop + '_';
          if (prop_ in config) {
            config[prop_] = configObject[prop];
          } else {
            return false;
          }
        }
        return true;
      },
      /**
       * ## setModuleConfig
       *
       * Module-specific configuration properties.
       * @param {Object.<string>} configObject
       * @returns {boolean} True if successfully updated, False otherwise.
       */
      setModuleConfig: function (configObject) {
        var prop_,
            prop;

        if (Util.getDataType(configObject) != "[object Object]") {
          return false;
        }

        for (prop in configObject) {
          prop_ = prop + '_';
          config.modules_[prop_] = configObject[prop];
        }
        return true;
      },
      /**
       * ## setConnection
       *
       * Set up AJAX connection.
       * @param {Object.<string>} o The AJAX handler.
       */
      setConnection: function (o) {
        connection = o;
      },
      /**
       * ## connect
       *
       * Handles AJAX connection requests.
       * @param {string} connectionType The AJAX connection method i.e. JSON, JSONP.
       * @param {Object.<string>} o Connection properties including data, path etc.
       * @see [core/connect.js] (/core/connect.js.html)
       */
      connect: function (connectionType, o) {
        connection.request(connectionType, o);
      },
      /**
       * ## setLogging
       *
       * Logging configuration.
       * @param {{setEnabled: boolean}} o Logging configuration properties.
       */
      setLogging: function (o) {
        if (Util.getDataType(o) != "[object Object]") {
          return;
        }
        if (typeof o.setEnabled === 'boolean') {
          isLoggingEnabled = o.setEnabled;
        }
      },
      /**
       * ## getConfig
       *
       * Get config property/properties.
       * @param {string} p Specify configuration property to retrieve.
       * @param {boolean=} all opt_argument Retrieve all configuration settings.
       * @returns {*} Returns False if property does not exist.
       */
      getConfig: function (p, all) {
        if (!all) {
          var prop = p + '_';
          if (prop in config) {
            return config[prop];
          } else {
            return false;
          }
        }
        if (all) {
          return {
            projectName: config.projectName_,
            libs: config.libs_,
            modules: config.modules_
          };
        }
        return false;
      },
      /**
       * ## getModuleConfig
       *
       * Get Module-specific configuration properties.
       * @param {string} prop Specify configuration property to retrieve.
       * @param {boolean=} all opt_argument Retrieve all modules' configurations.
       * @returns {boolean} Returns False if property does not exist.
       */
      getModuleConfig: function (prop, all) {
        if (!all) {
          var prop_ = prop + '_';
          if (prop_ in config.modules_) {
            return config.modules_[prop_];
          } else {
            return false;
          }
        }
        if (all) {
          return config.modules_;
        }
        return false;
      },
      /**
       * ## getEnv
       *
       * Return environment setting.
       * @returns {string}
       */
      getEnv: function () {
        return ENV;
      },
      /**
       * ## initGtm
       *
       * Initialise Google Tag Manager (GTM).
       * @param {Object} w Window object.
       * @param {Object} d Document object.
       * @param {string} s Script tag name.
       * @param {string} l Data layer name.
       * @param {string} i GTM ID.
       * @returns {undefined}
       */
      initGtm: function (w,d,s,l,i) {
        // Create data layer if not exist
        w[l]=w[l]||[];
        w[l].push({
          'gtm.start': new Date().getTime(),
          event:'gtm.js'
        });
        // Create script tag to load ga.js and gtm asynchronously
        var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),
          dl=l!='dataLayer'?'&l='+l:'';

        j.async=true;
        j.src='//www.googletagmanager.com/gtm.js?id='+i+dl;
        f.parentNode.insertBefore(j,f);
      },
      /**
       * ## initGoogleAnalytics
       *
       * Initialise Google Analytics.
       * @param {string} accountId GA account ID.
       * @param {Array.<{slot:number,varKey:string,
       *                 varValue:string,scopeLevel:number}>} customVars
       * @param {boolean} trackPageView
       * @returns {undefined}
       */
      initGoogleAnalytics: function (accountId, customVars, trackPageView) {
        window._gaq = window._gaq || [];
        var ga,
            s;
        _gaq.push(['_setAccount', accountId]);

        for (var i = 0, len = customVars.length; i < len; i++) {
          _gaq.push([
            '_setCustomVar',
            customVars[i].slot,
            customVars[i].varKey,
            customVars[i].varValue,
            customVars[i].scopeLevel
          ]);
        }

        if (trackPageView) {
          _gaq.push(['_trackPageview']);
        }

        ga = document.createElement('script');
        ga.type = 'text/javascript';
        ga.async = true;
        ga.src = ('https:' == document.location.protocol ? 'https://ssl'
                  : 'http://www') + '.google-analytics.com/ga.js';
        s = document.getElementsByTagName('script')[0];
        s.parentNode.insertBefore(ga, s);
      }
    };

    return publicMethods;
  }

  return App();

});