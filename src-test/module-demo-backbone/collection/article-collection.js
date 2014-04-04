define([
  'module-demo-backbone/app',
  'lib/requirejs/text!module-demo-backbone/data/mock-articles.json',
  'module-demo-backbone/collection/article-collection'
],
function (App, MockArticlesJson, ArticleCollection) {

  var that = {};

  that.mockArticlesJson = $.parseJSON(MockArticlesJson);
  that.CONF = App.getModuleConfig('module-demo-backbone');

  beforeEach(function() {
    this.articleCollection = new ArticleCollection();
  });

  afterEach(function() {
    this.articleCollection = null;
  });

  /**
   * Articles' collection test suite.
   */
  describe('ModuleDemoBackbone: article-collection', function () {

    it("has capability to add one or more articles.", function () {
      // Collection should be empty
      expect(this.articleCollection.length).toBe(0);

      // Add an article
      this.articleCollection.add(that.mockArticlesJson.articles[9]);

      // Added one item
      expect(this.articleCollection.length).toBe(1);

      // Add three more articles
      this.articleCollection.add(that.mockArticlesJson.articles[13]);
      this.articleCollection.add(that.mockArticlesJson.articles[2]);
      this.articleCollection.add(that.mockArticlesJson.articles[8]);

      // Should now be four in total
      expect(this.articleCollection.length).toBe(4);
    });

    it('has a defined url property for all contained models.', function() {

      expect(this.articleCollection.url).toBe(
        that.CONF.services.findArticles.path +
        that.CONF.services.findArticles.resource
      );
    });

    it('checks for number of active and inactive articles.', function() {
      var articleCollection = this.articleCollection;
      runs(function() {
        setTimeout(function() {
          articleCollection.fetch();
        },10);
      });

      waitsFor(function() {
        return articleCollection.isActive().length;
      }, 'The number of active items should be greater than zero', 4000);

      runs(function() {
        expect(articleCollection.isActive().length).toEqual(14);
        expect(articleCollection.isNotActive().length).toEqual(6);
      });
    });
  });
});