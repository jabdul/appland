define(['jquery'],
  function ($) {
    /**
     * Bind to a server for AJAX requests.
     * @param {Object.<string>} o Connect's properties i.e. server's scheme,
     * port, and hostname.
     * @constructor
     * @return {undefined}
     */
    function Connect(o) {
      /**
       * URL Scheme.
       * @type {string}
       * @private
       */
      this.protocol = o.protocol || null,
      /**
       * Server's hostname or IP address.
       * @type {string}
       * @private
       */
        this.hostname = o.hostname || null;
      /**
       * Server's Port Number.
       * @type {number}
       * @private
       */
      this.port = o.port || null;
      /**
       * The AJAX configuration and setup.
       * @type {{data: string, path: string, success: function(Object, string),
       *        dataType: string, async: boolean, type: string, isLocal: string}}
       * @private
       */
      this.requestConfig = null;
    }

    Connect.prototype = {
      constructor: Connect,
      /**
       * Server Connection Adapter.
       * Handles the connection method requests.
       * @param {String} dataType Event's type
       * @param {function} o The Subscriber / Observer.
       * @return {undefined}
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
          statusCode: o.statusCode || {
            200: function () {}
          },
          done: o.done ||
            function (data, textStatus, jqXHR) {},
          fail: o.fail ||
            function (data, textStatus, errorThrown) {},
          always: o.always  ||
            function (data, textStatus, jqXHROrErrorThrown) {},
          then: o.then  ||
            function (dataOrjqXHR, textStatus, jqXHROrErrorThrown) {}
        };

        if (this.requestConfig.dataType) {
          this[dataType + 'Connect']();
        }
      },
      /**
       * JSON type request.
       * @return {undefined}
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
       * HTML type request.
       * @return {undefined}
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
        });
      },
      /**
       * Create the URL from discreet segments.
       * @return {?string} The URL.
       */
      getUrl: function () {
        var protocol = (this.protocol) ? this.protocol + '//' : 'http://',
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
