define([
  '../app',
  'backbone',
  '../collection/article-collection',
  './article-summaries-view',
  'hbs!module-demo-backbone/view/tmpl/articles',
  'hbs!module-demo-backbone/view/tmpl/partial/summaries'
],
  function(App, Backbone, ArticleCollection,
           ArticleSummariesView, ArticlesTmpl, SummariesTmpl){
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
      },

      generateSummary: function( item ) {
        var summariesView = new ArticleSummariesView({
          model: item
        });

        return summariesView.toJson();
      },

      display: function(items) {
        var cols = this.splitItems(items, 2);

        this.$el.find('.marketing').append(
          SummariesTmpl({articles: cols[0]}) +
            SummariesTmpl({articles: cols[1]})
        );
      },

      splitItems: function(items, n) {
        var out = [],
          len = items.length,
          i = 0,
          size = 0;

        if (! len) return out;

        while (i < len) {
          size = Math.ceil((len - i) / n--);
          out.push(items.slice(i, i += size));
        }

        return out;
      }
    });

    return ArticlesView;
  });