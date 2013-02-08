if (typeof define === 'function' && define.amd) {
  define(function () {
  /**
   * MaxMin
   * 
   * Find and return the minimum and maximum values 
   * from a list of numbers.
   * 
   * @param {null}
   * @constructor
   * @returns {null} 
   */
  function MaxMin (arrVals) {
    this._max = +Infinity;
    this._min = -Infinity;
    
    if ( arguments.length != 1 || ! this.isValidEntry(arrVals) ) {
      throw "The input must be an array";
    }
    this._max = Math.max.apply(null, arrVals);
    this._min = Math.min.apply(null, arrVals);
  }
    
  MaxMin.prototype = {
    constructor: MaxMin,
    /**
     * Test input entry
     * 
     * @interface
     * @param {Array} arrVals
     * @returns {Boolean} True if valid, False otherwise.
     */
    isValidEntry: function (arrVals) {
      return (arrVals instanceof Array)? true: false;
    },
    /**
     * Get Maximum Number
     * 
     * @param {null}
     * @returns {number}
     */
    getMaxNum: function () {
      return this._max;
    },
    /**
     * Get Minimum Number
     * 
     * @param {null}
     * @returns {number}
     */
    getMinNum: function () {
      return this._min;
    }
  };

  return MaxMin;
  });
} else {
  throw 'RequireJs script loader is required.';
}