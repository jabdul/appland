define([
  '../app',
  'backbone'
],
function(App, Backbone){
  /**
   * App's main configuration.
   * @type {*}
   */
  var CONF = App.getModuleConfig('module-demo-backbone');

  var ArticleModel = Backbone.Model.extend({
    defaults: {
      id: -1,
      isActive: false,
      title: '',
      teaser: '',
      description: '',
      image: '',
      tags: [],
      meta: {
        nav: {
          next: {
            id: -1,
            title: ''
          },
          prev: {
            id: -1,
            title: ''
          }
        },
        related: null,
        links: null
      }
    },

    urlRoot: CONF.services.findArticles.path +
              CONF.services.findArticles.resource,

    validate: function(attr) {
      if (attr.hasOwnProperty('id') && !_.isFinite(attr.id)) {
        return 'Property id must be a finite number.';
      }
      if (attr.hasOwnProperty('isActive') && !_.isBoolean(attr.isActive)) {
        return 'Property isActive must be a boolean value.';
      }
    }

    /*
    parse: function(response){
      console.log(response);
      return response.articles;
    }*/
  });

  return ArticleModel;
});