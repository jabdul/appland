define([
  'module-demo-web-app/app',
  'lib/requirejs/domReady!',
  'jquery',
  'module-demo-web-app/collection/article',
  'hbs!module-demo-web-app/view/tmpl/articles'
],
  function (App, Doc, $, ArticleCollection, ArticlesTmpl) {

    var Articles = {};
    App.View.extend(Articles);
    Articles.tmpl = ArticlesTmpl(null);
    Articles.show = function (elm) {
      elm.innerHTML = this.tmpl;
    };
    
    return Articles;
  });