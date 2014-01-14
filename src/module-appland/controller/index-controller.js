define([
  'module-appland/app',
  'lib/requirejs/domReady!',
  'jquery',
  'lib/requirejs/hbs!module-appland/view/tmpl/simple-sidebar'
],
function (App, Doc, $, SimpleSidebarTmpl) {
  function IndexController() {
    /**
     * App's DOM Container Element. 
     * @type {Object}
     */
    var appContainerEl = $('#apl-content');
    /**
     * Script initialiser.
     * Executes a set of actions at start.
     * @returns {undefined}
     */
    function init() {
      renderView();
      delegateEvents();
      setRoutes();
    }
    function setRoutes() {
      // Collection of links to parse as routes.
      var navs = appContainerEl.find('ul.sidebar-nav>li>a');
      // String pattern or Regular Expression that
      // should be used to match against requests.
      App.Route.addRoute('{/}', function(section){
        // For each route that matches, execute as follows:
        console.log(section);
      });
      // Add the list to routes collection.
      App.parseRoutes(navs);
      // Parse the current page.
      App.Route.parse('dashboard');
      App.Hash.setHash('dashboard');
    }
    /**
     * Renders the view templates.
     * @returns {undefined}
     */
    function renderView() {
      var templates = [
        SimpleSidebarTmpl(null)
      ];
      appContainerEl.html(templates.join('\n'));
    }
    /**
     * Event delegation.
     * @returns {undefined}
     */
    function delegateEvents() {
      /*$(Doc)
        .on("click.apl.job",
          '#wgsn-promo-intro-close', function (e) {
          e.preventDefault();
        })
        .on("change.apl.job",
          '#wgsn-promo-never-show-intro', function (e) {
        });*/
    }

    var publicMethods = {
      init: init
    };

    return publicMethods;
  }
  return IndexController();
});