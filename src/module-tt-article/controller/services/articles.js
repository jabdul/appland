define("Article", ["$rootScope"], function($rootScope) {
  var services = {
    articles: [
      { title: "Magician", author: "Raymond E. Feist" },
      { title: "The Hobbit", author: "J.R.R Tolkien" }
    ],

    addArticle: function ( article ) {
      services.articles.push( article );
      $rootScope.$broadcast( 'articles.update' );
    }
  }

  return services;
});