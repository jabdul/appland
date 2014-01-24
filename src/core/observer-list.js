define(function () {
  /**
   * Observer List.
   * Part of the Design Patterns.
   * @param {{}} options
   * @constructor
   * @see http://goo.gl/2HiFSQ
   */
  function ObserverList (options) {
    options = options || [];
    /**
     * A collection of Observers.
     * @type {Array.<object>}
     * @private
     */
    this.observerList = options.observers || [];
  }
    
  ObserverList.prototype = {
    constructor: ObserverList,
    /**
     * Add Observer to the queue.
     * @param {object} o Observer.
     * @returns {Array.<object>} Observer collection including new member.
     */
    Add: function (o) {
      return this.observerList.push(o);
    },
    /**
     * Empty collection of Observers.
     * @returns {undefined}
     */
    Empty: function () {
      this.observerList = [];
    },
    /**
     * Number of items (Observers) in collection.
     * @returns {number} Number of items.
     */
    Count: function () {
      return this.observerList.length;
    },   
    /**
     * Get a particular Observer from collection.
     * @param {number} index of Observer to return.
     * @returns {*} Requested Observer if exists.
     */
    Get: function (index) {
      if( index > -1 && index < this.observerList.length ){
        return this.observerList[ index ];
      }
    },
    /**
     * Insert an Observer to the beginning or end of collection.
     * @param {object} o Observer.
     * @param {number} index position to insert Observer.
     * @returns {number} Position of Observer in the list.
     */
    Insert: function (o, index) {
      var pointer = -1;

      if( index === 0 ) {
        this.observerList.unshift( o );
        pointer = index;
      } else if ( index === this.observerList.length ) {
        this.observerList.push( o );
        pointer = index;
      }
    
      return pointer;
    },
    /**
     * Get the position of Observer in the collection.
     * @param {object} o Observer.
     * @param {number} startIndex of Position to start the search from.
     * @returns {number} Position of Observer in the list.
     */
    IndexOf: function (o, startIndex) {
      var pointer = -1;

      while( startIndex < this.observerList.length ){
        if( this.observerList[startIndex] === o ){
          pointer = startIndex;
        }
      }
    
      return pointer;
    },
    /**
     * Remove Observer from collection.Either at the beginning or end of list.
     * @param {number} index position of Observer.
     */
    RemoveAt: function (index) {
      if( index === 0 ){
        this.observerList.shift();
      }else if( index === this.observerList.length -1 ){
        this.observerList.pop();
      }
    }
  };
  
  return ObserverList;
});