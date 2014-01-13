## Third-party libraries ##

This section contains important notes about modifications made to well-known libraries in order to prepare them for integration into Appland.

### Twitter Bootstrap ###

###### Install ######

	# Installing the official Bootstrap library...
	$ node_modules/bower/bin/bower install bootstrap --save-dev
	
	# Installing AMD converter...
	$ npm install bootstrap-amd --save-dev
	
	# Converting Bootstrap's JS files to AMD
	$ node_modules/bootstrap-amd/bootstrap-amd.js  src/lib/bootstrap/ 


###### Usage ######

	requirejs.config({
	    paths: {
	        bootstrap: 'lib/bootstrap/'
	    }
	});

...and then reference the modules with a `bootstrap` prefix:

	define([ 'bootstrap/alert', 'bootstrap/dropdown' ], function() {
	    //some code
	});
 
###### Compile CSS ######

	$ cd src/lib/bootstrap

	# Install necessary grunt tasks...
	$ npm install
	$ grunt dist

...then go to `dist/css` and copy required files over to `src/assets/sass/lib` directory.

[<< Home](https://github.com/jabdul/appland/tree/master "Home")