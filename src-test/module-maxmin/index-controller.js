define([
  'module-image-viewer/app',
  'module-image-viewer/controller/index-controller'
],
function (App, IndexController) {
  /**
   * Image list test suite.
   */
  describe('ModuleImageViewer: Image viewer initialiser', function () {

    var that = this;

    loadFixtures('../../../module-image-viewer/fixtures/faceted-search-result.html');
    that.$container = $('#wgsn-fixture-search-result');
    that.App = App;

    beforeEach(function () {
    });

    afterEach(function () {
    });

    it("checks if images list container class .wgsn-ivr-items-container exist in markup", function () {
      expect(that.$container.find('.wgsn-ivr-items-container').length).toBeGreaterThan(0);
    });

    it("checks if image item container class .wgsn-ivr-items exist in markup", function () {
      expect(that.$container.find('.wgsn-ivr-items').length).toEqual(10);
    });

    it("checks if item container class .wgsn-ivr-item exist in markup", function () {
      expect(that.$container.find('.wgsn-ivr-item').length).toEqual(10);
    });

    it("checks if image viewer already exists on the page.", function () {
      IndexController.init();
      expect(IndexController.isDialogExist()).toEqual(false);
    });
  });
});
