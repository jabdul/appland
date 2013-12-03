define([
  'module-tt-article/app',
  'lib/requirejs/hbs!module-tt-article/view/tmpl/article',
  'lib/requirejs/hbs!module-tt-article/view/tmpl/article'
],
  function (App, ArticleTmpl, TagTmpl) {
    /**
     * Article.
     * @constructor
     * @returns {undefined}
     */
    function Article (o) {
      if (! o) {
        throw new Error ("Object literal is expected.");
      }
      /**
       * Item ID.
       * @type {number}
       * @private
       */
      this.id = o.id || 0;
      /**
       * Active status.
       * @type {boolean}
       * @private
       */
      this.isActive = !!(o.isActive);
      /**
       * Image url.
       * @type {string}
       * @private
       */
      this.image = o.image || '';
      /**
       * Title.
       * @type {string}
       * @private
       */
      this.title = o.title || '';
      /**
       * Description.
       * @type {string}
       * @private
       */
      this.description = o.description || '';
      /**
       * Tags.
       * @type {array}
       * @private
       */
      this.tags = o.tags || [];
      /**
       * Less Tags.
       * @type {array}
       * @private
       */
      this.lessTags = [];
      /**
       * More Tags.
       * @type {array}
       * @private
       */
      this.moreTags = [];
      /**
       * Maximum default tag to show.
       * @type {number}
       * @private
       */
      this.maxDefaultTags = 0;
    }

    Article.prototype = {
      constructor: Article,
      /**
       * Returns item's status.
       * @returns {boolean}
       */
      isItemActive: function () {
        return this.isActive;
      },
      /**
       * Prepares more or less tags.
       * @returns {undefined}
       */
      setTagsMaxToShow: function () {
        if ( ! this.isMoreTags() ) {
          this.lessTags = this.tags;
          return;
        }
        var i= 0, len= this.tags.length;
        for (; i < len; i++  ) {
          if (i > (this.maxDefaultTags-1)) {
            this.moreTags.push(this.tags[i]);
          } else if (i < this.maxDefaultTags) {
            this.lessTags.push(this.tags[i]);
          }
        }
      },
      /**
       * Are there more tags?.
       * @returns {boolean}
       */
      isMoreTags: function () {
        return !!(( App.getDataType(this.tags) == "[object Array]"
            && this.tags.length > this.maxDefaultTags));
      },
      /**
       * Sets maximum default tags to display.
       * @returns {number}
       */
      setMaxDefaultTags: function (max) {
        this.maxDefaultTags = max;
      },
      /**
       * Generate the HTML markup for this item.
       * @returns {string} The HTML markup.
       */
      generateHtml: function () {
        this.setTagsMaxToShow();

        return  ArticleTmpl({
          ID: this.id,
          IMAGE_URL: this.image,
          ARTICLE_TITLE: this.title,
          ARTICLE_DESCRIPTION: this.description,
          TAGS: this.tags,
          LESS_TAGS: this.lessTags,
          MORE_TAGS: this.moreTags,
          SHOW_MORE_TAGS: this.isMoreTags()
        });
      }
    };

    return Article;
  });