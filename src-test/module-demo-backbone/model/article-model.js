define([
  'module-demo-backbone/model/article-model'
],
function (ArticleModel) {
  /**
   * Article's test suite.
   */
  describe('ModuleDemoBackbone: article', function () {

    var that = this;

    it("has default values set for its properties", function () {
      var articleModel = new ArticleModel(),
          meta = articleModel.get('meta');
      console.log(articleModel);
      expect(articleModel.get('id')).toEqual(-1);
      expect(articleModel.get('isActive')).toBe(false);
      expect(articleModel.get('title')).toBe('');
      expect(articleModel.get('teaser')).toBe('');
      expect(articleModel.get('description')).toBe('');
      expect(articleModel.get('image')).toBe('');
      expect(articleModel.get('tags').length).toEqual(0);
      expect(meta.nav.next.id).toEqual(-1);
      expect(meta.nav.next.title).toBe('');
      expect(meta.nav.prev.id).toEqual(-1);
      expect(meta.nav.prev.title).toBe('');
      expect(meta.related).toBeNull();
      expect(meta.links).toBeNull();
    });

    it('will trigger an invalid event on failed validation.', function() {
      var errorCallback = jasmine.createSpy('invalidEventCallback'),
          articleModel = new ArticleModel(),
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