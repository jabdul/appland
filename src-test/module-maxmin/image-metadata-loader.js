define([
  'module-image-viewer/app',
  'jquery',
  'jqueryui/dialog',
  'jcrop',
  'module-image-viewer/model/info-mode',
  'module-image-viewer/model/crop-mode',
  'module-image-viewer/model/image-crop',
  'module-image-viewer/model/image-viewer-pagination',
  'module-image-viewer/model/image-viewer-toolbar',
  'module-image-viewer/model/image-metadata-loader'
],
function (App,
          $,
          Dialog,
          Jcrop,
          InfoMode,
          CropMode,
          ImageCrop,
          ImageViewerPagination,
          ImageViewerToolbar,
          ImageMetaDataLoader) {
  /**
   * Load Image Metadata.
   */
  describe('ModuleImageViewer: Image viewer metadata loader', function () {

    var that = this;

    that.App = App;

    beforeEach(function () {
      loadFixtures('../../../module-image-viewer/fixtures/image-viewer.html');
      that.$imgViewerDialog = $('div.wgsn-ivr-viewer-dialog');
      that.config = {defaultMode: 'info', activeItem: 3, currentMode: 'info'};
      that.cropList = [
        {MAX_ZOOM_RATE: 2, browserHeight: 307, browserWidth: 460, cropCoordinates: {E: 0,N: 0, S: 0, W: 0}, minimumCropHeight: 21, minimumCropWidth: 32, naturalHeight: 2235, naturalWidth: 3353, scaleRate: 0.13719057560393677},
        {MAX_ZOOM_RATE: 2, browserHeight: 500, browserWidth: 333, cropCoordinates: {E: 0,N: 0, S: 0, W: 0}, minimumCropHeight: 101, minimumCropWidth: 67, naturalHeight: 1240, naturalWidth: 873, scaleRate: 0.38144329896907214},
        {MAX_ZOOM_RATE: 2, browserHeight: 500, browserWidth: 252, cropCoordinates: {E: 252,N: 0, S: 250, W: 126}, minimumCropHeight: 250, minimumCropWidth: 126, naturalHeight: 500, naturalWidth: 252, scaleRate: 1},
        {MAX_ZOOM_RATE: 2, browserHeight: 307, browserWidth: 460, cropCoordinates: {E: 0,N: 0, S: 0, W: 0}, minimumCropHeight: 74, minimumCropWidth: 110, naturalHeight: 640, naturalWidth: 960, scaleRate: 0.4791666666666667},
        {MAX_ZOOM_RATE: 2, browserHeight: 205, browserWidth: 460, cropCoordinates: {E: 923,N: 29, S: 271, W: 381}, minimumCropHeight: 42, minimumCropWidth: 94, naturalHeight: 500, naturalWidth: 1123, scaleRate: 0.40961709706144256},
        {MAX_ZOOM_RATE: 2, browserHeight: 500, browserWidth: 333, cropCoordinates: {E: 0,N: 0, S: 0, W: 0}, minimumCropHeight: 156, minimumCropWidth: 104, naturalHeight: 800, naturalWidth: 533, scaleRate: 0.624765478424015},
        {MAX_ZOOM_RATE: 2, browserHeight: 205, browserWidth: 460, cropCoordinates: {E: 920,N: 120, S: 354, W: 393}, minimumCropHeight: 42, minimumCropWidth: 94, naturalHeight: 500, naturalWidth: 1123, scaleRate: 0.40961709706144256},
        {MAX_ZOOM_RATE: 2, browserHeight: 500, browserWidth: 373, cropCoordinates: {E: 496,N: 0, S: 646, W: 0}, minimumCropHeight: 48, minimumCropWidth: 36, naturalHeight: 2592, naturalWidth: 1936, scaleRate: 0.13719057560393677},
        {MAX_ZOOM_RATE: 2, browserHeight: 344, browserWidth: 460, cropCoordinates: {E: 1052,N: 0, S: 788, W: 0}, minimumCropHeight: 39, minimumCropWidth: 53, naturalHeight: 1498, naturalWidth: 2000, scaleRate: 0.2295},
        {MAX_ZOOM_RATE: 2, browserHeight: 49, browserWidth: 460, cropCoordinates: {E: 0,N: 0, S: 0, W: 0}, minimumCropHeight: 12, minimumCropWidth: 113, naturalHeight: 100, naturalWidth: 940, scaleRate: 0.48936170212765956}
      ];
      that.imageMetaDataConfigs = {
        config: {defaultMode: "info"},
        cropCoordinatesList: {
          0: [0,0,0,0],
          1: [0,0,0,0],
          2: [126,0,252,250],
          3: [0,0,0,0],
          4: [191,15,460,135],
          5: [0,0,0,0],
          6: [197,60,460,177],
          7: [0,0,99,133],
          8: [0,0,263,197],
          9: [0,0,0,0]
        },
        imgPathList: [
          "/content/dam/Central_Library/Trade_Shows/2013/02feb/LFW_Exhibition/Footwear/Dr_Martens/Dr_Martens_15.jpg",
          "/content/dam/Central_Library/Catwalk_Shows/Milan/AW1314/Milan/Mens/Low_res/Belstaff_lo/AW13M-Belstaff-077.jpg",
          "/content/dam/Resource_Library/CADs/Womenswear/non-seasonal/2013/07jul/Boho_folk_plus/Jersey_vest.eps",
          "/content/dam/Team_Libraries/Youth/Think_Tank/2013/05may/Festival_trends/Meadows_in_the_Mountains/bulg-horse1.jpg",
          "/content/dam/Resource_Library/CADs/Footwear/Seasonal/SS15/Outdoor_Performance/Performance/Womens/01_Performance_Womens-Footwear_Reinforced-Running-Support/002_Footwear_Reinforced-Running-Support.ai",
          "/content/dam/Central_Library/Catwalk_Shows/International_Fashion_Weeks/Autumn_Winter_2013_14/Shanghai_Fashion_Week/Zuo/Zuo_040.jpg",
          "/content/dam/Resource_Library/CADs/Footwear/Seasonal/SS15/Outdoor_Performance/Performance/Womens/01_Performance_Womens-Footwear_Reinforced-Running-Support/002_Footwear_Reinforced-Running-Support.ai",
          "/content/dam/Team_Libraries/Retail_and_Vm/Merchandising_Guides/2013/03mar/Womens_Footwear/PRODUCT_OFFER/court_shoe/Next20130225_0315.JPG",
          "/content/dam/Team_Libraries/Beauty/Product_and_Packaging/2013/06jun/hair_products/03_paul_mitchell_curl.jpg",
          "/content/dam/Team_Libraries/Kidswear/Collections/AUTUMN_WINTER_2014_15/MODERN_MYTH/Sleepwear_girl/mod_myth.png"
        ]
      }
    });

    afterEach(function () {
      that.config = null;
      that.cropList = [];
      that.imageMetaDataConfigs = null;
    });


    it("validates image viewer's data attribute config.", function () {
      var imageMetadataLoader = new ImageMetaDataLoader();

      // Updates the image base configurations
      // and sets the current active item.
      imageMetadataLoader.prepareViewerSetting(that.config, 4);
      // Retrieve the settings
      that.settings = $('#wgsn-ivr-viewer').data("wgsnIvrSettings");
      // Test settings...
      expect(that.settings.defaultMode).toBe('info');
      expect(that.settings.currentMode).toBe('info');
      expect(that.settings.activeItem).toBe(4);
    });

    it("validates the cropped items in the list.", function () {
      var imageMetadataLoader = new ImageMetaDataLoader();

      imageMetadataLoader.prepareViewerSetting(that.config, 4);
      imageMetadataLoader.setViewerStatus(true);
      imageMetadataLoader.setCropList(that.cropList);
      imageMetadataLoader.setImageListCropCoordinates(
        that.imageMetaDataConfigs.cropCoordinatesList
      );
      imageMetadataLoader.setItemsInQueue(
        that.imageMetaDataConfigs.imgPathList.length
      );
      imageMetadataLoader.createBatchResponsePlaceholder();
      imageMetadataLoader.setSingleItemRequest(true);
      imageMetadataLoader.fetchImagesInfo(
        that.imageMetaDataConfigs.imgPathList[4]
      );
      // Test default mode.
      //expect(that.settings.defaultMode).toBe('info');
    });
  });
});
