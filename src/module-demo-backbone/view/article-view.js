define([
  '../app',
  'jquery',
  'hbs!module-demo-backbone/view/tmpl/article',
  'hbs!module-demo-backbone/view/tmpl/partial/article',
  'hbs!module-demo-backbone/view/tmpl/partial/error'
],
  function(App, $, ArticlePageTmpl, ArticleTmpl, ErrorTmpl){
    /**
     * Backbone
     * @type {Backbone}
     */
    var Backbone = App.getModuleConfig('module-demo-backbone').Backbone;
    /**
     * Module's Event Manager
     * @type {Backbone.Events}
     */
    var Events = App.getModuleConfig('module-demo-backbone').Events;
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
    /**
     * Article page
     * @type {Backbone.View}
     */
    var ArticleView = Backbone.View.extend({
      tagName: 'div',

      initialize: function() {
        this.model.fetch({
          change: true,
          error: function() {
            LOG.error(arguments, arguments.callee);
            Events.trigger('content:error');
          }
        });

        this.listenTo( this.model, 'change', function() {
          Events.trigger('content:ready');
        });
      },

      render: function(){
        var data = this.model.toJSON();
        data.LABELS = LABELS[0];
        // Decode html entities
        data.content = $('<textarea/>').html(data.content).text();

        this.$el.addClass('main-content').html(ArticleTmpl(data));

        return this;
      },

      renderError: function() {
        this.$el.addClass('main-content')
          .html(ErrorTmpl({
            LABELS: LABELS[0],
            ERROR_MSG: LABELS[0].LABEL_20
          }));

        return this;
      }
    });

    return ArticleView;
  });