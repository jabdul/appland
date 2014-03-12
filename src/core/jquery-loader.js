// # **jquery-loader.js**
// **jquery-loader.js** is a simple wrapper to solve the problem of having multiple jQuery on the same site.
// This solution prevents the 'clobbering' of existing global jQuery using AMD to encapsulate your preferred
// version of jQuery library. This could be useful in some projects whereby removing the existing jQuery is
// not an option.
//
// ## Usage
//
// `jquer-loader.js` is normally requested in your module's `common.js` configuration file:
//
// ```js
// requirejs.config({
//    baseUrl: '../../',
//    waitSeconds: 14,
//    paths: {
//      'jquery': 'core/jquery-loader',
//        ...
//    }
//    ...
//  })
// ```
//
// See an example here in the demo [demo-backbone](https://github.com/jabdul/appland/blob/demo/backbone/src/module-demo-backbone/common.js)
// and [stackoverflow](http://goo.gl/FhRZZW) for more on this issue.
//

// ## Requires
// Include the preferred jQuery library.
define('jquery', ['lib/jquery-1-9-1/jquery'], function () {
  return jQuery.noConflict(true);
});