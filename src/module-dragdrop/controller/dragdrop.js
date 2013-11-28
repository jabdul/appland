require(['../common'], function (common) {
  require([
  'lib/requirejs/domReady!',
  'main',
  'jquery',
  'bootstrap',
  'module-dragdrop/model/dragdrop'
  ],
  function (doc, App, $, bs, DragDrop) {
    
    function init() {
      setEventDelegation();
    }
  //console.log(App);
    function setEventDelegation() {
      var dd = new DragDrop();
      App.EventManager.addHandler("dragstart", function(event) {
        var status = doc.getElementById("status");
        status.innerHTML = "Started dragging " + event.target.id;
      });
      App.EventManager.addHandler("drag", function(event) {
        var status = doc.getElementById("status");
        status.innerHTML = "<br />Dragged " + event.target.id + " to (" + event.x + "," + event.y + ")";
      });
      App.EventManager.addHandler("dragend", function(event) {
        var status = doc.getElementById("status");
        status.innerHTML = "<br />Dropped " + event.target.id + " at (" + event.x + "," + event.y + ")";
      });
    }
    
    init();
  });
});