define([
  'module-jacks-or-better/app',
  'lib/requirejs/domReady!',
  'jquery'
],
function (App, Doc, $) {
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
      delegateEvents();
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