define([
  '../app',
  'hbs!module-demo-backbone/view/tmpl/partial/summaries'
],
function(App, SummaryTmpl){
  /**
   * Backbone
   * @type {Backbone}
   */
  var Backbone = App.getModuleConfig('module-demo-backbone').Backbone;
  /**
   * Article's summary
   * @type {Backbone.View}
   */
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