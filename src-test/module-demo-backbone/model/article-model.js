define([
  'module-demo-backbone/model/article-model'
],
function (ArticleModel) {
  /**
   * Article's test suite.
   */
  describe('ModuleDemoBackbone: article-model', function () {

    beforeEach(function() {
      this.articleModel = new ArticleModel();
    });

    afterEach(function() {
      this.articleModel = null;
    });

    it("has known set properties.", function () {
      expect(this.articleModel.get('id')).toBeDefined();
      expect(this.articleModel.get('isActive')).toBeDefined();
      expect(this.articleModel.get('title')).toBeDefined();
      expect(this.articleModel.get('teaser')).toBeDefined();
      expect(this.articleModel.get('description')).toBeDefined();
      expect(this.articleModel.get('content')).toBeDefined();
      expect(this.articleModel.get('image')).toBeDefined();
      expect(this.articleModel.get('tags')).toBeDefined();
      expect(this.articleModel.get('meta')).toBeDefined();
    });

    it("has default values set for known properties.", function () {
      var meta = this.articleModel.get('meta');

      expect(this.articleModel.get('id')).toEqual(-1);
      expect(this.articleModel.get('isActive')).toBe(false);
      expect(this.articleModel.get('title')).toBe('');
      expect(this.articleModel.get('teaser')).toBe('');
      expect(this.articleModel.get('description')).toBe('');
      expect(this.articleModel.get('content')).toBe('');
      expect(this.articleModel.get('image')).toBe('');
      expect(this.articleModel.get('tags').length).toEqual(0);
      expect(meta.nav.next.id).toEqual(-1);
      expect(meta.nav.next.title).toBe('');
      expect(meta.nav.prev.id).toEqual(-1);
      expect(meta.nav.prev.title).toBe('');
      expect(meta.related).toBeNull();
      expect(meta.links).toBeNull();
    });

    it('will trigger an invalid event on failed validation.', function() {
      var errorCallback = jasmine.createSpy('invalidEventCallback'),
          articleModel = this.articleModel,
          errorArgs;

      articleModel.on('invalid', errorCallback);

      // Force validation to fail on id?
      articleModel.set({id:'string'}, {validate: true});
      errorArgs = errorCallback.mostRecentCall.args;
      expect(errorArgs).toBeDefined();
      expect(errorArgs[0]).toBe(articleModel);
      expect(errorArgs[1]).toBe('Property id must be a finite number.');

      // Force validation to fail on isActive?
      articleModel.set({isActive:1}, {validate: true});
      errorArgs = errorCallback.mostRecentCall.args;
      expect(errorArgs).toBeDefined();
      expect(errorArgs[0]).toBe(articleModel);
      expect(errorArgs[1]).toBe('Property isActive must be a boolean value.');
    });
  });
});