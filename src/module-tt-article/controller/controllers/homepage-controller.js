define(function() {
  var homepageController = function($scope, $http, articles) {
    $scope.myModel = 'Hello World';
  };

  homepageController.inject = ['$scope', '$http', 'articles'];

  return homepageController;
});