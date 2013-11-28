define([
  'module-faceted-main/app',
  'lib/requirejs/domReady!',
  'module-faceted-main/model/wgsn-image-resizer'
],
function (App, Doc, WgsnImageResizer) {
  /**
   * Image resizing test suite.
   */
  describe('ModuleFacetedMain: Image resizer', function () {

    var that = this;
    loadFixtures('../../../module-faceted-main/fixtures/images.html');
    that.$container = $('#wgsn-fixture-faceted-images');
    that.App = App;
    that.mainConf = App.getModuleConfig('module-faceted-main');
    that.testImages = {
      /* Square image */
      0: "http://www.wgsn.com//content/dam/Central_Library/Trade_Shows/2013/07jul/Playtime/2_Non_gallery/The_brand/The_Brand_008.jpg.rendition.medium.jpg"
    }

    beforeEach(function () {
      var grid = that.mainConf.images.grid;
      that.Resizer = new WgsnImageResizer();
      that.Resizer.init({
        containerWidth: grid.small.width,
        containerHeight: grid.small.height,
        $imageList: that.$container.find('#images-list')
      });
    });

    afterEach(function () {
      that.Resizer = null;
    });

    it("tests the resizer constructor", function () {
      expect(that.Resizer).toEqual(jasmine.any(Object));
    });

    it("returns the number of images in the list", function () {
      expect(that.Resizer.getNumImages('.wgsn-ui-thumb')).toEqual(60);
    });

    it("checks the images listing is set to small view option", function () {
      expect(that.$container.find('li#size-small')).toHaveClass('active');
    });

    it("enhance the image list", function () {
      var $img = that.$container.find("img[src='" + that.testImages[0] +"']");
      that.Resizer.enhanceImageListing('.wgsn-ui-thumb'); //console.log($img[0].width);
      //expect($img[0].width).toEqual(230);
    });
  });
});
