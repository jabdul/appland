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

  var article = new Article();
  console.log(article);
  console.log(article.id);
  console.log('fetch: ', article.fetch({}));

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