define([
  'module-demo-web-app/app',
  'lib/requirejs/domReady!',
  'jquery',
  'module-demo-web-app/collection/article',
  'hbs!module-demo-web-app/view/tmpl/index'
],
  function (App, Doc, $, ArticleCollection, IndexTmpl) {

    var Home = {};
    App.View.extend(Home);
    Home.tmpl = IndexTmpl(null);
    Home.show = function (elm) {
      elm.innerHTML = this.tmpl;
    };
    
    return Home;
  });