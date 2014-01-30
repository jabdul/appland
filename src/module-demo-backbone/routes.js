define([
  'lib/requirejs/domReady!',
  'backbone',
  './model/article-model',
  './view/home-view',
  './view/articles-view',
  './view/article-view'
], 
function(Doc, Backbone, ArticleModel, HomeView, ArticlesView, ArticleView){
  var AppRouter = Backbone.Router.extend({
    routes: {
      '': 'index',
      'home': 'home',
      'articles': 'articles',
      'articles/:id': 'article'
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
    // Article
    router.on('route:article', function(id){
      var article = new ArticleView({
        model: new ArticleModel({id: id})
      });
    });
    // We have no matching route, so default to Homepage.
    router.on('route:index', function(actions){
      new HomeView();
    });

    Backbone.history.start();
    //Backbone.history.start({pushState: true});
  };
  
  return {
    initialize: initialize
  };
});