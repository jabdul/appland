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
App.Model.MaxMin = function (arrVals) {
	this._max = +Infinity;
	this._min = -Infinity;
	
	if ( arguments.length != 1 || ! this.isValidEntry(arrVals) ) {
		throw "The input must be an array";
	}
	this._max = Math.max.apply(null, arrVals);
	this._min = Math.min.apply(null, arrVals);
};

App.Model.MaxMin.prototype = {
	constructor: App.Model.MaxMin,
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


