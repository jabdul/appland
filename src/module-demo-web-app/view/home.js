define([
  'module-demo-web-app/app',
  'jquery',
  'module-demo-web-app/collection/article',
  'module-demo-web-app/model/article',
  'hbs!module-demo-web-app/view/tmpl/index'
],
function (App, $, ArticleCollection, Article, IndexTmpl) {

  var Home = {},
      moduleConfig = App.getModuleConfig('module-demo-web-app');

  /*var article = new Article();
  console.log(article);
  console.log(article.id);
  console.log('fetch: ', article.fetch({}));  */

  /**
   * Holds a collection of Articles.
   * @type {ArticleCollection}
   */
  var articleCollection = new ArticleCollection();
  //console.log(articleCollection);
  //console.log(this);
  articleCollection
    .findAll()
    .listenOn('fetched', function(event){
      console.log('items', event.items);
    });
  //console.log();
  //console.log(article.id);
  //console.log('fetch: ', article.fetch({}));

  /**
   * Presentation
   */
  App.View.extend(Home);
  Home.tmpl = IndexTmpl({
    labels: moduleConfig.labels,
    articlesTeasers: [{}]
  });

  Home.show = function (elm) {
    elm.innerHTML = this.tmpl;
  };

  return Home;
});