define([
  '../app',
  'jquery',
  'underscore',
  'backbone',
  'hbs!module-demo-backbone/view/tmpl/partial/teaser'
],
function(App, $, _, Backbone, TeaserTmpl){
  var ArticleItemView = Backbone.View.extend({
    tagName: 'div',
    className: 'teaser',
    template: TeaserTmpl,

    render: function(){
      console.log(this.model);
      this.$el.html( this.template( this.model.toJSON() ));

      return this;
    }
  });

  return ArticleItemView;
});