define([],
  function () {
    /**
     * Controller.
     * @constructor
     */
    function Controller() {
      /**
       * Array of other controllers used by this controller.
       * @type {Array}
       * @private
       */
      this.uses = [];
    }

    Controller.prototype = {
      constructor: Controller,
      /**
       * Property getter.
       * @param {*} property to return
       * @return {*}
       */
      get: function (property) {
        if (Object.prototype.hasOwnProperty.call(this, property)) {
          return this[property];
        }
        throw new Error('Property not found.');
      },
      /**
       * Property setter.
       * @param {*} property to modify
       * @param {*} value
       * @return {*}
       * @see http://goo.gl/DvOrz9
       */
      set: function (property, value) {
        if (Object.prototype.hasOwnProperty.call(this, property)) {
          this[property] = value;
          return;
        }
        throw new  Error('Property not found.');
      },
      /**
       * Entry point.
       * It is to be overridden by inheriting objects.
       * @abstract
       */
      init: function () {}
    };

    return Controller;
  });