define([
  'module-demo-web-app/app',
  'lib/requirejs/domReady!',
  'jquery',
  'module-demo-web-app/controller/index-controller',
  'module-demo-web-app/controller/home-controller',
  'module-demo-web-app/controller/articles-controller'
],
function (App, Doc, $,IndexController, HomeController, ArticlesController) {
  /**
   * Routes Manager.
   * @type {Object}
   */
  return App.Routes.extend({
    /* Default constructor properties */
  },
  { /* Prototype properties and methods */
    init: function() {
      this.parseUrl();
      this.setRoutes();
    },
    parseUrl: function () {
      switch (window.location.hash) {
        case '#/home':
          this.home();
          break;
        case '#/articles':
          this.articles();
          break;
        default:
          this.index();
          break;
      }
    },
    setRoutes: function() {
      var self = this;
      // Homepage
      var homeRoute = this.Route.addRoute('home');
      homeRoute.matched.add(function(){
        self.home();
      });
      // Articles listing page
      var articlesRoute = this.Route.addRoute('articles');
      articlesRoute.matched.add(function(){
        self.articles();
      });
      this.parseHash();
    },
    index: function() {
      var index = new IndexController();
      index.init();
      this.setHash('index');
    },
    home: function() {
      var home = new HomeController();
      home.init();
      this.setHash('home');
    },
    articles: function() {
      var articles = new ArticlesController();
      articles.init();
      this.setHash('articles');
    }
  });

});