define([
  '../app',
  'jquery',
  'underscore',
  'backbone'
],
function(App, $, _, Backbone){
  var ArticleItemView = Backbone.View.extend({
    tagName: '',
    className: '',

    render: function(){
      return this.model.toJSON();
    }
  });

  return ArticleItemView;
});