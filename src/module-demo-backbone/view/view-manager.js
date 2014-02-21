define([
  '../app',
  'lib/requirejs/domReady!',
  '../model/article-model',
  './home-view',
  './articles-view',
  './article-view'
],
  function (App, Doc, ArticleModel, HomeView, ArticlesView, ArticleView) {
    /**
     * Manage App's page views.
     * @constructor
     */
    function ViewManager() {
      /**
       * Module's configuration.
       * @type {*}
       */
      this.moduleConfig = App.getModuleConfig('module-demo-backbone');
      /**
       * The view currently displayed.
       * @type {Backbone.View}
       */
      this.currentView = null;
    }

    ViewManager.prototype = {
      constructor: ViewManager,
      /**
       * Renders the view templates.
       * @param {string} view to render
       * @param {*=} options
       */
      setCurrentView: function (view, options) {
        if (this.currentView){
          this.currentView.close();
        }
        this[view + 'View'](options);
      },
      /**
       * Home page.
       */
      homeView: function () {
        this.currentView =  new HomeView();
      },
      /**
       * Articles' listings page.
       */
      articlesView: function () {
        this.currentView =  new ArticlesView();
      },
      /**
       * Article page.
       */
      articleView: function (options) {
        this.currentView = new ArticleView({
          model: new ArticleModel({id: options.id})
        });
      }
    };

    return ViewManager;
  });
