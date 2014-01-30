define([
  'underscore',
  'backbone',
  '../model/article-model'
],
function(_, Backbone, ArticleModel){
  var ArticleCollection = Backbone.Collection.extend({
    model: ArticleModel,
    url: '/api/demo/articles',

    // Parses the 'articles' array of objects in json response.
    parse: function(response){
      return response.articles;
    }
  });

  return ArticleCollection;
});