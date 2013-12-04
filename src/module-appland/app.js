define([
  'main',
  'lib/requirejs/domReady!',
  'lib/requirejs/i18n!nls/conf',
  'lib/requirejs/i18n!module-appland/nls/conf',
  'core/connect',
  'log4javascript'],
function (App, Doc, AppConfig, ModuleConfig, Connect, Log4j) {
  App.setConfig({
    'projectName': ModuleConfig['module-appland'].projectName
  });

  // Setup logger
  // The getLogger string argument must be prefixed with Apl.Modules.
  ModuleConfig['module-appland'].Log =
    Log4j.getLogger( 'Apl.Modules.Appland' );
  // Enable / disable logging
  App.setLogging({
      'setEnabled': AppConfig.App.Logging.setEnabled
  });

	App.setModuleConfig({
		'module-appland': ModuleConfig['module-appland']
	});

	var connect = new Connect(AppConfig.Server);
	App.setConnection(connect);
	return App;
});