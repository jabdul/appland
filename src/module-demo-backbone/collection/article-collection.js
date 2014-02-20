define([
  '../app',
  '../model/article-model'
],
function(App, ArticleModel){
  /**
   * App's main configuration.
   * @type {*}
   */
  var CONF = App.getModuleConfig('module-demo-backbone');
  /**
   * Backbone
   * @type {Backbone}
   */
  var Backbone = App.getModuleConfig('module-demo-backbone').Backbone;
  /**
   * Article collection
   * @type {Backbone.Collection}
   */
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