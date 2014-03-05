define([
  '../app',
  'hbs!module-demo-backbone/view/tmpl/preloader',
],
  function(App, PreloaderTmpl){
    /**
     * Backbone
     * @type {Backbone}
     */
    var Backbone = App.getModuleConfig('module-demo-backbone').Backbone;
    /**
     * Module's configuration
     * @type {*}
     */
    var CONF = App.getModuleConfig('module-demo-backbone');
    /**
     * Article page
     * @type {Backbone.View}
     */
    var PreloaderView = Backbone.View.extend({
      tagName: 'div',

      initialize: function() {

      },

      render: function(){
        this.$el.addClass('main-content preloader').html(
          PreloaderTmpl({config: CONF})
        );

        return this;
      }
    });

    return PreloaderView;
  });