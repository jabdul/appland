define([
  'module-demo-web-app/app',
  'jquery',
  'module-demo-web-app/collection/article-collection',
  'module-demo-web-app/model/article-model',
  'hbs!module-demo-web-app/view/tmpl/home'
],
function (App, $, ArticleCollection, Article, HomeTmpl) {

  var HomeView,
      moduleConfig = App.getModuleConfig('module-demo-web-app');

  HomeView = App.View.extend({
    /* Default constructor properties */
    tmpl: HomeTmpl
  },
  { /* Prototype properties and methods */
    show: function (appEl) {
      appEl.innerHTML = this.tmpl({
        labels: moduleConfig.labels,
        articlesTeasers: this.findArticles()
      });
    },
    findArticles: function() {
      var articleCollection = new ArticleCollection();

      articleCollection
        .findAll()
        .listenOn('fetched', this.whenFetched(event));
    },
    whenFetched: function (event) {
      console.log('items', event);
    }
  });

  //console.log(Home);

  return HomeView;
});