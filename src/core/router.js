define([
  'crossroads',
  'hasher'
],
  function (CrossRoads, Hasher) {
    /**
     * Router.
     * @constructor
     */
    function Router() {
      /**
       * CrossRoads library.
       * @type {*}
       * @see http://goo.gl/r5X1Lg
       */
      this.crossroads = CrossRoads;
      /**
       * Hasher library
       * @type {*}
       * @see http://goo.gl/2otk4Q
       */
      this.hasher = Hasher;

      function parseHash(newHash, oldHash){
        CrossRoads.parse(newHash);
      }
      this.hasher.initialized.add(parseHash); // parse initial hash
      this.hasher.changed.add(parseHash); //parse hash changes
      this.hasher.init(); //start listening for history change
    }

    Router.prototype = {
      constructor: Router,
      /**
       * Property getter.
       * @param {*} property to return
       */
      get: function (property) {
        return this[property];
      }
    };

    return Router;
  });