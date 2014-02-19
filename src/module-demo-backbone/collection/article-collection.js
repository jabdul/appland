define([
  '../app',
  'backbone',
  '../model/article-model'
],
function(App, Backbone, ArticleModel){
  /**
   * App's main configuration.
   * @type {*}
   */
  var CONF = App.getModuleConfig('module-demo-backbone');

  var ArticleCollection = Backbone.Collection.extend({
    model: ArticleModel,
    url: CONF.services.findArticles.path +
          CONF.services.findArticles.resource,

    // Parses the 'articles' array of objects in json response.
    parse: function(response){
      return response.articles;
    },

    isActive: function() {
      return this.filter(function(articleModel) {
        return articleModel.get('isActive');
      });
    },

    isNotActive: function() {
      return this.without.apply(this, this.isActive());
    }
  });

  return ArticleCollection;
});