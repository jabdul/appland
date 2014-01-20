define([
  'module-demo-web-app/app',
  'lib/requirejs/domReady!',
  'jquery',
  'module-demo-web-app/view/home-view',
  'module-demo-web-app/view/articles-view'
],
function (App, Doc, $, HomeView, ArticlesView) {
  /**
   * App's DOM Container Element.
   * @type {Object}
   */
  var appContainerEl = Doc.getElementById('demo-web-app-content');
  /**
   * Routes Manager.
   * @type {Object}
   */
  var Routes;

  Routes = App.Routes.extend({
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
          this.home('home');
          break;
        case '#/articles':
          this.articles();
          break;
        default:
          this.home('index');
          break;
      }
    },
    setRoutes: function() {
      var self = this;
      // Homepage
      var homeRoute = this.Route.addRoute('home');
      homeRoute.matched.add(function(){
        self.home('home');
      });
      // Articles listing page
      var articlesRoute = this.Route.addRoute('articles');
      articlesRoute.matched.add(function(){
        self.articles();
      });
      this.parseHash();
    },
    home: function(hash) {
      var home = new HomeView();
      home.show(appContainerEl);
      this.setHash(hash);
    },
    articles: function() {
      var articles = new ArticlesView();
      articles.show(appContainerEl);
      this.setHash('articles');
    }
  });

  return Routes;
});