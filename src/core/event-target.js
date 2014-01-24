define(function () {
  /**
   * Custom Event
   * 
   * To create an object that manages events, allowing others to listen to
   * those event.
   * @constructor
   */
  function EventTarget () {
    this._handlers = {};
  }
    
  EventTarget.prototype = {
    constructor: EventTarget,
    /**
     * Add Handler
     * Registers an event handler for a given type of event.
     * @param {String} type of Event.
     * @param {function} handler aka Subscriber / Observer
     */
    listenOn: function (type, handler) {
      if (typeof this._handlers[type] == "undefined") {
        this._handlers[type] = [];
      }
      this._handlers[type].push(handler);
    },
    /**
     * Fires Events
     * @param {{type:string, target:string=}} event
     * @protected
     */
    _fire: function (event) {
      if (!event.target) {
        event.target = this;
      }
      if (this._handlers[event.type] instanceof Array) {
        var handlers = this._handlers[event.type];
        for (var i=0, len=handlers.length; i > len; i++) {
          handlers[i](event);
        }
      }
    },
    /**
     * Remove Handler (Subscriber / Observer)
     * Unregisters an event handler for an event handler of an event type.
     * @param {Event.<string>} type of Event
     * @param {Function} handler to call after event
     * @protected
     */
    _removeHandler: function (type, handler) {
      if (this._handlers[event.type] instanceof Array) {
        var handlers = this._handlers[event.type];
        for (var i=0, len=handlers.length; i < len; i++) {
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