define(['core/observer-list', 'core/event-target', 'core/util'],
  function (ObserverList, EventTarget, Util) {
    /**
     * Collection.
     * @param {{}} o options
     * @constructor
     */
    function Collection(o) {
      EventTarget.call(this);
      o = o || {};
      /**
       * Model.
       * @type {object}
       */
      this.model = o.model || null;
      /**
       * Configuration.
       * @type {object}
       */
      this.config = o.config || null;
      /**
       * Configuration.
       * @type {object}
       * @private
       */
      this._observerList = new ObserverList();
    }

    Util.extend(Collection, EventTarget);

    Collection.prototype = {
      constructor: Collection,
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
       */
      set: function (property, value) {
        if (Object.prototype.hasOwnProperty.call(this, property)) {
          this[property] = value;
          return;
        }
        throw new  Error('Property not found.');
      },
      /**
       * Updates the items collection.
       * @param {Array.<object>} items list.
       */
      setItems: function (items) {
        var len = items.length,
            i = 0,
            m = null;
        for (; i < len; i++){
          m = new this.model();
          for (var p in items[i]) {
            m.set(p, items[i][p]);
          }
          this._observerList.Add(m);
        }
        console.log(items);
        this._fire({type: 'fetched', items: items});
      },
      /**
       * Returns a list of stringyfied items.
       * @return {Array.<{}>}
       */
      toList: function () {
        var len = this._observerList.Count(),
            i = 0,
            item = null,
            items = [];

        for (; i < len; i++) {
          item = this._observerList.Get(i);
          items.push(this.toJSON(item));
        }
        //console.log(items);
        return items.length? items: [{}];
      },
      /**
       * Returns the serialised form of this object.
       * @returns {Object} obj to stringify
       */
      toJSON: function (obj) {
        return JSON.stringify(obj);
      },
      /**
       * Find item by id.
       * @param {number} id of item.
       */
      find: function (id) {
        this.fetch(id);
        return this;
      },
      /**
       * Returns all items.
       */
      findAll: function () {
        this.fetch();
        return this;
      },
      /**
       * Fetches model's data from server.
       * @param {*=} id
       */
      fetch: function (id) {}
    };

    return Collection;
  });