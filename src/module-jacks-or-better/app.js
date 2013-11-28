define([
  'main',
  'lib/requirejs/domReady!',
  'lib/requirejs/i18n!nls/conf',
  'lib/requirejs/i18n!module-jacks-or-better/nls/conf',
  'core/connect',
  'log4javascript'],
function (App, Doc, AppConfig, ModuleConfig, Connect, Log4j) {
  App.setConfig({
    'projectName': ModuleConfig['module-jacks-or-better'].projectName
  });

  // Setup logger
  // The getLogger string argument must be prefixed with Apl.Modules.
  ModuleConfig['module-jacks-or-better']['Log']
      = Log4j.getLogger( 'Apl.Modules.JacksOrBetter' );
  // Enable / disable logging
  App.setLogging({
      'setEnabled': AppConfig['App']['Logging']['setEnabled']
  });

	App.setModuleConfig({
		'module-jacks-or-better': ModuleConfig['module-jacks-or-better']
	});

	var connect = new Connect(AppConfig.Server);
	App.setConnection(connect);
	return App;
});