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
      setRoutes();
    }
    /**
     * Set App Routes
     */
    function setRoutes() {
      App.Routes.extend(Routes);
      console.log('index');

      // String pattern or Regular Expression that
      // should be used to match against requests.
      Routes.Route.addRoute('home', function(section){
        // When home section is matched, execute as follows:
        HomeView.show(appContainerEl);
        setSection('home');
      });
      Routes.Route.addRoute('articles', function(section){
        // When articles section is matched, execute as follows:
        ArticlesView.show(appContainerEl);
        setSection('articles')
      });
      /*Routes.Route.addRoute('{/}', function(section){
        // When home section is matched, execute as follows:
        HomeView.show(appContainerEl);
        setSection('index');
      }); */
      // Updates location.hash of the current page.
      function setSection(section) {
        Routes.setHash(section);
      }

      Routes.Route.addRoute('index');
      setSection('index'); // Default landing page.
      HomeView.show(appContainerEl);
    }

    var publicMethods = {
      init: init
    };

    return publicMethods;
  }
  return IndexController();
});