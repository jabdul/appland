define([
  '../app',
  'backbone',
  'hbs!module-demo-backbone/view/tmpl/article',
  'hbs!module-demo-backbone/view/tmpl/partial/article',
  'hbs!module-demo-backbone/view/tmpl/partial/error'
],
  function(App, Backbone, ArticlePageTmpl, ArticleTmpl, ErrorTmpl){
    /**
     * Module's Labels
     * @type {*}
     */
    var LABELS = App.getModuleConfig('module-demo-backbone').labels;
    /**
     * Module's Logger
     * @type {*}
     */
    var LOG = App.getModuleConfig('module-demo-backbone').Log;

    var ArticleView = Backbone.View.extend({
      el:  "#demo-bb-content",

      initialize: function() {
        var self = this;
        // Display static content.
        this.$el.html(ArticlePageTmpl({
          labels: LABELS
        }));

        this.model.fetch({
          change: true,
          error: function() {
            LOG.error(arguments, arguments.callee);
            self.renderError();
            throw Error('Article not found.');
          }
        });

        this.listenTo( this.model, 'change', this.render );
      },

      render: function(){
        var data = this.model.toJSON();
        data.LABELS = LABELS[0];

        this.$el.find('.marketing').append(
          ArticleTmpl(data)
        );
      },

      renderError: function() {
        this.$el.find('.marketing').append(
          ErrorTmpl({LABELS: LABELS[0]})
        );
      }
    });

    return ArticleView;
  });