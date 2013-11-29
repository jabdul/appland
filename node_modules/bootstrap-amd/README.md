# bootstrap-amd

This script converts [Twitter Bootstrap JavaScript](http://twitter.github.com/bootstrap/javascript.html) files into
[AMD](https://github.com/amdjs/amdjs-api/wiki/AMD) JavaScript modules.

The modules can be loaded by AMD script loaders like [RequireJS](http://requirejs.org).

**Note: this script is a changed [jrburke](https://github.com/jrburke)'s [jqueryui-amd](https://github.com/jrburke/jqueryui-amd).**

## Installing

The script requires nodejs 0.6 to run. Use npm to install it:

    npm install -g bootstrap-amd

## Using

    bootstrap-amd path/to/git-cloned-bootstrap

bootstrap-amd sets `Transitions` module as a dependancy for all modules. If you don't need transitions or want to add them manually, use '--no-transition' key:

    bootstrap-amd path/to/git-cloned-bootstrap --no-transition

##Configuring AMD loading

Create a config first:

```javascript
requirejs.config({
    paths: {
        bootstrap: 'path/to/bootstrap/amd'
    }
});
```

...and then just include bootstrap as a dependancy:


```javascript
define([ 'bootstrap' ], function() {
    //some code
});
```

You can use single Bootstrap AMD modules but do it at your own peril. AMD modules are in `path/to/bootstrap/amd/src` directory. Configure the location just like you configure [jqueryui-amd](https://github.com/jrburke/jqueryui-amd#configuring-amd-loading):

```javascript
requirejs.config({
    paths: {
        bootstrap: 'path/to/bootstrap/amd/src'
    }
});
```

...and then reference the modules with a `bootstrap` prefix:


```javascript
define([ 'bootstrap/alert', 'bootstrap/dropdown' ], function() {
    //some code
});
```

## What happens

The script works with Twitter Bootstrap source directory cloned from [github](https://github.com/twitter/bootstrap/). It doesn't clone the Bootstrap, it just expects a path to this directory as a first argument.

bootstrap-amd creates `amd` directory with `main.js` file that contains Twitter Bootstrap AMD and `amd/src` folder with converted modules.

## Constraints

This script assumes a directory for Twitter Bootstrap contains a `js` directory.

Since Twitter doesn't write their dependencies anywhere in the code, they are hardcoded in the script.
