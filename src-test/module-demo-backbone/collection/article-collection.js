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
   * Articles' collection test suite.
   */
  describe('ModuleDemoBackbone: article collection', function () {

    it("has capability to add one or more article.", function () {
      var articleCollection = new ArticleCollection();

      // Collection should be empty
      expect(articleCollection.length).toBe(0);

      // Add an article
      articleCollection.add(that.mockArticlesJson.articles[9]);

      // Added one item
      expect(articleCollection.length).toBe(1);

      // Add three more articles
      articleCollection.add(that.mockArticlesJson.articles[13]);
      articleCollection.add(that.mockArticlesJson.articles[2]);
      articleCollection.add(that.mockArticlesJson.articles[8]);

      // Should now be four in total
      expect(articleCollection.length).toBe(4);
    });

    it('has a defined url property for all contained models.', function() {
      var articleCollection = new ArticleCollection();
      expect(articleCollection.url).toBe(
        that.CONF.services.findArticles.path +
        that.CONF.services.findArticles.resource
      );
    });

    it('checks for number of active articles.', function() {
      var articleCollection = new ArticleCollection();

      runs(function() {
        setTimeout(function() {
          articleCollection.fetch();
        },1000);
      });

      waitsFor(function() {
        return articleCollection.isActive().length;
      }, "The number of active items should be greater than zero", 1250);

      runs(function() {
        expect(articleCollection.isActive().length).toEqual(14);
        expect(articleCollection.isNotActive().length).toEqual(6);
      });
    });
  });
});