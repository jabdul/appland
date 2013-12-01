define([
  'module-appland/app',
  'lib/requirejs/domReady!',
  'lib/requirejs/hbs!module-appland/view/tmpl/navbar',
  'lib/requirejs/hbs!module-appland/view/tmpl/jumbotron',
  'lib/requirejs/hbs!module-appland/view/tmpl/content'
],
function (App, Doc, NavBarTmpl, JumboTronTmpl, ContentTmpl) {
  function IndexController() {
    /**
     * App's DOM Container Element. 
     * @type {Object}
     */
    var appContainerEl = Doc.getElementById('apl-content');
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
      var templates = [
          NavBarTmpl(null),
          JumboTronTmpl(null),
          ContentTmpl(null)
      ];
      appContainerEl.innerHTML = templates.join('\n');
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