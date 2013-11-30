define([
  'module-{MODULE-NAME}/app',
  'lib/requirejs/domReady!',
  'lib/requirejs/hbs!module-{MODULE-NAME}/view/tmpl/welcome'
],
function (App, Doc, WelcomeTmpl) {
  function IndexController() {
    /**
     * App's DOM Container Element. 
     * @type {Object}
     */
    var appContainerEl = Doc.getElementById('{MODULE-NAMESPACE-PREFIX}-content');
    /**
     * Script initialiser.
     * Executes a set of actions at start.
     * @returns {undefined}
     */
    function init() {
      renderView();
      delegateEvents();
    }
    /**
     * Renders the view templates.
     * @returns {undefined}
     */
    function renderView() {
      $(appContainerEl).append(
        WelcomeTmpl(null)
      );
    }
    /**
     * Event delegation.
     * @returns {undefined}
     */
    function delegateEvents() {
      $(Doc)
        .on("click.apl.job",
          '#wgsn-promo-intro-close', function (e) {
          e.preventDefault();
        })
        .on("change.apl.job",
          '#wgsn-promo-never-show-intro', function (e) {
        });
    }

    var publicMethods = {
      init: init
    };

    return publicMethods;
  }
  return IndexController();
});