define([
  'module-demo-web-app/app',
  'jquery',
  'module-demo-web-app/collection/article-collection',
  'hbs!module-demo-web-app/view/tmpl/articles'
],
function (App, $, ArticleCollection, ArticlesTmpl) {

  return App.View.extend({
    /* Default constructor properties */
    tmpl: ArticlesTmpl,
    el: 'body'
  },
  { /* Prototype properties and methods */
    show: function (appEl) {
      appEl.innerHTML = this.tmpl({
        labels: App.getModuleConfig('module-demo-web-app').labels
      });
    }
  });
});