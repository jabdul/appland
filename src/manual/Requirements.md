# System Requirements #

Download and install these items on your system before installing Appland. Non-essentials are indicated by (NE) although **highly recommended**.

1. [NodeJS](http://nodejs.org/download/ "Nodejs")
2. Localhost Web Server:
	* For Windows users, download and install [WAMP](http://www.wampserver.com/en/ "WAMP") 	
	* For Mac users, download and install [MAMP](http://www.mamp.info/en/index.html "MAMP")
	* For Linux users, download and install `Apache` 2.2+ and `PHP` 5.1.6+
3. SASS/Compass (NE):
	* Install `Ruby` 1.9.2+;
	* then install `Rake`, `Rails`, `Sass`, `Haml`, and `Compass`.



### Setup Apache Web Server configuration ###
In your Apache server configuration `httpd.conf` file, make sure the modules specified in `appland/service/conf/httpd.modules.1.txt` are uncommented. 

For example, from...

	#LoadModule vhost_alias_module modules/mod_vhost_alias.so

...to

	LoadModule vhost_alias_module modules/mod_vhost_alias.so

...and make sure the Virtual hosts include line is uncommented as well (located near the bottom).

	# Virtual hosts
	Include conf/extra/httpd-vhosts.conf


#### Setup Apache virtual host configuration ####
In your Apache vhost configuration `httpd-vhosts.conf` file, add the configuration defined in `appland/service/conf/httpd.vhosts.1.txt`.

Find and replace this text...

	C:/path/to/

...with the path to your `Appland` project.


### Congratulations!!! ###
You are now ready to fire up your server. Start or restart your Apache server and go to `http://localhost:9010/` in your browser. There you will find your administrative area for managing and monitoring your modules.

##### Next steps #####

* Follow the instruction in [Module Scaffolding][1] to create your first module. 
* Get an overview of Appland's [Modular MVC Development Architecture][2].

	
[1]: https://github.com/jabdul/appland/tree/master/src/module-appland "Scaffold"
[2]: https://github.com/jabdul/appland/tree/master/src "MVC"
[3]: https://github.com/jabdul/appland/tree/master/src-test "UnitTesting"
[4]: https://github.com/jabdul/appland/tree/master/_build "Build"
[5]: https://github.com/jabdul/appland/tree/master/service "REST"
[6]: https://github.com/jabdul/appland/tree/master/src/lib "Library"
[7]: https://github.com/jabdul/appland/tree/master/src/assets/sass "SASS"
