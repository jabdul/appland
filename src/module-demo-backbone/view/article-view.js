define([
  '../app',
  'backbone',
  'hbs!module-demo-backbone/view/tmpl/article',
  'hbs!module-demo-backbone/view/tmpl/partial/article'
],
  function(App, Backbone, ArticlePageTmpl, ArticleTmpl){
    var ArticleView = Backbone.View.extend({
      el:  "#demo-bb-content",

      initialize: function() {
        // Display static content.
        this.$el.html(ArticlePageTmpl({
          labels: App.getModuleConfig('module-demo-backbone').labels
        }));
        this.model.fetch({
          reset: true
        });
        this.listenTo( this.model, 'reset', this.render );
      },

      render: function(){
        this.$el.find('.marketing').append(
          ArticleTmpl(this.model.toJSON())
        );
      }
    });

    return ArticleView;
  });