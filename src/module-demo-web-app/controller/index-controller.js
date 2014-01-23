define([
  'module-demo-web-app/app',
  'jquery',
  'module-demo-web-app/view/home-view'
],
function (App, $, HomeView) {
  /**
   * IndexController Manager.
   * @type {Object}
   */
  return App.Controller.extend({
    /* Default constructor properties */
    view: new HomeView()
  },
  { /* Prototype properties and methods */
    init: function() {
      //console.log(home);
      this.view.show($('#demo-web-app-content'));
      console.log(this.view.findArticles());
    }
  });
});