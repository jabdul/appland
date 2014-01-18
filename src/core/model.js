define([],
  function () {
    /**
     * Model.
     * @param {{}} o options
     * @constructor
     */
    function Model(o) {
      o = o || {};
      /**
       * Unique Id.
       * @type {*}
       * @private
       */
      this.id = o.id || -1;
    }

    Model.prototype = {
      constructor: Model,
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
       * Update properties.
       * @param {?object=} options containing name/value pairs.
       */
      update: function (options) {},
      /**
       * Fetches model's data from server.
       * @param {?object=} options containing name/value pairs.
       */
      fetch: function (options) {
        return this.id;
      },
      /**
       * Is this model cached?
       * Checks the serialised localStorage object for matching id.
       */
      isCached: function () {}
    };

    return Model;
  });