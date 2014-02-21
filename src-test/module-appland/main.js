define([
  'main'
],
function (App) {
  /**
   * Article's test suite.
   */
  describe('ModuleAppland: main (App)', function () {

    var that = this;

    it("to be an Object literal", function () {
      expect(App).toEqual(jasmine.any(Object));
    });

    it("has jquery loaded", function () {
      expect(App.$).toBeDefined();
      expect(App.$).toEqual(jasmine.any(Function));
    });
  });
});