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
        if (typeof this[property] !== 'undefined') {
          return this[property];
        }
        throw new Error('Property not found.');
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
       * @return {boolean}
       */
      isCached: function () {}
    };

    return Model;
  });