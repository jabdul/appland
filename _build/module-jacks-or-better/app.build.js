({
  appDir: "../../src/module-jacks-or-better",                    // Application root dir. Relative to current app.build.js
  baseUrl: "../../src",                                       // Base URL for all modules required. Relative to current app.build.js
  dir: "../../dist/module-jacks-or-better",                      // Deployment location. Relative to current app.build.js
  mainConfigFile: "../../src/module-jacks-or-better/common.js",  // File name (incl. extension) of main config
  keepBuildDir: false,                                        // Delete 'dir' before build
  optimize: "uglify",
  paths: {
    'module-jacks-or-better/common': '../dist/module-jacks-or-better/common',
    'module-jacks-or-better/controller/index-controller': '../dist/module-jacks-or-better/controller/index-controller'
  },
  modules: [
    //First set up the common build layer.
    {
      //module names are relative to baseUrl
      name: 'module-jacks-or-better/common',
      //List common dependencies here. Only need to list
      //top level dependencies, "include" will find
      //nested dependencies.
      include: ['jquery',
                'lib/requirejs/domReady',
                'lib/requirejs/text',
                'lib/requirejs/hbs',
                'lib/requirejs/i18n',
                'log4javascript',
                'handlebars',
                'core/connect',
                'core/func',
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
  		name: 'module-jacks-or-better/controller/index-controller',
  		include: [],
  		exclude: ['module-jacks-or-better/common']
  	} /*,
  
  	{
  		//module names are relative to baseUrl
  		name: 'module-jacks-or-better/controller/result',
  		include: [],
  		exclude: ['module-jacks-or-better/common']
    }*/
  ]
})
