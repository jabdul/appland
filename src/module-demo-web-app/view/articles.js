define([
  'module-demo-web-app/app',
  'jquery',
  'module-demo-web-app/collection/article',
  'hbs!module-demo-web-app/view/tmpl/articles'
],
function (App, $, ArticleCollection, ArticlesTmpl) {

  var Articles = {},
      moduleConfig = App.getModuleConfig('module-demo-web-app');
      /*data = {}*/

  App.View.extend(Articles);

  //data = moduleConfig.labels3;
  //data['teasers'] = moduleConfig.labels;
  //data['labels3'] = moduleConfig.labels3;

  Articles.tmpl = ArticlesTmpl({
    labels: moduleConfig.labels,
    articlesList: [{}]
  });

  Articles.show = function (elm) {
    elm.innerHTML = this.tmpl;
  };

  return Articles;
});