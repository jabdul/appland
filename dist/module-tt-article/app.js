define(["main","lib/requirejs/domReady!","lib/requirejs/i18n!nls/conf","lib/requirejs/i18n!module-tt-article/nls/conf","core/connect","log4javascript"],function(e,t,n,r,i,s){e.setConfig({projectName:r["module-tt-article"].projectName}),r["module-tt-article"].Log=s.getLogger("Apl.Modules.TtArticle"),e.setLogging({setEnabled:n.App.Logging.setEnabled}),e.setModuleConfig({"module-tt-article":r["module-tt-article"]});var o=new i(n.Server);return e.setConnection(o),e});