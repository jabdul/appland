define([
  'angular',
  '../index-controller',
  './articles-controller'
],
  function (ng, indexController, articlesController) {
    var controllers = ng.module('controllers', []);
    controllers.controller('indexController', indexController);
    controllers.controller('articlesController', articlesController);

    return controllers;
});
