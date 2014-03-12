// **util.js** is a collection of commonly used functions.
//
// ## Usage
//
// `connect.js` is accessible through `app.js` bootstrap file. To use, simply define in AMD fashion as follows:
//
// ```js
// define([ 'main', ...], function (App, ...) {
//    ...
// });
// ```
// See an example here in the demo [demo-backbone](https://github.com/jabdul/appland/blob/demo/backbone/src/module-demo-backbone/app.js)
//
// From here on you can apply the utility functions in the files of your module as:
//
// ```js
// define([ 'app', ...], function (App, ...) {
//    if (App.Util.getDataType('stringExample') != "[object Object]") {
//      return false;
//    }
//    ...
// });
// ```
//
// And now the API!
define(function () {
  function Util() {
    /**
     * # Public API
     *
     * @type {Object}
     */
    var publicMethods = {
      /**
       * ## extend
       *
       * Inheritance - Prototype Inheritance
       * Inheritance using 'Parasitic combination inheritance' pattern.
       * @param {object} subType
       * @param {object} superType
       * @return {object} subType
       */
      extend: function (subType, superType) {
        //create prototype object from superType
        var prototype = new Object(superType.prototype);
        //augment object's constructor to be that of subType
        // i.e. it overrides properties of superType
        prototype.constructor = subType;
        //assign object to subType's prototype.
        subType.prototype = prototype;
        return subType;
      },
      /**
       * ## mixin
       *
       * Inheritance - Property Inheritance
       * use of mixin approach to copy the properties of the superType
       * to the subType.
       * @param {object} subType
       * @param {object} superType
       * @return {object} subType
       * @see http://goo.gl/IKv2eJ
       */
      mixin: function (subType, superType) {
        for (var i in superType) {
          subType[i] = superType[i];
        }
        return subType;
      },
      /**
       * ## getDataType
       *
       * Get data type.
       * This check assumes the native Object has not being overwritten by
       * developer.
       * @param {*} d Reference data check.
       * @returns {string} Native constructor name if it's a reference type.
       *                    [object Object] Native Object.
       *                    [object Array] Native Array.
       *                    [object Function] Native function.
       *                    [object RegExp] Native regular expression.
       */
      getDataType: function (d) {
        return Object.prototype.toString.call(d);
      },
      /**
       * ## removeArrayVal
       *
       * Remove every occurrence of indexes with matching value.
       * @param {*} val to test against
       * @param {Array} hayStack
       * @return {Array} hayStack
       */
      removeArrayVal: function (val, hayStack) {
        for (var i = 0; i < hayStack.length; i += 1) {
          if (hayStack[i] == val) {
            hayStack.splice(i, 1);
            i--;
          }
        }
        return hayStack;
      },
      /**
       * ## inArray
       *
       * Is value in Array?
       * @param {*} needle
       * @param {Array} hayStack
       * @return {Boolean}
       */
      inArray: function (needle, hayStack) {
        for (var i = 0, len = hayStack.length; i < len; i += 1) {
          if (hayStack[i] === needle) {
            return true;
          }
        }
        return false;
      },
      /**
       * ## getQueryStringArgs
       *
       * Fetch Query String Parameters
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
        for (i; i < len; i += 1) {
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
       * ## loadStyles
       *
       * Dynamically Load Styles
       * @param {string} url
       * @param {number} pos
       */
      loadStyles: function (url, pos) {
        var link,
            head;
        pos = (typeof pos === 'number') ? +pos : 0;
        link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = url;
        head = document.getElementsByTagName("head")[0];
        head.insertBefore(link, head.childNodes[pos]);
      },
      /**
       * ## formatFloat
       *
       * Format a Float
       * @param {string | float} value
       * @param {number} precision
       * @return string
       * @example App.Util.formatFloat('123.456', 2);
       * @see http://goo.gl/Udm3aV
       */
      formatFloat: function (value, precision) {
        var power = Math.pow(10, precision || 0);
        return String((Math.round(value * power) / power).toFixed(precision));
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

