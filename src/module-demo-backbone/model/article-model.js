define([
  'underscore',
  'backbone'
], function(_, Backbone){
  var ArticleModel = Backbone.Model.extend({
    defaults: {
      id: -1,
      isActive: false,
      title: '',
      teaser: '',
      description: '',
      tags: [],
      image: ''
    },

    urlRoot: '/api/demo/articles'/*,

    parse: function(response){
      console.log(response);
      return response.articles;
    }*/
  });

  return ArticleModel;
});