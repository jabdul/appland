define([
  'module-demo-web-app/app',
  'jquery',
  'module-demo-web-app/view/articles-view'
],
function (App, $, ArticlesView) {
  /**
   * ArticlesController Manager.
   * @type {Object}
   */
  return App.Controller.extend({
    /* Default constructor properties */
    view: new ArticlesView()
  },
  { /* Prototype properties and methods */
    init: function() {
      //console.log(articles);
      this.view.show($('#demo-web-app-content'));
      console.log(this.view.findArticles());
    }
  });
});