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
   * Backbone
   * @type {Backbone}
   */
  var Backbone = App.getModuleConfig('module-demo-backbone').Backbone;
  /**
   * ViewManager page
   * @type {Backbone.View}
   */
  var ViewManager = Backbone.View.extend({
    el:  "#demo-bb-content",

    initialize: function() {
      this.currentView = null;
      // Display static content.
      /*this.$el.html(HomeTmpl({
        labels: App.getModuleConfig('module-demo-backbone').labels
      }));*/
    },

    render: function(){
      return this;
    },
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
  });

  return ViewManager;
});