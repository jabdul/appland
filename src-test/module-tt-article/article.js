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
      /*that.testArticles = [{
        id: 2,
        isActive: true,
        image: "http://placehold.it/72x80",
        title: "reprehenderit ad eiusmod",
        description: "Exercitation aliqua minim proident adipisicing incididunt cupidatat laboris nisi. Mollit consectetur magna amet cupidatat adipisicing dolor fugiat. Deserunt aliqua anim eiusmod elit fugiat culpa ea. Est irure exercitation enim occaecat Lorem pariatur. Nulla reprehenderit magna ad nulla sint velit laborum aliquip aliquip minim ut. Et irure laborum magna excepteur tempor. ",
        tags: ["ea","aute","ea","aliqua","do"]
      }];*/
      that.testArticles = $.parseJSON(mockArticlesJson).articles;

      beforeEach(function () {
        that.Article = new ArticleObj(that.testArticles[2]);
        that.Article.setMaxDefaultTags(that.mainConf.maxDefaultTags);
      });

      afterEach(function () {
        that.Article = null;
      });

      it("tests the Article constructor", function () {
       expect(that.Article).toEqual(jasmine.any(Object));
      });

      it("checks the initialised properties", function () {
        expect(that.Article.id).toBe(that.testArticles[2].id);
        expect(that.Article.isActive).toBe(that.testArticles[2].isActive);
        expect(that.Article.image).toBe(that.testArticles[2].image);
        expect(that.Article.title).toBe(that.testArticles[2].title);
        expect(that.Article.description).toBe(that.testArticles[2].description);
        expect(that.Article.tags).toEqual(that.testArticles[2].tags);
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
          toHaveId("tt-articles-article-" + that.testArticles[2].id);
        expect(that.Article.setTagsMaxToShow).toHaveBeenCalled();
        expect(that.Article.isMoreTags).toHaveBeenCalled();
      });
    });
  });