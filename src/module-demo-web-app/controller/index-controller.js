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
      console.log(window.location.hash, window.location.href.indexOf("#"));
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
          console.log('home found');
          Routes.setHash('home');
          break;
        case '#/articles':
          ArticlesView.show(appContainerEl);
          console.log('articles found');
          Routes.setHash('articles');
          break;
        default:
          HomeView.show(appContainerEl);
          console.log('index found');
          Routes.setHash('index'); // Default landing page.
          break;
      }
    }
    /**
     * Set App Routes
     */
    function setRoutes() {
      // String pattern or Regular Expression that
      // should be used to match against requests.
     /* Routes.Route.addRoute('home', function(section){
        // When home section is matched, execute as follows:
        console.log('route: home');
        HomeView.show(appContainerEl);
        Routes.setHash('home');
      });
      Routes.Route.addRoute('articles', function(section){
        // When articles section is matched, execute as follows:
        console.log('route: articles');
        ArticlesView.show(appContainerEl);
        Routes.setHash('articles');
      }); */


      var homeRoute = Routes.Route.addRoute('home');
      //HomeView.show(appContainerEl);
      homeRoute.matched.add(function(){
        HomeView.show(appContainerEl);
        Routes.setHash('home');
      });

      var articlesRoute = Routes.Route.addRoute('articles');
      //ArticlesView.show(appContainerEl);
      articlesRoute.matched.add(function(){
        ArticlesView.show(appContainerEl);
        Routes.setHash('articles');
      });
      Routes.parseHash();
      /*Routes.Route.addRoute('{/}', function(section){
        // When home section is matched, execute as follows:
        HomeView.show(appContainerEl);
        setSection('index');
      }); */
      // Updates location.hash of the current page.
     /*
      Routes.Route.addRoute('index');
      setSection('index'); // Default landing page.
      HomeView.show(appContainerEl);   */
    }

    var publicMethods = {
      init: init
    };

    return publicMethods;
  }
  return IndexController();
});