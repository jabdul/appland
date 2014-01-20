define([
  'module-demo-web-app/app',
  'jquery',
  'module-demo-web-app/model/article'
],
function (App, $, Article) {

  var Articles;

  Articles = App.Collection.extend({
    /* Default properties */
    config: App.getModuleConfig('module-demo-web-app'),
    model: Article
  },
  { /* Prototype properties and methods */
    fetch: function () {
      var request = App.getModuleConfig('module-demo-web-app')
          .services
          .findArticles,
        self = this;
      /** Production (backend) setup **/
      // path: request.path + request.resource
      // isLocal: request.isLocal
      // type: request.httpRequestMethod

      /** Development (mock) setup **/
      // path: '/module-demo-web-app/data/mock-articles.json'
      // isLocal: true
      // type: 'GET'
      App.connect('json', {
        path: '/module-demo-web-app/data/mock-articles.json',
        isLocal: true,
        type: request.httpRequestMethod,
        done: function (data, textStatus) {
          // In case of null response...
          if ( data.articles === null ) {
            console.log('No info available');
          } else {
            self.setItems(data.articles);
          }
        },
        fail: function (jqXHR, textStatus, errorThrown) {
          throw new Error("Service ERROR: Could not fetch articles.");
        }
      });
    }
  });

  //console.log(Articles);

  return Articles;
});