define(function (require) {
  'use strict';

  var angular = require('angular');
  var services = require('./services/services');
  var controllers = require('./controllers/controllers');
  var directives = require('./directives/directives');

  var app = angular.module('articles', ['services', 'controllers', 'directives', 'ngRoute']);

  app.init = function () {
    angular.bootstrap(document, ['articles']);
  };

  app.config(['$routeProvider', '$locationProvider', '$httpProvider',
    function ($routeProvider, $locationProvider, $httpProvider) {
      //$httpProvider.responseInterceptors.push('httpInterceptor');

      $routeProvider
        .when('/', { templateUrl: '../view/tmpl/article.tmpl', controller: 'homepageController' })
        .when('/articles', { templateUrl: '../view/tmpl/article.tmpl', controller: 'articlesController' })
        .otherwise({ redirectTo: '/' });

      $locationProvider.html5Mode(true);
    }
  ]);

  app.run(function ($window/*, auth, user*/) {
    /*auth.setAuthorizationHeaders();
    user.initialize();*/
  });

  return app;
});


/*define([
  'angular',
  'angular-route',
  'controllers/index',
  'directives/index',
  'filters/index',
  'services/index'
], function (ng) {
  'use strict';

  return ng.module('app', [
    'app.controllers',
    'app.directives',
    'app.filters',
    'app.services',
    'ngRoute'
  ]);
}); */

