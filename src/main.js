if (typeof define !== 'function' && ! define.amd) {
  throw 'RequireJs script loader is required.';
}
define(
['_util/event',
'_util/func',
'_util/storage-cookie',
'_util/storage-local'
],
function (EventManager, Func, CookieManager, LocalStorageManager) {
  /**
   * App's Configuration and Bootstrapping
   *
   * Prepare the App's configuration from static data.
   * 
   * @category Base
   * @package Base
   * @copyright Copyright (c) 2013, Craft Turf Ltd
   * @author James Abdul (james.abdul@craftturf.com)
   */
  function Base () {
    
  }
    
  Base.prototype = {
    constructor: Base,
    EventManager: EventManager,
    Func: Func,
    CookieManager: CookieManager,
    LocalStorageManager: LocalStorageManager
  };

  return Base;
});