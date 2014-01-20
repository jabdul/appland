define([
  'module-demo-web-app/app',
  'lib/requirejs/domReady!',
  'jquery',
  'module-demo-web-app/collection/article',
  'hbs!module-demo-web-app/view/tmpl/index',
  'module-demo-web-app/view/home',
  'module-demo-web-app/view/articles'
],
function (App, Doc, $, ArticleCollection, IndexTmpl, HomeView, ArticlesView) {
  function IndexController() {
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
          home('home');
          break;
        case '#/articles':
          articles();
          break;
        default:
          home('index');
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
        home('home');
      });
      // Articles listing page
      var articlesRoute = Routes.Route.addRoute('articles');
      articlesRoute.matched.add(function(){
        articles();
      });
      Routes.parseHash();
    }

    function home(hash){
      var home = new HomeView();
      home.show(appContainerEl);
      Routes.setHash(hash);
    }

    function articles(){
      var articles = new ArticlesView();
      articles.show(appContainerEl);
      Routes.setHash('articles');
    }

    var publicMethods = {
      init: init
    };

    return publicMethods;
  }
  return IndexController();
});