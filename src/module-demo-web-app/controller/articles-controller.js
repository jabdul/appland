define([
  'module-demo-web-app/app',
  'lib/requirejs/domReady!',
  'module-demo-web-app/view/articles-view'
],
function (App, Doc, ArticlesView) {
  /**
   * ArticlesController Manager.
   * @type {Object}
   */
  return App.Controller.extend({
    /* Default constructor properties */
  },
  { /* Prototype properties and methods */
    init: function() {
      var articles = new ArticlesView();
      //console.log(articles);
      articles.show(Doc.getElementById('demo-web-app-content'));
      console.log(articles.findArticles());
    }
  });
});