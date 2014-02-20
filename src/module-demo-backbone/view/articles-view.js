define([
  '../app',
  '../collection/article-collection',
  './article-summaries-view',
  'hbs!module-demo-backbone/view/tmpl/articles',
  'hbs!module-demo-backbone/view/tmpl/partial/summaries'
],
  function(App, ArticleCollection, ArticleSummariesView,
           ArticlesTmpl, SummariesTmpl){
    /**
     * Backbone
     * @type {Backbone}
     */
    var Backbone = App.getModuleConfig('module-demo-backbone').Backbone;
    /**
     * Article's listing
     * @type {Backbone.View}
     */
    var ArticlesView = Backbone.View.extend({
      el:  "#demo-bb-content",

      initialize: function() {
        this.collection = new ArticleCollection();
        this.collection.fetch({
          reset: true
        });
        // Display static content.
        this.$el.html(ArticlesTmpl({
          labels: App.getModuleConfig('module-demo-backbone').labels
        }));
        // Subscribe to the 'sync' event on server response and
        // render fetched articles from REST service.
        this.listenTo( this.collection, 'reset', this.render );
      },

      render: function(){
        var articles = [];
        this.collection.each(function(item) {
          articles.push(this.generateSummary(item));
        }, this );

        this.display(articles);

        return this;
      },

      generateSummary: function( item ) {
        var summariesView = new ArticleSummariesView({
          model: item
        });

        return summariesView.toJson();
      },

      display: function(items) {
        this.$el.find('.marketing').append(
          SummariesTmpl({articles: items})
        );
      }
    });

    return ArticlesView;
  });