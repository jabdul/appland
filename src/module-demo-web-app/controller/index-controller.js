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
     * Module's configuration.
     * @type {Object}
     */
    var moduleConfig = App.getModuleConfig('module-demo-web-app');
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
          HomeView.show(appContainerEl);
          Routes.setHash('home');
          break;
        case '#/articles':
          ArticlesView.show(appContainerEl);
          Routes.setHash('articles');
          break;
        default:
          HomeView.show(appContainerEl);
          Routes.setHash('index'); // Default landing page.
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
        HomeView.show(appContainerEl);
        Routes.setHash('home');
      });
      // Articles listing page
      var articlesRoute = Routes.Route.addRoute('articles');
      articlesRoute.matched.add(function(){
        ArticlesView.show(appContainerEl);
        Routes.setHash('articles');
      });
      Routes.parseHash();
    }

    var publicMethods = {
      init: init
    };

    return publicMethods;
  }
  return IndexController();
});