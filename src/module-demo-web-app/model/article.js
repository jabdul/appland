define([
  'module-demo-web-app/app',
  'hbs!module-demo-web-app/view/tmpl/article'
],
function (App, ArticleTmpl) {

  var Article;

  Article = App.Model.extend({
    /* Default properties */
    isActive: false,
    image: '',
    title: '',
    teaser: '',
    description: '',
    tags: [],
    lessTags: [],
    moreTags: []
  },
  { /* Prototype properties and methods */
    maxDefaultTags: 0,

    isItemActive: function () {
      return this.isActive;
    },

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

    isMoreTags: function () {
      return !!(( App.getDataType(this.tags) == "[object Array]" &&
        this.tags.length > this.maxDefaultTags));
    },

    setMaxDefaultTags: function (max) {
      this.maxDefaultTags = max;
    }
  });

  //console.log(Article);

  return Article;
});