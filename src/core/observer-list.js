define(function () {
  /**
   * Observer List.
   * Part of the Design Patterns.
   * @param {null}
   * @constructor
   * @returns {null}
   * @see http://goo.gl/2HiFSQ
   */
  function ObserverList () {
    /**
     * A collection of Observers.
     * @type {Array.<object>}
     * @private
     */
    this.observerList = [];
  }
    
  ObserverList.prototype = {
    constructor: ObserverList,
    /**
     * Add Observer to the queue.
     * @param {object} Observer.
     * @returns {Array.<object>} Observer collection including new member.
     */
    Add: function (o) {
      return this.observerList.push( obj );
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
     * @param {number} Observer to return.
     * @returns {object} Requested Observer.
     */
    Get: function (index) {
      if( index > -1 && index < this.observerList.length ){
        return this.observerList[ index ];
      }
    },
    /**
     * Insert an Observer to the beginning or end of collection.
     * @param {object} Observer.
     * @param {number} Position to insert Observer.
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
     * @param {object} Observer.
     * @param {number} Position to start the search from.
     * @returns {number} Position of Observer in the list.
     */
    IndexOf: function (o, startIndex) {
      var i = startIndex, pointer = -1;

      while( i < this.observerList.length ){
        if( this.observerList[i] === o ){
          pointer = i;
        }
      }
    
      return pointer;
    },
    /**
     * Remove Observer from collection.Either at the beginning or end of list.
     * @param {number} Index position of Observer.
     * @returns {undefined}
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