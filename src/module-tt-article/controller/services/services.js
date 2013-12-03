define([
  'angular',
  './articles'
],
  function (ng, articles) {
    var services = ng.module('services', []);
    services.service('articles', articles);

    return services;
  });