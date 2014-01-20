define([
  'module-demo-web-app/app',
  'lib/requirejs/domReady!',
  'module-demo-web-app/view/home-view'
],
function (App, Doc, HomeView) {
  /**
   * HomeController Manager.
   * @type {Object}
   */
  return App.Controller.extend({
  /* Default constructor properties */
  },
  { /* Prototype properties and methods */
    init: function() {
      var home = new HomeView();
      //console.log(home);
      home.show(Doc.getElementById('demo-web-app-content'));
      console.log(home.findArticles());
    }
  });
});