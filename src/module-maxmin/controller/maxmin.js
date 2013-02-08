if (typeof require !== 'undefined') {
  require(
  ['lib/requirejs/domReady!',
  'main',
  'lib/jquery/jquery',
  'module-maxmin/model/maxmin'
  ], 
  function (doc, app, $, maxmin) {
    alert($);
  
    function init() {
      
    }
  
    function setEventDelegation() {
    }
  });
}
