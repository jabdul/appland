define(function() {
  var articlesController = function($scope, $http, articles) {
    $scope.myModel = 'Hello World';
  };

  articlesController.inject = ['$scope', '$http', 'articles'];

  return articlesController;
});