define([
  'module-demo-web-app/app',
  'lib/requirejs/domReady!',
  'jquery',
  'module-demo-web-app/controller/index-controller',
  'module-demo-web-app/controller/home-controller',
  'module-demo-web-app/controller/articles-controller'
],
function (App, Doc, $, IndexController, HomeController, ArticlesController) {
  function Routes() {
    /**
     * App's DOM Container Element.
     * @type {Object}
     */
    var appContainerEl = Doc.getElementById('demo-web-app-content');
    /**
     * Routes Manager.
     * @type {Object}
     */
    var Routes = {};
    /**
     * Script initialiser.
     * Module's single point entry.
     */
    function init() {
      App.Routes.extend(Routes);
      parseUrl();
      setRoutes();
    }
    /**
     * Set App Routes
     */
    function parseUrl() {
      switch (window.location.hash) {
        case '#/home':
          home();
          break;
        case '#/articles':
          articles();
          break;
        default:
          index();
          break;
      }
    }
    /**
     * Set App Routes.
     * String pattern or Regular Expression
     * should be used to match against requests.
     */
    function setRoutes() {
      // Homepage
      var homeRoute = Routes.Route.addRoute('home');
      homeRoute.matched.add(function(){
        home();
      });
      // Articles listing page
      var articlesRoute = Routes.Route.addRoute('articles');
      articlesRoute.matched.add(function(){
        articles();
      });
      Routes.parseHash();
    }

    function index(){
      var index = new HomeController();
      index.init();
      Routes.setHash('index');
    }

    function home(){
      var home = new HomeController();
      home.init();
      Routes.setHash('home');
    }

    function articles(){
      var articles = new ArticlesController();
      articles.init();
      Routes.setHash('articles');
    }

    var publicMethods = {
      init: init
    };

    return publicMethods;
  }

  return Routes();
});