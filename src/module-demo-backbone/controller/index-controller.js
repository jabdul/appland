define([
  'module-demo-backbone/app',
  'lib/requirejs/domReady!',
  'hbs!module-demo-backbone/view/tmpl/welcome'
],
function (App, Doc, welcomeTmpl) {
  function IndexController() {
    /**
     * App's DOM Container Element. 
     * @type {Object}
     */
    var appContainerEl = Doc.getElementById('demo-bb-content');
    /**
     * Module's configuration.
     * @type {Object}
     */
    var moduleConfig = App.getModuleConfig('module-demo-backbone');
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
      var templates = [welcomeTmpl(null)];
      appContainerEl.innerHTML = templates.join('\n');
    }
    /**
     * Event delegation.
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