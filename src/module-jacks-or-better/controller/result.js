require(['../common'], function (common) {
  require([
  'lib/requirejs/domReady!',
  'main',
  'jquery',
  'module-maxmin/model/maxmin'
  ],
  function (doc, app, $, maxmin) {
    console.log($('#maxmin-result'));
    console.log(doc.getElementById('maxmin-result'));
  
    function init() {
      
    }
  
    function setEventDelegation() {
    }
  });
});