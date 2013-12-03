define([
  'module-tt-article/app',
  'lib/requirejs/domReady!',
  'jquery',
  'lib/requirejs/hbs!module-tt-article/view/tmpl/articles',
  'lib/requirejs/hbs!module-tt-article/view/tmpl/article'
],
function (App, Doc, $, ArticlesTmpl, ArticleTmpl) {
  function IndexController() {
    /**
     * App's DOM Container Element. 
     * @type {Object}
     */
    var appContainerEl = Doc.getElementById('tt-articles-content');
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
      ];
      //appContainerEl.innerHTML = templates.join('\n');
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