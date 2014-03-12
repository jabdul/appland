// # **connect.js**
// **connect.js** is the facade object for accessing [jQuery's HTTP Ajax](https://api.jquery.com/jQuery.ajax/) API request.
//
// ## Usage
//
// `connect.js` is commonly setup in the `app.js` bootstrap file. To use, simply define in AMD fashion as follows:
//
// ```js
// define([ 'main', ...], function (App, ...) {
//    var connect = new Connect(AppConfig.Server);
//    App.setConnection(connect);
// });
// ```
// See an example here in the demo [demo-backbone](https://github.com/jabdul/appland/blob/demo/backbone/src/module-demo-backbone/app.js)
//
// From here on you can access jQuery's Ajax via the `app` instance in the files of your module.
//
// ```js
// define([ 'app', ...], function (App, ...) {
//    App.connect('json', {
//      path: '/url/to/file.json',
//      type: 'GET',
//      done: function (data, textStatus) {
//        ...
//      },
//      fail: function (jqXHR, textStatus, errorThrown) {
//        throw new Error("Service ERROR: Could not fetch.");
//      }
//    });
// });
// ```
//
// ## Key features
// `connect.js` provides these features:
//
//  - **Settings mappings**: a one-to-one mapping with the latest release of jQuery's Ajax API.
//
//
// And now the API!

// ## Requires
// Include all the necessary files.
define(['jquery'],
  function ($) {
    /**
     * ## Connect Constructor
     *
     * Bind to a server for AJAX requests.
     * @param {Object.<string>} o Connect's properties i.e. server's scheme,
     * port, and hostname.
     * @constructor
     */
    function Connect(o) {
      /**
       * URL Scheme.
       * @type {string}
       * @private
       */
      this.protocol = o.protocol || '';
      /**
       * Server's hostname or IP address.
       * @type {string}
       * @private
       */
        this.hostname = o.hostname || '';
      /**
       * Server's Port Number.
       * @type {number}
       * @private
       */
      this.port = o.port || null;
      /**
       * The AJAX configuration and setup.
       * @type {object.<string>}
       * @private
       */
      this.requestConfig = null;
    }

    Connect.prototype = {
      constructor: Connect,
      /**
       * ## Connect.prototype.request
       *
       * Server Connection Adapter.
       * Handles the connection method requests.
       * @param {String} dataType Event's type
       * @param {{data: string, path: string, success: function(Object, string),
       *        dataType: string, async: boolean, type: string, isLocal: string,
       *        cache: boolean, error: function(Object, string, *),
       *        complete: function(Object, string),
       *        statusCode: {}, done: function(Object, string, *),
       *        fail: function(Object, string, *),
       *        always: function(Object, string, *),
       *        then: function(Object, string, *)}} o options and configuration.
       */
      request: function (dataType, o) {
        this.requestConfig = {
          data: (typeof o.data === 'undefined') ? null : o.data,
          path: o.path,
          dataType: o.dataType || 'json',
          async: o.async || true,
          type: o.type || 'get',
          isLocal: o.isLocal || false,
          cache: o.cache || true,
          success: o.success ||
            function (data, textStatus) {},
          error: o.error ||
            function (jqXHR, textStatus, errorThrown) {},
          complete: o.complete ||
            function (jqXHR, textStatus) {},
          statusCode: o.statusCode || {},
          done: o.done ||
            function (data, textStatus, jqXHR) {},
          fail: o.fail ||
            function (data, textStatus, errorThrown) {},
          always: o.always  ||
            function (data, textStatus, jqXHROrErrorThrown) {},
          then: o.then  ||
            function (dataOrjqXHR, textStatus, jqXHROrErrorThrown) {}
        };

        // Apply polymorphic operation
        if (this.requestConfig.dataType) {
          this[dataType + 'Connect']();
        }
      },
      /**
       * ## Connect.prototype.jsonConnect
       *
       * JSON type request.
       */
      jsonConnect: function () {
        $.ajax({
          url: this.requestConfig.path,
          type: this.requestConfig.type,
          isLocal: this.requestConfig.isLocal,
          context: document.body,
          dataType: this.requestConfig.dataType,
          data: this.requestConfig.data,
          cache: this.requestConfig.cache,
          async: this.requestConfig.async,
          success: this.requestConfig.success,
          error: this.requestConfig.error,
          complete: this.requestConfig.complete,
          statusCode: this.requestConfig.statusCode
        })
          .done(this.requestConfig.done)
          .fail(this.requestConfig.fail)
          .always(this.requestConfig.always)
          .then(this.requestConfig.then);
      },
      /**
       * ## Connect.prototype.htmlConnect
       *
       * HTML type request.
       */
      htmlConnect: function () {
        $.ajax({
          url: this.requestConfig.path,
          type: this.requestConfig.type,
          isLocal: this.requestConfig.isLocal,
          context: document.body,
          dataType: this.requestConfig.dataType,
          data: this.requestConfig.data,
          cache: this.requestConfig.cache,
          async: this.requestConfig.async,
          success: this.requestConfig.success,
          error: this.requestConfig.error,
          complete: this.requestConfig.complete,
          statusCode: this.requestConfig.statusCode
        })
          .done(this.requestConfig.done)
          .fail(this.requestConfig.fail)
          .always(this.requestConfig.always)
          .then(this.requestConfig.then);
      },
      /**
       * ## Connect.prototype.getUrl
       *
       * Create the URL from discreet segments.
       * @return {?string} The URL.
       */
      getUrl: function () {
        var protocol = (this.protocol) ?
            this.protocol + '//' : 'http://',
            hostname = this.hostname || '',
            port = (this.port) ? ':' + this.port : '';

        if (hostname) {
          return (protocol + hostname + port);
        } else {
          return "";
        }
      }
    };

    return Connect;
  });
