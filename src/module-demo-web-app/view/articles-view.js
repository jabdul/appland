define([
  'module-demo-web-app/app',
  'jquery',
  'module-demo-web-app/collection/article-collection',
  'hbs!module-demo-web-app/view/tmpl/articles'
],
function (App, $, ArticleCollection, ArticlesTmpl) {

  var ArticlesView,
      moduleConfig = App.getModuleConfig('module-demo-web-app');

  ArticlesView = App.View.extend({
      /* Default constructor properties */
      tmpl: ArticlesTmpl
    },
    { /* Prototype properties and methods */
      show: function (appEl) {
        appEl.innerHTML = this.tmpl({
          labels: moduleConfig.labels,
          articlesTeasers: [{}]
        });
      }
    });

  //console.log(ArticlesView);

  return ArticlesView;
});