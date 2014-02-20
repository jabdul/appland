define([
  'main',
  'lib/requirejs/domReady!',
  'lib/requirejs/i18n!nls/conf',
  'lib/requirejs/i18n!module-demo-backbone/nls/conf',
  'core/connect',
  'log4javascript',
  'backbone'],
function (App, Doc, AppConfig, ModuleConfig, Connect, Log4j, Backbone) {

  // Setup configuration for the App object.
  App.setConfig({
    'projectName': ModuleConfig['module-demo-backbone'].projectName
  });

  // Setup logger for this module.
  // The getLogger string argument must be prefixed with Apl.Modules.
  ModuleConfig['module-demo-backbone'].Log =
    Log4j.getLogger( 'Apl.Modules.DemoBackbone' );
  // Enable / disable logging
  App.setLogging({
      'setEnabled': AppConfig.App.Logging.setEnabled
  });

  // Extend BackBone framework with the addition of
  // a method to ease view event unbinding and DOM removal.
  // @see http://goo.gl/zIjvbT
  ModuleConfig['module-demo-backbone'].Backbone = Backbone;
  ModuleConfig['module-demo-backbone'].Backbone
    .View.prototype.close = function(){
      //this.remove();
      this.$el.empty();
      this.unbind();
      if (this.onClose){
        this.onClose();
      }
    };

  // Initialise this module's config.
	App.setModuleConfig({
		'module-demo-backbone': ModuleConfig['module-demo-backbone']
	});

  // Setup default connection to server.
  // This can also be dynamically changed during runtime.
	var connect = new Connect(AppConfig.Server);
	App.setConnection(connect);

	return App;
});