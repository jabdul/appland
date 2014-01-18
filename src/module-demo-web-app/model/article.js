define([
  'module-demo-web-app/app',
  'hbs!module-demo-web-app/view/tmpl/article'
],
function (App, ArticleTmpl) {

  var Article;

  Article = App.Model.extend({
    isActive: false,
    image: '',
    title: '',
    description: '',
    tags: [],

  },
  {
    setMaxDefaultTags: function(max) {

    }
  });

  console.log(Article);

  return Article;
});