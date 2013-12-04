define([
  'module-tt-article/app',
  'module-tt-article/model/article',
  'lib/requirejs/hbs!module-tt-article/view/tmpl/article',
  'lib/requirejs/text!module-tt-article/data/mock-articles.json'
],
  function (App, ArticleObj, ArticleTmpl, mockArticlesJson) {
    /**
     * Article's test suite.
     */
    describe('ModuleTtArticle: Article', function () {

      var that = this;
      setFixtures(ArticleTmpl);
      that.$container = $('.tt-articles-items');
      that.App = App;
      that.mainConf = App.getModuleConfig('module-tt-article');
      that.testArticles = $.parseJSON(mockArticlesJson).articles;
      that.testArticleId = 2;

      beforeEach(function () {
        that.Article = new ArticleObj(that.testArticles[that.testArticleId]);
        that.Article.setMaxDefaultTags(that.mainConf.maxDefaultTags);
      });

      afterEach(function () {
        that.Article = null;
      });

      it("tests the Article constructor", function () {
       expect(that.Article).toEqual(jasmine.any(Object));
      });

      it("checks the initialised properties", function () {
        expect(that.Article.id).toBe(that.testArticles[that.testArticleId].id);
        expect(that.Article.isActive).toBe(that.testArticles[that.testArticleId].isActive);
        expect(that.Article.image).toBe(that.testArticles[that.testArticleId].image);
        expect(that.Article.title).toBe(that.testArticles[that.testArticleId].title);
        expect(that.Article.description).toBe(that.testArticles[that.testArticleId].description);
        expect(that.Article.tags).toEqual(that.testArticles[that.testArticleId].tags);
      });

      it("is active", function () {
        expect(that.Article.isItemActive()).toBe(true);
      });

      it("is to show no more than specified number of tags by default", function () {
        expect(that.Article.maxDefaultTags).toEqual(that.mainConf.maxDefaultTags);
      });

      it("prepares default tags", function () {
        spyOn(that.Article, 'isMoreTags');
        that.Article.setTagsMaxToShow();
        expect(that.Article.isMoreTags).toHaveBeenCalled();
        expect(that.Article.lessTags).toContain('ea');
        expect(that.Article.lessTags).toContain('aute');
        expect(that.Article.moreTags).not.toContain('aliqua');
        expect(that.Article.moreTags).not.toContain('do');
      });

      it("generates HTML", function () {
        spyOn(that.Article, 'setTagsMaxToShow');
        spyOn(that.Article, 'isMoreTags');
        expect($(that.Article.generateHtml())).
          toHaveId("tt-articles-article-" + that.testArticles[that.testArticleId].id);
        expect(that.Article.setTagsMaxToShow).toHaveBeenCalled();
        expect(that.Article.isMoreTags).toHaveBeenCalled();
      });
    });
  });