if (typeof define === 'function' && define.amd) {
  define(
  ['_util/ct-util-event',
  '_util/ct-util-funcs',
  '_util/ct-util-storage'
  ],
  function (EventManager, Func, Storage) {
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
    function Init () {
      
    }
      
    Init.prototype = {
      constructor: Init
    };
  
    return Init;
  });
} else {
  throw 'RequireJs script loader is required.';
}