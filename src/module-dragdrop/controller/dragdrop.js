require(['../common'], function (common) {
  require([
  'lib/requirejs/domReady!',
  'main',
  'jquery',
  'bootstrap',
  'module-dragdrop/model/dragdrop'
  ],
  function (doc, main, $, DragDrop) {
    var App = new main();
    
    function init() {
      setEventDelegation();
    }
  
    function setEventDelegation() {
      DragDrop.addHandler("dragstart", function(event) {
        var status = doc.getElementById("status");
        status.innerHTML = "Started dragging " + event.target.id;
      });
      DragDrop.addHandler("drag", function(event) {
        var status = doc.getElementById("status");
        status.innerHTML = "<br />Dragged " + event.target.id + " to (" + event.x + "," + event.y + ")";
      });
      DragDrop.addHandler("dragend", function(event) {
        var status = doc.getElementById("status");
        status.innerHTML = "<br />Dropped " + event.target.id + " at (" + event.x + "," + event.y + ")";
      });
    }
    
    init();
  });
});