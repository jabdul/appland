## Changelog ##

### appland-0.4.1-beta ###
* Forced RequireJS to version 2.1.6  (r.js: 2.1.6, RequireJS: 2.1.6, UglifyJS2: 2.3.2, UglifyJS: 1.3.4). See [apln issue 3](https://github.com/jabdul/apln/issues/3)
* package.json devDependencies now setup to build latest versions with the exception of `requirejs`
* Environment detection for `development` now set when port is defined in url.

### appland-0.4.0-beta ###
* Upgraded require-handlebars-plugin to v.0.8.0
* Upgraded normalize.css to v.3.0.0
* New Modules Admin UI. `localhost:9010`.
* Added Douglas Crockford's JSON2 polyfill.
* Added font-awesome.
* Cleaned up `core` directory and removed redundant plugins and libraries.
* Added more test coverage to `main.js`.
* `main.js` - Dropped unused config property `config.libs_`.

### appland-0.3.0-alpha ###
* Added module-specific test harness. Jasmine tests can now run on a per module basis.

### appland-0.2.0-alpha ###
* Completed integration testing with `'apln'` command line node tool.
* `'apln'` can be used to `create` a scaffold and `remove` modules.
* Install [apln](https://github.com/jabdul/apln "apln") command line tool to start managing your modules.
* Cleaned up broken links in docs.

### appland-0.1.0-alpha ###
* First release.
