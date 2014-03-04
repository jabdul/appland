define([
  '../app',
  'lib/requirejs/domReady!',
  'hbs!module-demo-backbone/view/tmpl/header-footer',
  '../model/article-model',
  './home-view',
  './articles-view',
  './article-view',
  'jquery'
],
function (App, Doc, HeaderFooterTmpl, ArticleModel,
          HomeView, ArticlesView, ArticleView, $) {
  /**
   * Backbone
   * @type {Backbone}
   */
  var Backbone = App.getModuleConfig('module-demo-backbone').Backbone;
  /**
   * Module's Event Manager
   * @type {Backbone}
   */
  var Events = App.getModuleConfig('module-demo-backbone').Events;
  /**
   * ViewManager page
   * @type {Backbone.View}
   */
  var ViewManager = Backbone.View.extend({
    el:  "#demo-bb-content",

    initialize: function() {
      this.currentView = null;
      // Display static content.
      this.$el.html(HeaderFooterTmpl({
        labels: App.getModuleConfig('module-demo-backbone').labels
      }));
    },

    render: function(){
      //this.el.find('.header').append( this.currentView.render().el );
      $( this.currentView.render().$el ).insertAfter( this.$el.find('.header') );
      console.log(this.currentView.render().$el);
      return this;
    },
    /**
     * Renders the view templates.
     * @param {string} view to render
     * @param {*=} options
     */
    setCurrentView: function (view, options) {
      var self = this;

      if (this.currentView){
        this.currentView.close();
      }

      this[view + 'View'](options);

      /*this.listenTo(this.currentView, 'content:ready', function(){
        this.render();
      });*/

      Events.on('content:ready', function(){
        this.render();
      }, this);
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