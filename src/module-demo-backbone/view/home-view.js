define([
  '../app',
  'jquery',
  'underscore',
  'backbone',
  '../collection/article-collection',
  './article-item-view',
  'hbs!module-demo-backbone/view/tmpl/home',
  'hbs!module-demo-backbone/view/tmpl/partial/teasers'
],
function(App, $, _, Backbone, ArticleCollection,
         ArticleItemView, HomeTmpl, TeasersTmpl){
  var HomeView = Backbone.View.extend({
    el: $("#demo-bb-content"),

    initialize: function() {
      this.collection = new ArticleCollection();
      this.collection.fetch({
        reset: true
      });
      // Display static content.
      this.$el.html(HomeTmpl({
        labels: App.getModuleConfig('module-demo-backbone').labels
      }));
      // Subscribe to the 'sync' event on server response and
      // render fetched articles from REST service.
      this.listenTo( this.collection, 'reset', this.render );
    },

    render: function(){
      var articles = [];
      this.collection.each(function(item) {
        articles.push(this.generateTeaser(item));
      }, this );

      this.display(articles);
    },

    generateTeaser: function( item ) {
      var articleItemView = new ArticleItemView({
        model: item
      });

      return articleItemView.toJson();
    },

    display: function(items) {
      var cols = this.splitItems(items, 2);
      this.$el.find('.marketing').append(TeasersTmpl({articles: cols[0]}));
      this.$el.find('.marketing').append(TeasersTmpl({articles: cols[1]}));
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

  return HomeView;
});