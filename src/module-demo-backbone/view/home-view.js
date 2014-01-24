define([
  '../app',
  'jquery',
  'underscore',
  'backbone',
  '../collection/article-collection',
  'hbs!module-demo-backbone/view/tmpl/home'
],
function(App, $, _, Backbone, ArticleCollection, HomeTmpl){
  var HomeView = Backbone.View.extend({
    el: $("#demo-bb-content"),
    render: function(){
      this.collection = new ArticleCollection();
      this.collection.add({ name: "Ginger Kid"});
      // Compile the template using Underscores micro-templating
      //var compiledTemplate = _.template( projectsListTemplate, { projects: this.collection.models } );
      this.$el.html(HomeTmpl({
        labels: App.getModuleConfig('module-demo-backbone').labels
      }));
    }
  });
  // Returning instantiated views can be quite useful for having "state"
  return HomeView;
});