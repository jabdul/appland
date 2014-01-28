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
      this.render();
    },

    render: function(){
      var articles = [];
      this.collection.each(function(item) {
        articles.push(this.renderArticleTeaser(item));
      }, this );
      console.log(articles);
      this.$el.html(HomeTmpl({
        labels: App.getModuleConfig('module-demo-backbone').labels,
        articles: articles
      }));

      return this;
    },

    renderArticleTeaser: function( item ) {
      var articleItemView = new ArticleItemView({
        model: item
      });

      return articleItemView.render().el;
    }
  });
  // Returning instantiated views can be quite useful for having "state"
  return HomeView;
});