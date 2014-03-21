define([
  'module-demo-backbone/app',
  'module-demo-backbone/view/home-view'
],
function (App, HomeView) {

  var that = this;

  that.tagName = 'div';

  beforeEach(function() {
    this.homeView = new HomeView();
  });

  afterEach(function() {
    this.homeView.close();
  });

  /**
   * Homepage view test suite.
   */
  describe('ModuleDemoBackbone: homepage view', function () {

    it("Should be tied to a DOM element when created.", function () {
      expect(this.homeView.el.tagName.toLowerCase()).toBe(that.tagName);
    });

    it("has a collection of data providers", function () {
      expect(this.homeView.collection).toBeDefined();
    });
  });
});