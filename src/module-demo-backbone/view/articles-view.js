define([
  '../app',
  'jquery',
  'underscore',
  'backbone',
  '../collection/article-collection',
  'hbs!module-demo-backbone/view/tmpl/articles'
],
function(App, $, _, Backbone, ArticleCollection, ArticlesTmpl){
  var ArticlesView = Backbone.View.extend({
    el: $("#demo-bb-content"),

    render: function(){
      this.collection = new ArticleCollection();
      this.collection.add({ name: "Ginger Kid"});
      //var compiledTemplate = _.template( projectsListTemplate, { projects: this.collection.models } );
      this.$el.html(ArticlesTmpl({
        labels: App.getModuleConfig('module-demo-backbone').labels
      }));

      return this;
    }
  });
  // Returning instantiated views can be quite useful for having "state"
  return ArticlesView;
});