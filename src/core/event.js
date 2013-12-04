/**
 * Event Handling
 *
 * Normalises the differences in the implementation of event 
 * handling across the major browsers. One notable omission is
 * with multiple event handlers in an element (target). In all major
 * browsers except IE, the handlers are executed in order of 
 * appearance. In IE, the last defined handler is executed first.
 * Also the 'Event' object's runs in the scope of the target.
 * Whereas in IE, it is attached to window (window.event). So, avoid
 * the use of 'this' (this.event.preventDefault).
 * 
 * @category Event
 * @package Util
 * @author Nicholas Zakas
 * @author James Abdul (james.abdul@craftturf.com)
 */
define(function () {
  return {
    /**
     * Add Event Handler
     *
     * Remember that multiple handlers can be assigned to a target
     * in DOM Level 2 supported browsers. Only one is supported in
     * DOM Level 0.
     *
     * @param object element Target DOM element (subject)
     * @param {string} type Event type
     * @param object handler Event handler (listener/observer)
     * @return null
     */
    addHandler: function(element, type, handler){
      if (element.addEventListener){
        element.addEventListener(type, handler, false);
      } else if (element.attachEvent){
        element.attachEvent("on" + type, handler);
      } else {
        element["on" + type] = handler;
      }
    },

    /**
     * Get Event Object
     *
     * Get the Event object if not in scope of target.
     *
     * @param Object Event object to be returned in scope.
     * @return object
     */
    getEvent: function(event){
      return event ? event : window.event;
    },
    
    /**
     * Get Event Target
     *
     * Whether it is assigned by javaScript or by an HTML attribute.
     *
     * @param Object Event
     * @return object DOM element
     */
    getTarget: function(event){
      return event.target || event.srcElement;       
    },

    /**
     * Prevent Default Behavior
     *
     * Cancels the default behavior of the event.
     *
     * @param Object Event
     * @return null
     */
    preventDefault: function(event){
      if (event.preventDefault){
        event.preventDefault();
      } else {
        event.returnValue = false;
      }
    },
    
    /**
     * Remove Event Handler
     *
     * Remove the Event handler to reduce memory consumption.
     *
     * @param object element Target DOM element (subject)
     * @param {string} type Event type
     * @param object handler Event handler (listener/observer)
     * @return null
     */
    removeHandler: function(element, type, handler){
      if (element.removeEventListener){
        element.removeEventListener(type, handler, false);
      } else if (element.detachEvent){
        element.detachEvent("on" + type, handler);
      } else {
        element["on" + type] = null;
      }
    },

    /**
     * Prevent Event Flow
     *
     * Cancels further event bubbling and/or capturing.
     *
     * @param Object Event
     * @return null
     */
    stopPropagation: function(event){
      if (event.stopPropagation){
        event.stopPropagation();
      } else {
        event.cancelBubble = true;
      }
    }
  };
});