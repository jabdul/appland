define([
  'underscore',
  'backbone',
  '../model/article'
],
function(_, Backbone, ArticleModel){
  var ArticleCollection = Backbone.Collection.extend({
    model: ArticleModel
  });

  return ArticleCollection;
});