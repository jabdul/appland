define([
  'jquery',
  'underscore',
  'backbone',
  './view/home-view'/*,
  'views/users/list'*/
], 
function($, _, Backbone, HomeView/*, UserListView*/){
  var AppRouter = Backbone.Router.extend({
    routes: {
      // Define some URL routes
      'home': 'home',
      'articles': 'articles',

      // Default
      '*actions': 'defaultAction'
    }
  });

  var initialize = function() {
    var router = new AppRouter();

    router.on('route:home', function(){
      // Call render on the module we loaded in via the dependency array
      // 'views/projects/list'
      console.log('home');
      var homeView = new HomeView();
      homeView.render();
    });
    // As above, call render on our loaded module
    // 'views/users/list'
    /*router.on('articles', function(){
      var userListView = new UserListView();
      userListView.render();
    }); */
    router.on('route:defaultAction', function(actions){
      // We have no matching route, lets just log what the URL was
      console.log('No route:', actions);
    });
    Backbone.history.start();
  };
  
  return {
    initialize: initialize
  };
});