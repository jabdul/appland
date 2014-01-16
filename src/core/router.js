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
      //this.crossroads = CrossRoads;
      /**
       * CrossRoads library.
       * @type {*}
       * @see http://goo.gl/r5X1Lg
       */
      this.Route = CrossRoads;
      /**
       * Hasher library
       * @type {*}
       * @see http://goo.gl/2otk4Q
       */
      this.hasher = Hasher;
    }

    Router.prototype = {
      constructor: Router,
      /**
       * Property getter.
       * @param {*} property to return
       */
      get: function (property) {
        return this[property];
      },
      /**
       * Sets Hasher.
       * @param {*} fragment to hash
       */
      setHash: function (fragment) {
        console.log('sethash: '+ fragment);
        this.hasher.setHash(fragment);
      },
      /**
       * Initialise and parse hash.
       */
      parseHash: function () {
        var self = this;
        function parseHash(newHash, oldHash){
          self.Route.parse(newHash);
        }
        this.hasher.initialized.add(parseHash); // parse initial hash
        this.hasher.changed.add(parseHash); //parse hash changes
        this.hasher.init(); //start listening for history change
      }
    };

    return Router;
  });