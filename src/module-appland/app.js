define([
  'main',
  'lib/requirejs/domReady!',
  'lib/requirejs/i18n!nls/conf',
  'lib/requirejs/i18n!module-appland/nls/conf',
  'core/connect',
  'log4javascript'],
function (App, Doc, AppConfig, ModuleConfig, Connect, Log4j) {

  // Setup configuration for the App object.
  App.setConfig({
    'projectName': ModuleConfig['module-appland'].projectName
  });

  // Setup logger for this module
  // The getLogger string argument must be prefixed with Apl.Modules.
  ModuleConfig['module-appland'].Log =
    Log4j.getLogger( 'Apl.Modules.Appland' );
  // Enable / disable logging
  App.setLogging({
      'setEnabled': AppConfig.App.Logging.setEnabled
  });

  // Initialise this module's config.
	App.setModuleConfig({
		'module-appland': ModuleConfig['module-appland']
	});

  // Setup default connection to server.
  // This can also be dynamically changed during runtime.
	var connect = new Connect(AppConfig.Server);
	App.setConnection(connect);

	return App;
});