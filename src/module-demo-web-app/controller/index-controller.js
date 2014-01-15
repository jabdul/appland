define([
  'module-demo-web-app/app',
  'lib/requirejs/domReady!',
  'jquery',
  'module-demo-web-app/collection/article',
  'hbs!module-demo-web-app/view/tmpl/welcome'
],
function (App, Doc, $, ArticleCollection, welcomeTmpl) {
  function IndexController() {
    /**
     * App's DOM Container Element. 
     * @type {Object}
     */
    var appContainerEl = Doc.getElementById('demo-web-app-content');
    /**
     * Module's configuration.
     * @type {Object}
     */
    var moduleConfig = App.getModuleConfig('module-demo-web-app');
    /**
     * Script initialiser.
     * Module's single point entry.
     */
    function init() {
      render(setRoutes);
      delegateEvents();
    }
    /**
     * Renders the view templates.
     * @param {function} callBack to execute.
     */
    function render(callBack) {
      var templates = [welcomeTmpl(null)];
      appContainerEl.innerHTML = templates.join('\n');

      if (App.getDataType(callBack) == '[object Function]') {
        callBack();
      }
    }
    /**
     * Set App Routes
     */
    function setRoutes() {
      // String pattern or Regular Expression that
      // should be used to match against requests.
      App.Route.addRoute('{/}', function(section){
        // For each route that matches, execute as follows:
        //console.log(section);
      });
      // Updates location.hash of the current page.
      App.Hash.setHash('home');
    }
    /**
     * Event delegation.
     */
    function delegateEvents() {
      $(Doc)
        .on("click.tt.articles",
        '#tt-articles-articles', function (e) {

          render(moduleConfig.labels[1].LABEL_1);
          var $articles = $(appContainerEl).find('.tt-articles-container');

          if ($articles.length) {
            $articles.show();
            return;
          }

          var Articles = new ArticleCollection([]);
          Articles.findArticles();
          e.preventDefault();
        })
        .on("click.tt.articles",
        '#tt-articles-home', function (e) {
          $(appContainerEl).find('.tt-articles-container').hide();
          render(moduleConfig.labels[0].LABEL_0);
          e.preventDefault();
        })
        .on("click.tt.articles",
        '#tt-articles-more', function (e) {
          var $tags = $(this).parent()
              .find('.tt-articles-tags')
              .children('li.tt-articles-tag-more'),
            $toggle = $(this).parent().find('#tt-articles-more');

          if ($toggle.text() == 'show more') {
            $toggle.text('show less');
          } else {
            $toggle.text('show more');
          }

          $tags.each(function( i, el) {
            $(el).toggleClass('tt-articles-tag-show');
          });
          e.preventDefault();
        });
    }

    var publicMethods = {
      init: init
    };

    return publicMethods;
  }
  return IndexController();
});