define([
  'module-appland/app',
  'lib/requirejs/domReady!',
  'bootstrap/alert',
  'hbs!module-appland/view/tmpl/dashboard'
],
function (App, Doc, BootstrapAlert, DashboardTmpl) {
  function IndexController() {
    /**
     * App's DOM Container Element.
     * @type {Object}
     */
    var $appContainerEl = App.$('#apl-content');
    /**
     * Script initialiser.
     * Executes a set of actions at start.
     */
    function init() {
      renderView();
      delegateEvents();
    }
    /**
     * Renders the view templates.
     */
    function renderView() {
      $appContainerEl.html(DashboardTmpl({
        labels: App.getModuleConfig('module-appland').labels
      }));
    }
    /**
     * Event delegation.
     */
    function delegateEvents() {
      $appContainerEl
        .on("click.apl", '.alert', function (e) {
            App.$(this).alert('close');
        });
    }

    var publicMethods = {
      init: init
    };

    return publicMethods;
  }
  return IndexController();
});