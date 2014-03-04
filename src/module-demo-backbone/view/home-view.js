define([
  '../app',
  '../collection/article-collection',
  './article-teasers-view',
  'hbs!module-demo-backbone/view/tmpl/home',
  'hbs!module-demo-backbone/view/tmpl/partial/teasers'
],
function(App, ArticleCollection, ArticleTeasersView, HomeTmpl, TeasersTmpl){
  /**
   * Backbone
   * @type {Backbone}
   */
  var Backbone = App.getModuleConfig('module-demo-backbone').Backbone;
  /**
   * Module's Event Manager
   * @type {Backbone}
   */
  var Events = App.getModuleConfig('module-demo-backbone').Events;
  /**
   * HomeView page
   * @type {Backbone.View}
   */
  var HomeView = Backbone.View.extend({
    el:  ".main-content",

    initialize: function() {
      this.collection = new ArticleCollection();
      this.collection.fetch({
        reset: true,
        data: {
          page: 1,
          limit: 2
        },
        processData: true
      });
      // Display static content.
      /*this.$el.html(HomeTmpl({
        labels: App.getModuleConfig('module-demo-backbone').labels
      }));*/
      // Subscribe to the 'sync' event on server response and
      // trigger content:ready event for fetched articles from REST service.
      this.listenTo( this.collection, 'reset', function() {
        Events.trigger('content:ready');
      });
    },

    render: function(){
      var articles = [],
          cols;

      this.changeStartLink(this.collection.first().attributes.id);

      this.collection.each(function(item) {
        articles.push(this.generateTeaser(item));
      }, this );

      cols = this.splitItems(articles, 2);

      this.$el.html(
        TeasersTmpl({articles: cols[0]}) +
          TeasersTmpl({articles: cols[1]})
      );

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
          _href = el.attr('href');
      el.attr('href', _href + '/' + id);
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