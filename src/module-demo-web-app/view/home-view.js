define([
  'module-demo-web-app/app',
  'jquery',
  'module-demo-web-app/collection/article-collection',
  'hbs!module-demo-web-app/view/tmpl/home'
],
function (App, $, ArticleCollection, HomeTmpl) {

  return App.View.extend({
    /* Default constructor properties */
    tmpl: HomeTmpl,
    el: 'body'
  },
  { /* Prototype properties and methods */
    show: function (appEl) {
      this.el = appEl;
      appEl.innerHTML = this.tmpl({
        labels: App.getModuleConfig('module-demo-web-app').labels
      });
    },
    findArticles: function() {
      var articleCollection = new ArticleCollection();

      articleCollection
        .findAll()
        .listenOn('fetched', function (event) {
          console.log('items', event);
        });
    }
  });
});