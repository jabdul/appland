define([
  'jquery',
  'underscore',
  'backbone',
  './view/home-view',
  './view/articles-view'
], 
function($, _, Backbone, HomeView, ArticlesView){
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
      var homeView = new HomeView();
      homeView.render();
    });
    // Articles listing
    router.on('route:articles', function(){
      var articlesView = new ArticlesView();
      articlesView.render();
    });
    // We have no matching route, so default to Homepage.
    router.on('route:defaultAction', function(actions){
      var homeView = new HomeView();
      homeView.render();
    });

    Backbone.history.start();
  };
  
  return {
    initialize: initialize
  };
});