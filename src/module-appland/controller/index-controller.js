define([
  'module-appland/app',
  'lib/requirejs/domReady!',
  'hbs!module-appland/view/tmpl/dashboard'
],
function (App, Doc, DashboardTmpl) {
  function IndexController() {
    /**
     * App's DOM Container Element.
     * @type {Object}
     */
    var appContainerEl = App.$('#apl-content');
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
      appContainerEl.html(DashboardTmpl({
        labels: App.getModuleConfig('module-appland').labels
      }));
    }
    /**
     * Event delegation.
     * @returns {undefined}
     */
    function delegateEvents() {
    }

    var publicMethods = {
      init: init
    };

    return publicMethods;
  }
  return IndexController();
});