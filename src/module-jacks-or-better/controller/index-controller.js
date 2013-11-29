define([
  'module-jacks-or-better/app',
  'lib/requirejs/domReady!',
  'jquery',
  'bootstrap',
  'lib/requirejs/hbs!module-jacks-or-better/view/tmpl/topnav',
  'lib/requirejs/hbs!module-jacks-or-better/view/tmpl/main',
  'lib/requirejs/hbs!module-jacks-or-better/view/tmpl/footer'
],
function (App, Doc, $, Bootstrap, TopNavTmpl, MainTmpl, FooterTmpl) {
  function IndexController() {
    /**
     * App's DOM Container Element. 
     * @type {Object}
     */
    var appContainerEl = Doc.getElementById('apl-job-content');
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
        TopNavTmpl(null) +
        MainTmpl(null) +
        FooterTmpl(null)
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