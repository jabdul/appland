({
  appDir: "../../src/module-demo-web-app",                    // Application root dir. Relative to current app.build.js
  baseUrl: "../../src",                                  // Base URL for all modules required. Relative to current app.build.js
  dir: "../../dist/module-demo-web-app",                      // Deployment location. Relative to current app.build.js
  mainConfigFile: "../../src/module-demo-web-app/common.js",  // File name (incl. extension) of main config
  keepBuildDir: false,                                   // Delete 'dir' before build
  optimize: "uglify",                                    // 'uglify','none'
  paths: {
    'module-demo-web-app/common': '../dist/module-demo-web-app/common',
    'module-demo-web-app/controller/index-controller': '../dist/module-demo-web-app/controller/index-controller'
  },
  modules: [
    //First set up the common build layer.
    {
      //module names are relative to baseUrl
      name: 'module-demo-web-app/common',
      //List common dependencies here. Only need to list
      //top level dependencies, "include" will find
      //nested dependencies.
      include: [
        'jquery',
        'lib/requirejs/domReady',
        'lib/requirejs/text',
        'lib/requirejs/hbs',
        'lib/requirejs/i18n',
        'bootstrap',
        'log4javascript',
        'handlebars',
        'underscore',
        'json',
        'core/connect',
        'core/util',
        'main'
      ]
    },

    //Now set up a build layer for each page, but exclude
    //the common one. "exclude" will exclude nested
    //the nested, built dependencies from "common". Any
    //"exclude" that includes built modules should be
    //listed before the build layer that wants to exclude it.
    //"include" the appropriate "app/main*" module since by default
    //it will not get added to the build since it is loaded by a nested
    //require in the page*.js files.
    {
      //module names are relative to baseUrl/paths config
      name: 'module-demo-web-app/controller/index-controller',
      include: [],
      exclude: ['module-demo-web-app/common']
    }
  ]
})
