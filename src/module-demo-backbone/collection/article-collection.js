define([
  'underscore',
  'backbone',
  '../model/article-model'
],
function(_, Backbone, ArticleModel){
  var ArticleCollection = Backbone.Collection.extend({
    model: ArticleModel,
    url: '/api/articles'
  });

  return ArticleCollection;
});