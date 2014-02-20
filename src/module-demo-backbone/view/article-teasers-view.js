define([
  '../app',
  'hbs!module-demo-backbone/view/tmpl/partial/teaser'
],
function(App, TeaserTmpl){
  /**
   * Backbone
   * @type {Backbone}
   */
  var Backbone = App.getModuleConfig('module-demo-backbone').Backbone;
  /**
   * Article's teasers
   * @type {Backbone.View}
   */
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