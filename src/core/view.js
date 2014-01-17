define(['jquery'],
  function ($) {
    /**
     * View.
     * @constructor
     */
    function View() {
      /**
       * Template
       * @type {*}
       */
      this.tmpl;
      /**
       * Template
       * @type {*}
       */
      this.el = '<div></div>';
    }

    View.prototype = {
      constructor: View,
      /**
       * Property getter.
       * @param {*} property to return
       * @return {*}
       */
      get: function (property) {
        if (typeof this[property] !== 'undefined') {
          return this[property];
        }
        throw Error('Property not found.');
      },
      /**
       * Property setter.
       * @param {*} property to modify
       * @param {*} value
       * @return {*}
       */
      set: function (property, value) {
        if (typeof this[property] !== 'undefined') {
          this[property] = value;
        }
        throw Error('Property not found.');
      },
      /**
       * Initialise view.
       * Entry point.
       * @abstract
       */
      init: function () {},
      /**
       * Fetches model's data from server.
       * @abstract
       */
      show: function (options) {},
      /**
       * Unbinds and removes the bound element.
       */
      destroy: function () {
        $(this.el).unbind();
        $(this.el).remove();
      }
    };

    return View;
  });