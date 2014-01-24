define([
  'underscore',
  'backbone'
], function(_, Backbone){
  var ArticleModel = Backbone.Model.extend({
    defaults: {
      name: "Harry Potter"
    }
  });

  return ArticleModel;
});