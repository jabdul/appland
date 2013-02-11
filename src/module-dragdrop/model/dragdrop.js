if (typeof define !== 'function' && !define.amd) {
  throw 'RequireJs script loader is required.';
}
define(['main'],function (main) {
  //"use strict";
  //console.log(new App);
  var App = new main(),
      dragdrop = new App.EventTarget(),
      dragging = null,
      diffX = 0,
      diffY = 0;
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
    
    switch (event.type) {
      case "mousedown":
        if (target.className.indexOf("draggable" > -1)) {
          dragging = target;
          diffX = event.clientX - target.offsetLeft;
          diffY = event.clientY - target.offsetTop;
          dragdrop.fire({
            type:"dragstart",
            target: dragging,
            x: event.clientX,
            y: event.clientY
          });
        }
        break;
      case "mousemove":
        if (dragging !== null) {
          dragging.style.left = (event.clientX - diffX) + 'px';
          dragging.style.top = (event.clientY - diffY) + 'px';
          dragdrop.fire({
            type: "drag",
            target: dragging,
            x: event.clientX,
            y: event.clientY
          });
        }
        break;
      case "mouseup":
          dragdrop.fire({
            type: "dragend",
            target: dragging,
            x: event.clientX,
            y: event.clientY
          });
          dragging = null;
        break;
       default:
        break;
    }
  }
  
  /**
   * Test input entry
   * 
   * @interface
   * @param {null}
   * @returns {null}
   * @public
   */
  dragdrop.enable = function () {
    App.EventManager.addHandler(document, "mousedown", handleEvent);
    App.EventManager.addHandler(document, "mousemove", handleEvent);
    App.EventManager.addHandler(document, "mouseup", handleEvent);
  };
  /**
   * Get Maximum Number
   * 
   * @param {null}
   * @returns {null}
   * @public
   */
  dragdrop.disable = function () {
    App.EventManager.removeHandler(document, "mousedown", handleEvent);
    App.EventManager.removeHandler(document, "mousemove", handleEvent);
    App.EventManager.removeHandler(document, "mouseup", handleEvent);
  };
    
  return dragdrop;
});