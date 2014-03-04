define([
  '../app',
  '../collection/article-collection',
  './article-summaries-view',
  'hbs!module-demo-backbone/view/tmpl/articles',
  'hbs!module-demo-backbone/view/tmpl/partial/error'
],
  function(App, ArticleCollection, ArticleSummariesView,
           ArticlesTmpl, ErrorTmpl){
    /**
     * Backbone
     * @type {Backbone}
     */
    var Backbone = App.getModuleConfig('module-demo-backbone').Backbone;
    /**
     * Module's Event Manager
     * @type {Backbone.Events}
     */
    var Events = App.getModuleConfig('module-demo-backbone').Events;
    /**
     * Module's Labels
     * @type {*}
     */
    var LABELS = App.getModuleConfig('module-demo-backbone').labels;
    /**
     * Module's Logger
     * @type {*}
     */
    var LOG = App.getModuleConfig('module-demo-backbone').Log;
    /**
     * Article's listing
     * @type {Backbone.View}
     */
    var ArticlesView = Backbone.View.extend({
        tagName: 'div',

      initialize: function() {
        this.collection = new ArticleCollection();
        this.collection.fetch({
          reset: true,
          error: function() {
            LOG.error(arguments, arguments.callee);
            Events.trigger('content:error');
          }
        });

        this.listenTo( this.collection, 'reset', function() {
          Events.trigger('content:ready');
        });
      },

      render: function(){
        var articles = [];
        this.collection.each(function(item) {
          articles.push(this.generateSummary(item));
        }, this );

        this.$el.addClass('main-content').html(ArticlesTmpl({
          labels: LABELS[0],
          articles: articles
        }));

        return this;
      },

      renderError: function() {
        this.$el.addClass('main-content')
          .html(ErrorTmpl({
            LABELS: LABELS[0],
            ERROR_MSG: LABELS[0].LABEL_22
          }));

        return this;
      },

      generateSummary: function( item ) {
        var summariesView = new ArticleSummariesView({
          model: item
        });

        return summariesView.toJson();
      }
    });

    return ArticlesView;
  });