define([
  'module-tt-article/app',
  'jquery',
  'module-tt-article/model/article',
  'lib/requirejs/hbs!module-tt-article/view/tmpl/articles-open',
  'lib/requirejs/hbs!module-tt-article/view/tmpl/articles-close'
],
  function (App, $, Article, ArticlesOpenTmpl, ArticlesCloseTmpl) {
    /**
     * Image Viewer mode factory.
     * The creator of mode instance items.
     * @param {Array.<object>} items Ordered list of WGSN images data.
     * @constructor
     * @returns {null}
     */
    function ArticleFactory (items) {
      /**
       * List of items.
       * @type {Array.<object>}
       * @private
       */
      this.items = items;
      /**
       * The number of items.
       * @type {number}
       * @private
       */
      this.itemsCount = items.length;
      /**
       * A collection of objects.
       * @type {Array.<object>}
       * @private
       */
      this.itemsList = [];
      /**
       * Template view.
       * @type {Array} The HTML markup containing mode items.
       * @private
       */
      this.view = [];
      /**
       * Module's configuration.
       * @type {Object}
       */
      this.moduleConfig = App.getModuleConfig('module-tt-article');
    }

    ArticleFactory.prototype = {
      constructor: ArticleFactory,
      /**
       * Generates HTML markup of Info Mode items.
       * @param {boolean} addContainer
       * @param {number} maxActive Items Number os items to display.
       * @returns {boolean} FALSE if no items were generated, TRUE otherwise.
       */
      generateHtml: function (addContainer, maxActiveItems) {
        var i = 0,
            item = null,
            activeItems = 0;

        this.itemsCount = this.items.length;

        if ( ! this.itemsCount ) {
          return false;
        }

        for (; i < this.itemsCount; i++)  {
          item = new Article(this.items[i]);
          if (item.isItemActive()) {
            activeItems++;
          }
          item.setMaxDefaultTags(this.moduleConfig.maxDefaultTags);
          if (activeItems <= maxActiveItems) {
            this.view[i] = item.generateHtml();
          }
          if (activeItems === maxActiveItems) {
            break;
          }
          this.itemsList[i] = item;
        }

        if (addContainer) {
          this.addTmplContainer();
        }
        return true;
      },
      /**
       * Generates HTML markup of Info Mode items.
       * @param {Object} item Item to generate.
       * @param {number} index Index of item.
       * return {string}
       */
      generateHtmlForItem: function (item, index) {
        var Item = new Article(item);
        Item.setMaxDefaultTags(this.moduleConfig.maxDefaultTags);
        this.itemsList[index] = Item;

        return Item.generateHtml();
      },
      /**
       * Wrap items with container elements.
       * @returns {undefined}
       */
      addTmplContainer: function () {
        this.view.unshift(ArticlesOpenTmpl(null));
        this.view.push(ArticlesCloseTmpl(null));
      },
      /**
       * Updates the items collection.
       * @param {Array.<object>} items Ordered list of WGSN images meta data.
       * @returns {undefined}
       */
      setItems: function (items) {
        this.items = items;
      },
      /**
       * Get items collection or a particular item.
       * @param {?number} index Get a particular item.
       * @returns {Array.<object> | object}
       */
      getItemsList: function (index) {
        if (typeof index === 'number') {
          return this.itemsList[index];
        }
        return this.itemsList;
      },
      /**
       * Content of view.
       * @param {boolean} stringfy
       * @returns {*}
       */
      getView: function (stringfy) {
        if (stringfy) {
          return this.view.join("\n");
        }
        return this.view;
      },
      /**
       * Fetch articles.
       * @returns {undefined}
       */
      findArticles: function () {
        var request = App.getModuleConfig('module-tt-article')
            .services
            .findArticles,
          self = this;
        /** Production setup **/
        // path: request.path + request.resource
        // isLocal: request.isLocal
        // type: request.httpRequestMethod

        /** Development setup **/
          // path: '/module-tt-article/data/mock-articles.json'
          // isLocal: true
          // type: 'GET'
        App.connect('json', {
          path: '/module-tt-article/data/mock-articles.json',
          isLocal: true,
          type: request.httpRequestMethod,
          cbSuccess: function (data, textStatus) {
            // In case of null response...
            if ( data.articles === null ) {
              console.log('No info available');
            } else {
              self.renderViewMarkup(data.articles);
            }
          },
          error: function (jqXHR, textStatus, errorThrown) {
            throw new Error("Service ERROR: Could not fetch articles.");
          }
        });
      },
      /**
       * Creates the HTML for the articles' metadata.
       * @param {Array.<object>} data The Articles' JSON response data.
       * @returns {undefined}
       */
      renderViewMarkup: function (data) {
        this.setItems(data);
        this.generateHtml(true, this.moduleConfig.activeArticles);
        $('#tt-articles-content').append( this.getView(true) );
      }
    };

    return ArticleFactory;
  });