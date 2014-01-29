define([
  'backbone',
  './view/home-view',
  './view/articles-view'
], 
function(Backbone, HomeView, ArticlesView){
  var AppRouter = Backbone.Router.extend({
    routes: {
      'home': 'home',
      'articles': 'articles',
      '*actions': 'defaultAction'
    }
  });

  var initialize = function() {
    var router = new AppRouter();
    // Homepage
    router.on('route:home', function(){
      // Simply instantiate the HomeView object.
      // The constructor will handle the next steps.
      new HomeView();
    });
    // Articles listing
    router.on('route:articles', function(){
      new ArticlesView();
    });
    // We have no matching route, so default to Homepage.
    router.on('route:defaultAction', function(actions){
      new HomeView();
    });

    Backbone.history.start();
  };
  
  return {
    initialize: initialize
  };
});