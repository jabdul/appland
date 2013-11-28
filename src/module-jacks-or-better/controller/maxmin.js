require(['../common'], function (common) {
  require([
  'lib/requirejs/domReady!',
  'main',
  'jquery',
  'module-maxmin/model/maxmin'
  ],
  function (doc, app, $, maxmin) {
    console.log($('#maxmin-title'));
    console.log(doc.getElementById('maxmin-title'));
  
    function init() {
      
    }
  
    function setEventDelegation() {
    }
  });
});