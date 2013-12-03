define([
  'module-tt-article/app',
  'lib/requirejs/domReady!',
  'jquery',
  'module-tt-article/factory/article-factory',
],
  function (App, Doc, $, ArticleFactory) {
    function IndexController() {
      /**
       * App's DOM Container Element.
       * @type {Object}
       */
      var appContainerEl = $('#tt-articles-content');
      /**
       * Module's configuration.
       * @type {Object}
       */
      var moduleConfig = App.getModuleConfig('module-tt-article');
      /**
       * Script initialiser.
       * Executes a set of actions at start.
       * @returns {undefined}
       */
      function init() {
        renderView(moduleConfig.labels[0]['LABEL_0']);
        delegateEvents();
      }
      /**
       * Renders the view templates.
       * @param {string} title
       * @returns {undefined}
       */
      function renderView(title) {
        $(appContainerEl).find('.tt-articles-title')
          .text(title);
      }
      /**
       * Event delegation.
       * @returns {undefined}
       */
      function delegateEvents() {
        $(Doc)
         .on("click.tt.articles",
           '#tt-articles-articles', function (e) {

              renderView(moduleConfig.labels[1]['LABEL_1']);
              var $articles = $(appContainerEl).find('.tt-articles-container');

              if ($articles.length) {
                $articles.show();
                return;
              }

              var Articles = new ArticleFactory([]);
              Articles.findArticles();
              e.preventDefault();
         })
         .on("click.tt.articles",
            '#tt-articles-home', function (e) {
              $(appContainerEl).find('.tt-articles-container').hide();
              renderView(moduleConfig.labels[0]['LABEL_0']);
              e.preventDefault();
         })
          .on("click.tt.articles",
          '#tt-articles-more', function (e) {
            $(appContainerEl).find('.tt-articles-container').hide();
            renderView(moduleConfig.labels[0]['LABEL_0']);
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