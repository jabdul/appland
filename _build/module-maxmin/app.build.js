({
  appDir: "../../src/module-maxmin",                    // Application root dir. Relative to current app.build.js
  baseUrl: "../../src",                                 // Base URL for all modules required. Relative to current app.build.js
  dir: "../../dist/module-maxmin",                      // Deployment location. Relative to current app.build.js
  mainConfigFile: "../../src/module-maxmin/common.js",   // File name (incl. extension) of main config
  modules: [
    //First set up the common build layer.
    {
      //module names are relative to baseUrl
      name: 'module-maxmin/common',
      //List common dependencies here. Only need to list
      //top level dependencies, "include" will find
      //nested dependencies.
      include: ['jquery',
                'lib/requirejs/domReady',
                'main',
                'module-maxmin/model/maxmin'
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
		name: 'module-maxmin/controller/maxmin',
		include: [],
		exclude: ['module-maxmin/common']
	},

	{
		//module names are relative to baseUrl
		name: 'module-maxmin/controller/result',
		include: [],
		exclude: ['module-maxmin/common']
    }
  ]
})
