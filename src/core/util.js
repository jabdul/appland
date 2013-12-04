/**
 * Helper Utiltions
 *
 * Discrete functions and helpers.
 *
 * @category Util
 * @package Util
 * @author James Abdul (james.abdul@craftturf.com)
 */
define(function () {
  function Util() {
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
       * @return {Object} Name value properties
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
        var link,
            head;
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
       * @example App.Util('123.456', 2);
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
          var startPos = matches[0].indexOf(pathStartFrom);

          if (startPos > -1) {
            return matches[0].substring(startPos);
          }
          return '';
        }
        return matches[0];
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
        if (e.target.parentElement && 
          e.target.parentElement[property] !== "") {
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
          if (matches !== null && matches[1] !== null) {
            rv = matches[1];
          }
        } else {
          var re = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
          matches = re.exec(ua);
          if (matches !== null && matches[1] !== null) {
            rv = matches[1];
          }
        }

        return rv;
      },
      /**
       * Trim a string
       * @param {string} s
       * @return string
       */
      trim: function (s) {
        return s.replace(/^\s+|\s+$/g, '');
      }
    };

    return publicMethods;
  }

  return Util();
});

