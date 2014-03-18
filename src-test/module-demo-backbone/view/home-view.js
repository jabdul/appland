define([
  'module-demo-backbone/app',
  'lib/requirejs/text!module-demo-backbone/data/mock-articles.json',
  'module-demo-backbone/collection/article-collection'
],
function (App, MockArticlesJson, ArticleCollection) {

  var that = this;

  that.mockArticlesJson = $.parseJSON(MockArticlesJson);
  that.CONF = App.getModuleConfig('module-demo-backbone');

  /**
   * Homepage view test suite.
   */
  describe('ModuleDemoBackbone: homepage view', function () {

    it("has page links.", function () {
      expect('').toBeFalsy();
    });
  });
});