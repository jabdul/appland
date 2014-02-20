define([
  './app',
  'lib/requirejs/domReady!',
  './view/view-manager'
], 
function(App, Doc, ViewManager){
  /**
   * Module's Logger
   * @type {*}
   */
  var LOG = App.getModuleConfig('module-demo-backbone').Log;
  /**
   * Backbone
   * @type {Backbone}
   */
  var Backbone = App.getModuleConfig('module-demo-backbone').Backbone;
  /**
   * Application Routing
   * @type {Backbone.Router}
   */
  var AppRouter = Backbone.Router.extend({
    routes: {
      '': 'index',
      'home': 'home',
      'articles': 'articles',
      'articles/:id': 'article'
    },

    initialize: function(options){
      this.viewManager = new ViewManager();
    }
  });

  var initialize = function() {
    var router = new AppRouter();
    // Homepage
    router.on('route:home', function(){
      // Simply instantiate the HomeView object.
      // The constructor will handle the next steps.
      try {
        this.viewManager.setCurrentView( 'home' );
      } catch(e) {
        LOG.error(arguments, arguments.callee);
      }
    });
    // Articles listing
    router.on('route:articles', function(){
      try {
        this.viewManager.setCurrentView( 'articles' );
      } catch(e) {
        LOG.error(arguments, arguments.callee);
      }
    });
    // Article
    router.on('route:article', function(id){
      try {
        this.viewManager.setCurrentView( 'article', {id: id} );
      } catch(e) {
        LOG.error(arguments, arguments.callee);
      }
    });
    // We have no matching route, so default to Homepage.
    router.on('route:index', function(actions){
      try {
        this.viewManager.setCurrentView( 'home' );
      } catch(e) {
        LOG.error(arguments, arguments.callee);
      }
    });

    Backbone.history.start();
    //Backbone.history.start({pushState: true});
  };
  
  return {
    initialize: initialize
  };
});