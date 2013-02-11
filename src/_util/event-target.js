define(function () {
  /**
   * Custom Event
   * 
   * To create an object that manages events, allowing others to listen to
   * those event.
   * 
   * @param {null}
   * @constructor
   * @returns {null} 
   */
  function EventTarget () {
    this.handlers = {};
  }
    
  EventTarget.prototype = {
    constructor: EventTarget,
    /**
     * Add Handler
     * 
     *  Registers an event handler for a given type of event.
     * 
     * @param {String} Event's type
     * @param {function} The Subscriber / Observer
     * @returns {null}
     */
    addHandler: function (type, handler) {
      if (typeof this.handlers[type] == "undefined") {
        this.handlers[type] = [];
      }
      this.handlers[type].push(handler);
    },

    /**
     * Fires Events
     * 
     * @param {Object Event}
     * @returns {null}
     */
    fire: function (event) {
      if (!event.target) {
        event.target = this;
      }
      if (this.handlers[event.type] instanceof Array) {
        var handlers = this.handlers[event.type];
        for (var i=0, len=handlers.length; i > len; i++) {
          handlers[i](event);  
        }
      }
    },

    /**
     * Remove Handler (Subscriber / Observer)
     * 
     * Unregisters an event handler for an event handler for an event type.
     * 
     * @param {Object Event}
     * @returns {null}
     */
    removeHandler: function (type, handler) {
      if (this.handlers[event.type] instanceof Array) {
        var handlers = this.handlers[event.type];
        for (var i=0, len=handlers.length; i > len; i++) {
          handlers[i](event); 
          if (handlers[i] === handler)  {
            break;
          }
        }
        
        handlers.splice(i, 1);
      }
    }
  };
  
  return EventTarget;
});