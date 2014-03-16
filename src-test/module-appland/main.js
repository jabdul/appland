define([
  'main',
  'lib/requirejs/i18n!nls/conf',
  'lib/requirejs/i18n!module-appland/nls/conf'
],
function (App, AppConfig,  ModuleConfig) {
  /**
   * Article's test suite.
   */
  describe('ModuleAppland: main (App)', function () {

    var that = this;

    that.App = App;

    beforeEach(function() {
      App = that.App;
    });

    afterEach(function() {
      App = null;
    });

    it("to be an Object literal", function () {
      expect(App).toEqual(jasmine.any(Object));
    });

    it("has jquery loaded", function () {
      expect(App.$).toBeDefined();
      expect(App.$).toEqual(jasmine.any(Function));
    });

    it("has utility loaded", function () {
      expect(App.Util).toBeDefined();
      expect(App.Util).toEqual(jasmine.any(Object));
    });

    it("can initialise module's config", function () {
      expect(App.setModuleConfig(ModuleConfig['module-appland']))
        .toBe(true);
    });

    it("can initialise app's config", function () {
      expect(App.setConfig(AppConfig))
        .toBe(true);
    });

    it("can setup logging option", function () {
      expect(App.setLogging({
        'setEnabled': AppConfig.App.Logging.setEnabled
      })).toBe(true);
      expect(App.setLogging({
        'setEnabled': false
      })).toBe(true);
      expect(App.setLogging({
        'setEnabled': 'false'
      })).toBe(false);
    });

    it("recognises the current environment", function () {
      expect(App.getEnv()).toEqual('DEVELOPMENT');
    });

  });
});