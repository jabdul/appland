define([
  'lib/requirejs/i18n!nls/conf',
  'core/util',
  'core/router',
  'core/model',
  'core/view',
  'log4javascript'
],
function (AppConfig, Util, Router, BaseModel, BaseView, Log4j) {

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
     * App's Bootstrapping.
     * These actions are performed before DOM Ready.
     */
    function init() {
      setEnv();
      setLogAppender();
    }
    /**
     * Console logger.
     * Create a console appender that is inherited by all loggers (modules).
     * Once the logger is setup in the module during App bootstrapping. You can
     * initiate the logging by the following example:
     * @example var Log = App.getModuleConfig('module-image-viewer').Log;
     *              Log.trace('Hello World');
     *              Log.debug('Hello World');
     *              Log.info('Hello World');
     *              Log.error('Hello World');
     *              Log.warn('Hello World');
     *              Log.fatal('Hello World');
     * @see stackoverflow.com/questions/4872505/how-to-use-logging-mechanizm-efficiently
     * @returns {undefined}
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
     * Detect current environment.
     * @returns {undefined}
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
    /**
     * Extend class.
     * This is a combination of constructor function inheriting from another
     * constructor function (YUI extend) and a use of mixin approach to copy
     * the properties of the superType to the subType.
     * @param subType is the destination pseudo-sublass
     * @param Source  is the class to inherit from.
     */
    function extendMixin (subType, Source){
      if (typeof subType == 'object') {
        var F = function(){};
        var superType = new Source();
        F.prototype = superType.prototype;
        subType.prototype = new F();
        Util.mixin(subType, superType);
      } else {
        throw new Error('A data type "object" is expected.');
      }
    }

    // Start the App.
    init();

    var publicMethods = {
      /**
       * Function Helpers.
       * @type {object}
       * @export
       */
      Util: Util,
      /**
       * Model creator.
       * @type {Object}
       * @private

      Model: {
        extend: function (subType){
          return Util.extend(subType, BaseModel);
        }
      },*/
      Model: {
        extend: function (prop, proto){
          var Model = function () {
                BaseModel.call(this, prop);
                for (var i in prop) {
                  this[i] = prop[i];
                }
              };
          // Inherit parent prototype
          Model = Util.extend(Model, BaseModel);
          // Override prototype where applicable.
          for (var j in proto) {
            Model.prototype[j] = proto[j];
          }

          return Model;
        }
      },
      /**
       * View creator.
       * @type {Object}
       * @private
       */
      View: {
        extend: function (subType){
          extendMixin(subType, BaseView);
        }
      },
      /**
       * Routes creator.
       * @type {Object}
       * @private
       */
      Routes: {
        extend: function (subType){
          extendMixin(subType, Router);
        }
      },
      /**
       * Modify App's configuration properties.
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
       * Modules's configuration properties.
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
       * Set up AJAX connection.
       * @param {Object.<string>} o The AJAX handler.
       */
      setConnection: function (o) {
        connection = o;
        setLogAppender();
      },
      /**
       * Handle AJAX connection requests.
       * @param {string} connectionType The AJAX connection method i.e. JSON, JSONP.
       * @param {Object.<string>} o Connection properties including data, path etc.
       * @returns {undefined}
       */
      connect: function (connectionType, o) {
        connection.request(connectionType, o);
      },
      /**
       * Logging configuration.
       * @param {{setEnabled: boolean}} o Logging configuration properties.
       * @returns {undefined}
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
       * Return enviroment setting.
       * @returns {string}
       */
      getEnv: function () {
        return ENV;
      },
      /**
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