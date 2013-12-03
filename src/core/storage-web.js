/**
 * Web Storage
 *
 * Session, Local, and Global storage.
 * Storage limit of 2.5Mb to unlimited on some browsers for
 * sessionStorage, whilst a cap of 5Mb for local/globalStorage
 * on major browsers.
 * sessionStorage is not available to local files and is accessible
 * only to the document that originally placed the data.
 * 
 * @category StorageLocal
 * @package Util
 * @author Nicholas Zakas
 * @author James Abdul (james.abdul@craftturf.com)
 * @see http://dev-test.nemikor.com/web-storage/support-test/
 */
define(function () {
  return {
    /**
     * Get Local / Global Storage
     *
     * Returns either the localStorage or globalStorage object
     * depending on browser support, otherwise throw Error if 
     * neither is supported.
     * Useful for storing between 2.5Mb - 5Mb of persistent data
     * across sessions.
     * Information is tied to 'origin'(scheme, host, port).
     * LocalStorage is supported in these browsers:
     * IE	Firefox		Safari	Chrome	Opera	IPhone	Android
     * 8+ 3.5       4.0+    4.0+    10.5+ 2.0+    2.0+
     *
     * @return object
     * @exception e
     * @see WebStorage API: http://dev.w3.org/html5/webstorage/
     */
    getLocalStorage: function(){
      if (typeof localStorage == 'object'){
        return localStorage;
      } else if (typeof globalStorage == 'object'){
        return globalStorage[location.host];
      } else {
        throw new Error('Local storage not available.');
      }
    },

    /**
     * Clear all stored values
     * @return boolean
     */
    clearAll: function() {	
      if (typeof localStorage == 'object'){
        localStorage.clear();
        return true;
      } else if (typeof globalStorage == 'object'){
        globalStorage.clear();
        return true;
      }
      return false;
    }
  };
});