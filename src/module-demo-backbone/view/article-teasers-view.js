define([
  '../app',
  'backbone',
  'hbs!module-demo-backbone/view/tmpl/partial/teaser'
],
function(App, Backbone, TeaserTmpl){
  var ArticleTeasersView = Backbone.View.extend({
    tagName: 'div',
    className: 'teaser',
    template: TeaserTmpl,

    render: function(){
      this.$el.html( this.template( this.model.toJSON() ));

      return this;
    },

    toJson: function(){
      return this.model.toJSON();
    }
  });

  return ArticleTeasersView;
});