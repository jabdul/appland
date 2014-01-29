define([
  '../app',
  'backbone',
  'hbs!module-demo-backbone/view/tmpl/partial/summaries'
],
function(App, Backbone, SummaryTmpl){
  var ArticleSummariesView = Backbone.View.extend({
    tagName: 'div',
    className: 'summary',
    template: SummaryTmpl,

    render: function(){
      this.$el.html( this.template( this.model.toJSON() ));

      return this;
    },

    toJson: function(){
      return this.model.toJSON();
    }
  });

  return ArticleSummariesView;
});