## Appland ##


Appland's goal is to provide an end-to-end UI development framework and work-flow for developing modern and traditional style web applications. Great emphasis has been placed on assisting the developer to create reusable and maintainable modular code adhering to industry standards along the way.

Appland allows you to incorporate popular frameworks and libraries into your projects including Backbone, jQuery, AngularJS, Bootstrap, SASS, Jasmine and many more.

##### Key Features #####

* [Module Scaffolding][1] 
* [Modular MVC Development Architecture][2]
* [Modular OOCSS Framework][7]
* [Modular Unit Testing][3]
* [Build and Optimisation][4]
* [RESTful Mock Server][5]
* [Third-party Library Management][6]
* Framework and Library Agnostic
* Admin Area for Monitoring and Managing Modules

### System requirements ###
Download and install these items on your system before installing Appland. Non-essentials are indicated by (NE) although **highly recommended**.

1. [NodeJS](http://nodejs.org/download/ "Nodejs")
2. Localhost Web Server:
	* For Windows users, download and install [WAMP](http://www.wampserver.com/en/ "WAMP") 	
	* For Mac users, download and install [MAMP](http://www.mamp.info/en/index.html "MAMP")
	* For Linux users, download and install `Apache` 2.2+ and `PHP` 5.1.6+
3. SASS/Compass (NE):
	* Install `Ruby` 1.9.2+;
	* then install `Rake`, `Rails`, `Sass`, `Haml`, and `Compass`.

### Getting started with Appland ###
Once the system requirements have been met, clone the `Appland` project to a local directory of choice.

	# Install Appland...
	$ cd /path/to/appland
	$ git clone git@github.com:jabdul/appland.git 

Go to the root of `path/to/appland` directory.

###### Install the following Node modules from your command line... ######

	# JavaScript build optimiser...
	$ npm install -g requirejs 

	# JavaScript task manager CLI...
	$ npm install -g grunt-cli 
	
	# JavaScript package manager...
	$ npm install -g bower

	# Install local dependencies...
	$ npm install --save  


###### Setup Apache Web Server configuration ######
In your Apache server configuration `httpd.conf` file, make sure the modules specified in `appland/service/conf/httpd.modules.1.txt` are uncommented. 

For example, from...

	#LoadModule vhost_alias_module modules/mod_vhost_alias.so

...to

	LoadModule vhost_alias_module modules/mod_vhost_alias.so

...and make sure the Virtual hosts include line is uncommented as well (located near the bottom).

	# Virtual hosts
	Include conf/extra/httpd-vhosts.conf


###### Setup Apache virtual host configuration ######
In your Apache vhost configuration `httpd-vhosts.conf` file, add the configuration defined in `appland/service/conf/httpd.vhosts.1.txt`.

Find and replace this text...

	C:/path/to/

...with the path to your `Appland` project.


#### Congratulations!!! ####
You are now ready to fire up your server. Start or restart your Apache server and go to `http://localhost:9010/` in your browser. There you will find your administrative area for managing and monitoring your modules.

###### Next steps ######

* Follow the instruction in [Module Scaffolding][1] to create your first module. 
* Get an overview of Appland's [Modular MVC Development Architecture][2].

	
[1]: https://github.com/jabdul/appland/tree/master/src/module-appland "Scaffold"
[2]: https://github.com/jabdul/appland/tree/master/src "MVC"
[3]: https://github.com/jabdul/appland/tree/master/src-test "UnitTesting"
[4]: https://github.com/jabdul/appland/tree/master/_build "Build"
[5]: https://github.com/jabdul/appland/tree/master/service "REST"
[6]: https://github.com/jabdul/appland/tree/master/src/lib "Library"
[7]: https://github.com/jabdul/appland/tree/master/src/assets/sass "SASS"
