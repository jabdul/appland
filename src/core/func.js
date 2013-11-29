/**
 * Helper Functions
 *
 * Discrete functions and helpers.
 *
 * @category Func
 * @package Util
 * @author James Abdul (james.abdul@craftturf.com)
 */
define(function () {
  function Func() {
    var publicMethods = {
      /**
       * Inheritance - Prototype Inheritance
       * Inheritance using 'Parasitic combination inheritance' pattern.
       * @param {object} subType
       * @param {object} superType
       */
      extend: function (subType, superType) {
        var prototype = new Object(superType.prototype); //create prototype object
        prototype.constructor = subType; //augment object
        subType.prototype = prototype; //assign object
      },
      /**
       * Capitalise First Letter
       * @param {string} str The text
       * @return {string}
       */
      capFirstLetter: function (str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
      },
      /**
       * Remove Value(s) from an Array
       * @param {*} needle
       * @param {Array} hayStack
       * @param {*} replace   Default=null
       * @return {Array} hayStack
       */
      arrayVal: function (needle, hayStack, replace) {
        for (var i = 0; i < hayStack.length; i++) {
          if (hayStack[i] == needle) {
            hayStack.splice(i, 1);
            i--;
          }
        }
        return hayStack;
      },
      /**
       * Is value in Array?
       * @param {*} needle
       * @param {Array} hayStack
       * @return {Boolean}
       */
      inArray: function (needle, hayStack) {
        for (var i = 0, len = hayStack.length; i < len; i++) {
          if (hayStack[i] === needle) {
            return true;
          }
        }
        return false;
      },
      /**
       * Fetch Query Parameters
       * @return object Name value properties
       */
      getQueryStringArgs: function () {
        //get query string without the initial ?
        var qs = (location.search.length > 0 ? location.search.substring(1) : ""),
          args = {},
        //get individual items
          items = qs.length ? qs.split("&") : [],
          item = null,
          name = null,
          value = null,
          i = 0,
          len = items.length;
        //assign each item onto the args object
        for (i; i < len; i++) {
          item = items[i].split("=");
          name = decodeURIComponent(item[0]);
          value = decodeURIComponent(item[1]);
          if (name.length) {
            args[name] = value;
          }
        }
        return args;
      },
      /**
       * Dynamically Load Styles
       * @param {string} url
       * @param {number} pos
       * @return string
       */
      loadStyles: function (url, pos) {
        var link = '',
          head = '',
          items = null,
          n = 0;
        pos = (typeof pos === 'number') ? pos : 0;
        link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = url;
        head = document.getElementsByTagName("head")[0];
        head.insertBefore(link, head.childNodes[pos]);
      },
      /**
       * Format a Float
       * @param {string | float} value
       * @param {number} precision
       * @return string
       * @example App.Func('123.456', 2);
       * @see http://stackoverflow.com/questions/661562/how-to-format-a-float-in-javascript
       */
      formatFloat: function (value, precision) {
        var power = Math.pow(10, precision || 0);
        return String((Math.round(value * power) / power).toFixed(precision));
      },
      /**
       * Checks argument's type
       * @param {string} argument The argument to test
       * @param {string} type The variable type to test against
       */
      isType: function (argument, type) {
        if (typeof argument === 'undefined') {
          return false;
        }
        if (argument.constructor != type) {
          /*console.error('Invalid argument type. Expected ' + type.name +
           ', received ' + argument.constructor.name + ' instead.'); */
          return false;
        }
        return true;
      },
      /**
       * Return resource's path from given URL. Any suffix string is
       * stripped away.
       * @param {string} resourceUrl Resource URL.
       * @param {string} fileExt File extension i.e jpg, gif, xls
       * @param {boolean} withoutDomainName Excluding domain name?
       * @param {?string} pathStartFrom Path start search from.
       * @returns {string} Resource path or empty string.
       */
      getResourcePath: function (resourceUrl, fileExt, withoutDomainName, pathStartFrom) {
        var re = new RegExp("^(.*?)\\." + '(jpg|jpeg|eps|psd|ai|tif|png)', "i"),
          matches = re.exec(resourceUrl);
        if (withoutDomainName) {
          var pathPrefix = (pathStartFrom) ? pathStartFrom : '/content/dam/';
          var startPos = matches[0].indexOf(pathPrefix);

          if (startPos > -1) {
            return matches[0].substring(startPos);
          }
          return '';
        }
        return matches[0];
      },
      /**
       * Get path from URL.
       * @param {string} url The URL.
       * @return {string|undefined}
       */
      getPathFromUrl: function (url) {
        var me = this;
        if (!me.isType(url, String)) {
          return;
        }
        var schemeEndText = "://",
          indexOfSchemeEnd = url.indexOf(schemeEndText),
          urlWithoutScheme = (indexOfSchemeEnd >= 0) ?
            url.substring(indexOfSchemeEnd + schemeEndText.length) :
            url,
          indexOfPathStart = urlWithoutScheme.indexOf('/'),
          pathWithExtension = (indexOfPathStart >= 0) ?
            urlWithoutScheme.substring(indexOfPathStart) :
            urlWithoutScheme,
          indexOfExtensionStart = pathWithExtension.lastIndexOf("."),
          path = (indexOfExtensionStart > 0) ?
            pathWithExtension.substring(0, indexOfExtensionStart) :
            pathWithExtension;
        me = null;
        return path;
      },
      /**
       * Get path from URL.
       * @param {string} resourceUrl Resource URL.
       * @param {string} fileExt File extension i.e jpg, gif, xls
       * @return {Array.<number>} Returns the coordinates in the following order:
       *          [W,N,E,S]
       * @example http://www.wgsn.com/content/...shoe/Next20130225_0315.JPG.image.W1251N301E1765S990.original.JPG
       */
      getCropCoordinatesFromUrl: function (resourceUrl, fileExt) {
        var re = new RegExp("W([0-9]+)N([0-9]+)E([0-9]+)S([0-9]+)", ""),
          matches = re.exec(resourceUrl),
          coordinates = [0, 0, 0, 0];

        if (matches) {
          coordinates = [ matches[1], matches[2], matches[3], matches[4] ];
        }
        return coordinates;
      },
      /**
       * Get file extension.
       * @param {string} resource
       * @return {string} Returns the file extension.
       */
      getFileExt: function (resource) {
        if (typeof resource !== 'string' || resource == '') {
          return '';
        }
        var re = new RegExp(".([a-z]+)$", "i"),
            matches = re.exec(resource);

        if (matches[1]) {
          return matches[1];
        }
        return '';
      },
      /**
       * Is the resource a non-jpg file? i.e CAD file.
       * @param {string} resource
       * @return {boolean}
       */
      isCadFile: function (resource) {
        if (typeof resource !== 'string' || resource == '') {
          return false;
        }
        var re = new RegExp(".([a-z]+)$", "i"),
            matches = re.exec(resource),
            self = this;

        if (matches[1] &&
            self.inArray(matches[1], ['eps','psd','ai','tif','png'])) {
          return true;
        }
        return false;
      },
      /**
       * Checks the coordinates for valid values and returns crop status.
       * @param {Array.<number>} coords
       * @return {boolean}
       */
      isImageCropped: function (coords) {
        var cropped =
          coords[0] +
            coords[1] +
            coords[2] +
            coords[3];
        return !!(cropped > 0);
      },
      // http://coding.smashingmagazine.com/2011/10/19/optimizing-long-lists-of-yesno-values-with-javascript/
      packValues: function pack(/* string */ values) {
        var chunks = values.match(/.{1,16}/g), packed = '';
        for (var i = 0; i < chunks.length; i++) {
          packed += String.fromCharCode(parseInt(chunks[i], 2));
        }
        return packed;
      },

      unpackValues: function (/* string */ packed) {
        var values = '';
        for (var i = 0; i < packed.length; i++) {
          values += packed.charCodeAt(i).toString(2);
        }
        return values;
      },
      /**
       * Returns attribute value of event's target element if exists.
       * Works with touch devices also whereby the intended target's
       * parent element's event may be fired instead.
       * @param {Event} e Event object.
       * @param {string} property For example 'className' or 'id'?
       * @return {string}
       */
      getTargetAttributeValue: function (e, property) {
        var attribute = '';
        if (!e.target) {
          return attribute;
        }
        if (e.target[property] && e.target[property] !== "") {
          attribute = e.target[property];
          return attribute;
        }
        if (e.target.parentElement
          && e.target.parentElement[property] !== "") {
          attribute = e.target.parentElement[property];
        }
        return attribute;
      },
      /**
       * Parses the UA string and extracts the version from the token.
       * @param {boolean} tridentToken If set, returns the trident
       *                  token value instead.
       * @return {number} Returns the version of Internet Explorer/Trident
       *                  or a -1.
       * @see http://msdn.microsoft.com/en-us/library/ms537509(v=vs.85).aspx
       */
      getInternetExplorerVersion: function (tridentToken) {
        var rv = -1; // Return value assumes failure
        var ua = navigator.userAgent;
        var matches;

        if (tridentToken) {
          var tridentRe = new RegExp("Trident/([0-9]{1,}[\.0-9]{0,})");
          matches = tridentRe.exec(ua);
          if (matches != null && matches[1] != null) {
            rv = matches[1];
          }
        } else {
          var re = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
          matches = re.exec(ua);
          if (matches != null && matches[1] != null) {
            rv = matches[1];
          }
        }

        return rv;
      }
    };

    return publicMethods;
  }

  if (typeof String.prototype.trim !== 'function') {
    String.prototype.trim = function () {
      return this.replace(/^\s+|\s+$/g, '');
    }
  }

  return Func();
});

