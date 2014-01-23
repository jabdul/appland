define([
  'module-demo-web-app/app',
  'jquery',
  'module-demo-web-app/collection/article-collection',
  'hbs!module-demo-web-app/view/tmpl/articles'
],
function (App, $, ArticleCollection, ArticlesTmpl) {
  /**
   * ArticlesView Manager.
   * @type {Object}
   */
  return App.View.extend({
    /* Default constructor properties */
    tmpl: ArticlesTmpl,
    el: 'body',
    collection: new ArticleCollection()
  },
  { /* Prototype properties and methods */
    show: function (appEl) {
      appEl.html(this.tmpl({
        labels: App.getModuleConfig('module-demo-web-app').labels
      }));
    },
    findArticles: function() {
      this.collection
        .findAll()
        .listenOn('fetched', this.whenFetched(event));
    },
    whenFetched: function (event) {
      console.log('items', event);
    }
  });
});