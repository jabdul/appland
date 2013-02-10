if (typeof define !== 'function' && !define.amd) {
  throw 'RequireJs script loader is required.';
}
define(['main'],function (App) {
  "use strict";
  
  var dragging = null,
      diffx = 0,
      diffy = 0;
  /**
   * DragDrop
   * 
   * Event handler for dragging instances.
   * 
   * @param {Object event}
   * @returns {null}
   * @private
   */
  function handleEvent (event) {
    event = App.EventManager.getEvent(event);
    var target = App.EventManager.getTarget(event);
  }
    
  return {
    /**
     * Test input entry
     * 
     * @interface
     * @param {null}
     * @returns {null}
     * @public
     */
    enable: function () {
    },
    /**
     * Get Maximum Number
     * 
     * @param {null}
     * @returns {null}
     * @public
     */
    disable: function () {
    },
    /**
     * Get Minimum Number
     * 
     * @param {null}
     * @returns {null}
     * @public
     */
    getMinNum: function () {
    }
  };
});