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
      var articles = $(elm).find('.marketing');
      $(elm).find('.jumbotron').remove();
      articles.innerHTML = this.tmpl;
      console.log(elm);
    };
    
    return Articles;
  });