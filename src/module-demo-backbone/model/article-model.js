define([
  '../app'
],
function(App){
  /**
   * App's main configuration.
   * @type {*}
   */
  var CONF = App.getModuleConfig('module-demo-backbone');
  /**
   * Backbone
   * @type {Backbone}
   */
  var Backbone = App.getModuleConfig('module-demo-backbone').Backbone;
  /**
   * Article model
   * @type {Backbone.Model}
   */
  var ArticleModel = Backbone.Model.extend({
    defaults: {
      id: -1,
      isActive: false,
      title: '',
      teaser: '',
      description: '',
      content: '',
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
  });

  return ArticleModel;
});