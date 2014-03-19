define([
  '../app',
  '../collection/article-collection',
  './article-teasers-view',
  'hbs!module-demo-backbone/view/tmpl/home',
  'hbs!module-demo-backbone/view/tmpl/partial/error'
],
function(App, ArticleCollection, ArticleTeasersView, HomeTmpl, ErrorTmpl){
  /**
   * Backbone
   * @type {Backbone}
   */
  var Backbone = App.getModuleConfig('module-demo-backbone').Backbone;
  /**
   * Module's Event Manager
   * @type {Backbone.Events}
   */
  var Events = App.getModuleConfig('module-demo-backbone').Events;
  /**
   * Module's Labels
   * @type {*}
   */
  var LABELS = App.getModuleConfig('module-demo-backbone').labels;
  /**
   * Module's Logger
   * @type {*}
   */
  var LOG = App.getModuleConfig('module-demo-backbone').Log;
  /**
   * HomeView page
   * @type {Backbone.View}
   */
  var HomeView = Backbone.View.extend({
    tagName: 'div',

    initialize: function() {
      this.collection = new ArticleCollection();
      this.collection.fetch({
        reset: true,
        data: {
          page: 1,
          limit: 2
        },
        processData: true,
        error: function() {
          LOG.error(arguments, arguments.callee);
          Events.trigger('content:error');
        }
      });
      // Subscribe to the 'sync' event on server response and
      // trigger content:ready event for fetched articles from REST service.
      this.listenTo( this.collection, 'reset', function() {
        Events.trigger('content:ready');
      });
    },

    render: function(){
      var articles = [],
          cols;

      this.collection.each(function(item) {
        articles.push(this.generateTeaser(item));
      }, this );

      cols = this.splitItems(articles, 2);

      this.$el.addClass('main-content').html(HomeTmpl({
        labels: LABELS[0],
        articlesColumnOne: cols[0],
        articlesColumnTwo: cols[1]
      }));

      this.changeStartLink(this.collection.first().attributes.id);

      return this;
    },

    renderError: function() {
      this.$el.addClass('main-content')
        .html(ErrorTmpl({
          LABELS: LABELS[0],
          ERROR_MSG: LABELS[0].LABEL_22
        }));

      return this;
    },

    generateTeaser: function( item ) {
      var articleTeasersView = new ArticleTeasersView({
        model: item
      });

      return articleTeasersView.toJson();
    },

    changeStartLink: function(id) {
      var el = this.$el.find('#js-cta'),
          articlePath = el.attr('href'),
          _href = location.href.split('#')[0];

      el.attr('href', _href + articlePath + '/' + id);
    },

    splitItems: function(items, n) {
      var out = [],
          len = items.length,
          i = 0,
          size = 0;

      if (! len) return out;

      while (i < len) {
        size = Math.ceil((len - i) / n--);
        out.push(items.slice(i, i += size));
      }

      return out;
    }
  });

  return HomeView;
});