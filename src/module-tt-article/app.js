define([
  'main',
  'lib/requirejs/domReady!',
  'lib/requirejs/i18n!nls/conf',
  'lib/requirejs/i18n!module-tt-article/nls/conf',
  'core/connect',
  'log4javascript'],
function (App, Doc, AppConfig, ModuleConfig, Connect, Log4j) {
  App.setConfig({
    'projectName': ModuleConfig['module-tt-article'].projectName
  });

  // Setup logger
  // The getLogger string argument must be prefixed with Apl.Modules.
  ModuleConfig['module-tt-article'].Log =
    Log4j.getLogger( 'Apl.Modules.TtArticle' );
  // Enable / disable logging
  App.setLogging({
      'setEnabled': AppConfig.App.Logging.setEnabled
  });

	App.setModuleConfig({
		'module-tt-article': ModuleConfig['module-tt-article']
	});

	var connect = new Connect(AppConfig.Server);
	App.setConnection(connect);
	return App;
});