define([
  '../app',
  'jquery',
  'underscore',
  'backbone',
  '../collection/article-collection',
  './article-item-view',
  'hbs!module-demo-backbone/view/tmpl/home'
],
function(App, $, _, Backbone, ArticleCollection, ArticleItemView, HomeTmpl){
  var HomeView = Backbone.View.extend({
    el: $("#demo-bb-content"),

    initialize: function() {
      this.collection = new ArticleCollection();
      this.collection.fetch({
        reset: true,
        data: 'articles'
      });
      // Display static content.
      this.$el.html(HomeTmpl({
        labels: App.getModuleConfig('module-demo-backbone').labels
      }));
      // Render fetched articles from REST service
      this.render();
      // Apply the listener for REST server response
      this.listenTo( this.collection, 'reset', this.render );
    },

    render: function(){
      this.collection.each(function(item) {
        this.renderArticleTeaser(item);
      }, this );
      //return this;
    },

    renderArticleTeaser: function( item ) {
      var articleItemView = new ArticleItemView({
        model: item
      });

      this.$el.find('.marketing').append(articleItemView.render().el);
    }
  });
  // Returning instantiated views can be quite useful for having "state"
  return HomeView;
});