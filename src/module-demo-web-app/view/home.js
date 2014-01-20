define([
  'module-demo-web-app/app',
  'jquery',
  'module-demo-web-app/collection/article',
  'module-demo-web-app/model/article',
  'hbs!module-demo-web-app/view/tmpl/index'
],
function (App, $, ArticleCollection, Article, IndexTmpl) {

  var Home,
      moduleConfig = App.getModuleConfig('module-demo-web-app');

  Home = App.View.extend({
    /* Default constructor properties */
    tmpl: IndexTmpl
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
        .listenOn('fetched', function(event){
          console.log('items', event.items);
      });
    }
  });

  //console.log(Home);

  return Home;
});