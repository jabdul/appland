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
      renderView(setRoutes);
      delegateEvents();
    }
    function setRoutes() {
      // String pattern or Regular Expression that
      // should be used to match against requests.
      App.Route.addRoute('{/}', function(section){
        // For each route that matches, execute as follows:
        //console.log(section);
      });
      // Updates location.hash of the current page.
      App.Hash.setHash('dashboard');
    }
    /**
     * Renders the view templates.
     * @returns {undefined}
     */
    function renderView(callBack) {
      var templates = [
        SimpleSidebarTmpl(null)
      ];
      appContainerEl.html(templates.join('\n'));
      callBack();
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