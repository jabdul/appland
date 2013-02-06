require(["util/ct-util-event.js"], function(util) {
    //This function is called when scripts/helper/util.js is loaded.
    //If util.js calls define(), then this function is not fired until
    //util's dependencies have loaded, and the util argument will hold
    //the module value for "helper/util".
});

var App = App || {};
App.Model = App.Model || {};
App.Controller = App.Controller || {};


/**
 * App's Configuration and Bootstrapping
 *
 * Prepare the App's configuration from static data.
 * 
 * @category App
 * @package Config
 * @copyright Copyright (c) 2013, Craft Turf Ltd
 * @author James Abdul (james.abdul@craftturf.com)
 */
App.Config = (function() {

	function init() {
		
	}
	
	return {
		
        initConfig: function() {
			init();
        }
   };
})();