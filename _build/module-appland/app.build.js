({
  appDir: "../../src/module-appland",                    // Application root dir. Relative to current app.build.js
  baseUrl: "../../src",                                  // Base URL for all modules required. Relative to current app.build.js
  dir: "../../dist/module-appland",                      // Deployment location. Relative to current app.build.js
  mainConfigFile: "../../src/module-appland/common.js",  // File name (incl. extension) of main config
  keepBuildDir: false,                                   // Delete 'dir' before build
  optimize: "uglify",                                    // 'uglify','none'
  paths: {
    'module-appland/common': '../dist/module-appland/common',
    'module-appland/controller/index-controller': '../dist/module-appland/controller/index-controller'
  },
  pragmasOnSave: {
    //removes Handlebars.Parser code (used to compile template strings) set
    //it to `false` if you need to parse template strings even after build
    excludeHbsParser : true,
    // kills the entire plugin set once it's built.
    excludeHbs: true,
    // removes i18n precompiler, handlebars and json2
    excludeAfterBuild: true
  },
  modules: [
    //First set up the common build layer.
    {
      //module names are relative to baseUrl
      name: 'module-appland/common',
      //List common dependencies here. Only need to list
      //top level dependencies, "include" will find
      //nested dependencies.
      include: [
        'jquery',
        'lib/requirejs/domReady',
        'lib/requirejs/text',
        'lib/requirejs/json',
        'lib/requirejs/i18n',
        'hbs',
        'log4javascript',
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
      name: 'module-appland/controller/index-controller',
      include: [],
      exclude: ['module-appland/common']
    }
  ]
})
